# DiVision Eyewear Supabase Setup

These steps set up the minimum backend for launch: products, admin login, product images, and quote requests.

## 1. Open the Supabase SQL Editor

1. Go to https://supabase.com/dashboard.
2. Open your DiVision project.
3. In the left sidebar, click **SQL Editor**.
4. Click **New query**.

## 2. Run `schema.sql`

1. Open `supabase/schema.sql` from this project folder.
2. Select all the SQL and copy it.
3. Paste it into the Supabase SQL Editor.
4. Click **Run**.

This creates the `products`, `profiles`, and `quote_requests` tables, turns on Row Level Security, creates admin-only policies, and creates the public `product-images` Storage bucket.

## 3. Run `seed.sql`

1. In the SQL Editor, click **New query** again.
2. Open `supabase/seed.sql` from this project folder.
3. Copy all the SQL.
4. Paste it into the SQL Editor.
5. Click **Run**.

This adds the first four starter products: Anna, Emma, Flora, and Grace.

## 4. Create Your Admin Account

1. In Supabase, open **Authentication**.
2. Click **Users**.
3. Click **Add user**.
4. Enter your admin email and password.
5. Save the user.

The database trigger will automatically create a matching row in the `profiles` table with role `user`.

## 5. Change Your Profile Role To `admin`

1. Open **Table Editor**.
2. Open the `profiles` table.
3. Find the row for your admin user.
4. Change `role` from `user` to `admin`.
5. Save the row.

Only do this manually inside Supabase. The website does not allow users to make themselves admin.

## 6. Check The `product-images` Storage Bucket

1. Open **Storage** in Supabase.
2. Confirm there is a bucket named `product-images`.
3. Confirm it is public.

The schema creates this bucket automatically. If it is missing, create a new public bucket named exactly `product-images`.

## 7. Test Admin Login

1. Open the website.
2. Go to `/admin`.
3. Sign in with the admin email and password you created.
4. If you see "not an admin yet", go back to step 5 and confirm the profile role is `admin`.

## 8. Test Product Editing

1. In `/admin`, open **Products**.
2. Edit one product.
3. Change a field, upload an image, or toggle **Active on website**.
4. Click **Save Product**.
5. Open the public collections page and confirm the product changed.

## 9. Test A Quote Submission

1. Open a product page on the public website.
2. Click **Request a Quote**.
3. Fill in the required fields and submit.
4. Go back to `/admin`.
5. Open **Quote requests** and confirm the request appears.
6. Change the quote status to `contacted`, `quoted`, `won`, or `lost`.

## Important Security Notes

- Never put a service-role key in the frontend.
- Never put a database password, JWT secret, or secret key in the frontend.
- The frontend uses only `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.
- Visitors can read active products and submit quotes.
- Visitors cannot read quote requests.
- Only admin users can manage products, upload images, and view quote requests.
