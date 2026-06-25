-- DiVision Eyewear launch schema
-- Minimum backend for products, admin management, image uploads, and quote requests.
-- Run this in the Supabase SQL Editor. Do not put service-role or secret keys in frontend code.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  reference text not null,
  slug text not null unique,
  name_en text not null,
  name_fr text,
  name_ar text,
  description_en text,
  description_fr text,
  description_ar text,
  frame_shape text,
  material text,
  category text not null,
  colors jsonb not null default '[]'::jsonb,
  sizes jsonb not null default '[]'::jsonb,
  main_image_url text,
  additional_images jsonb not null default '[]'::jsonb,
  minimum_order_quantity integer not null default 1,
  production_lead_time text,
  sample_available boolean not null default false,
  private_label_available boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at
before update on public.products
for each row execute function public.set_updated_at();

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'user' check (role in ('admin', 'user')),
  created_at timestamptz not null default now()
);

create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products(id) on delete set null,
  name text not null,
  company text,
  email text not null,
  phone text,
  country text,
  quantity integer,
  selected_colors text,
  custom_logo_required boolean not null default false,
  packaging_requirements text,
  target_delivery_date date,
  message text,
  status text not null default 'new'
    check (status in ('new', 'contacted', 'quoted', 'won', 'lost')),
  created_at timestamptz not null default now()
);

create index if not exists products_active_idx on public.products(active);
create index if not exists products_category_idx on public.products(category);
create index if not exists quote_requests_product_id_idx on public.quote_requests(product_id);
create index if not exists quote_requests_status_idx on public.quote_requests(status);

-- ---------------------------------------------------------------------------
-- Auth helpers that depend on the tables above
-- ---------------------------------------------------------------------------

-- Create a basic profile for every new Auth user.
-- New users always start as role='user'. They cannot make themselves admin.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    'user'
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- Admin check used by Row Level Security policies.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table public.products enable row level security;
alter table public.profiles enable row level security;
alter table public.quote_requests enable row level security;

-- Anyone can read active products.
drop policy if exists "Anyone can read active products" on public.products;
create policy "Anyone can read active products"
on public.products
for select
to anon, authenticated
using (active = true);

-- Admins can read inactive products too and manage all products.
drop policy if exists "Admins can manage products" on public.products;
create policy "Admins can manage products"
on public.products
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- Users can read only their own profile. No self-update policy is created,
-- which prevents users from giving themselves the admin role.
drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
on public.profiles
for select
to authenticated
using (id = auth.uid());

-- Admins can manage profiles when needed.
drop policy if exists "Admins can manage profiles" on public.profiles;
create policy "Admins can manage profiles"
on public.profiles
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- Anyone can submit a quote request.
drop policy if exists "Anyone can submit quote requests" on public.quote_requests;
create policy "Anyone can submit quote requests"
on public.quote_requests
for insert
to anon, authenticated
with check (true);

-- Visitors cannot read quote requests. Admins can view and update them.
drop policy if exists "Admins can manage quote requests" on public.quote_requests;
create policy "Admins can manage quote requests"
on public.quote_requests
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- Supabase Storage: product-images bucket
-- ---------------------------------------------------------------------------
-- This creates the bucket if it does not exist.
-- Admin users may upload/update/delete product images.
-- Public visitors may view uploaded product images.

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Public can view product images" on storage.objects;
create policy "Public can view product images"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'product-images');

drop policy if exists "Admins can upload product images" on storage.objects;
create policy "Admins can upload product images"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'product-images' and public.is_admin());

drop policy if exists "Admins can update product images" on storage.objects;
create policy "Admins can update product images"
on storage.objects
for update
to authenticated
using (bucket_id = 'product-images' and public.is_admin())
with check (bucket_id = 'product-images' and public.is_admin());

drop policy if exists "Admins can delete product images" on storage.objects;
create policy "Admins can delete product images"
on storage.objects
for delete
to authenticated
using (bucket_id = 'product-images' and public.is_admin());
