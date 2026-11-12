-- Run ONCE in Supabase SQL Editor for databases created before November 2026.
-- Adds independently editable women/men classification to products.
-- Existing product records and images are preserved.

begin;

alter table public.products
  add column if not exists gender text;

-- Preserve known men's models from the original DiVision catalog; existing
-- custom models default to women and can be reclassified in the admin panel.
update public.products
set gender = case
  when lower(slug) in ('jean', 'bruce', 'bruno', 'clark')
    or upper(reference) like '%-MEN-%' then 'men'
  else 'women'
end
where gender is null;

alter table public.products
  alter column gender set default 'women';

-- Only the two options supported by the admin interface are valid.
alter table public.products
  alter column gender set not null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.products'::regclass
      and conname = 'products_gender_check'
  ) then
    alter table public.products
      add constraint products_gender_check
      check (gender in ('women', 'men'));
  end if;
end $$;

commit;
