# Vercel Deployment Guide

This project is a React TypeScript Vite website connected to Supabase. Use these steps when you are ready to publish it.

## 1. Upload the project to GitHub

1. Open GitHub and create a new repository for the website.
2. On your computer, make sure you are uploading the project folder that contains `package.json`.
3. Do not upload `.env.local`. It is ignored by `.gitignore` and must stay private on your computer.
4. Push the project files to the GitHub repository.

## 2. Import the project into Vercel

1. Go to [Vercel](https://vercel.com/).
2. Click **Add New**.
3. Choose **Project**.
4. Select your GitHub repository.
5. Keep these production settings:
   - Install Command: `npm install`
   - Build Command: `npm run build`
   - Output Directory: `dist`

## 3. Add Supabase environment variables in Vercel

In the Vercel project setup, open **Environment Variables** and add exactly these two variables:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
```

Use the same values from your local `.env.local` file.

Important: do not add a Supabase secret key, service_role key, JWT secret, database password, or any admin password to Vercel frontend environment variables.

## 4. Deploy the site

1. Click **Deploy** in Vercel.
2. Wait for the build to finish.
3. Open the live Vercel URL when deployment completes.

## 5. Update Supabase authentication URLs

After Vercel gives you the live website URL:

1. Open your Supabase project.
2. Go to **Authentication**.
3. Open **URL Configuration**.
4. Set **Site URL** to your live Vercel URL.
5. Add your live Vercel URL to **Redirect URLs**.
6. Add the admin route too, for example:

```text
https://your-site.vercel.app/admin
```

Replace `https://your-site.vercel.app` with your real Vercel domain.

## 6. Test after deployment

Check these pages directly in the browser:

```text
/
/collections
/products/anna
/manufacturing
/private-label
/about
/contact
/faq
/admin
```

Then test the important workflows:

1. Open `/admin`.
2. Log in with your Supabase admin email and password.
3. Add or edit one product.
4. Upload a product image and confirm it appears on the public website.
5. Open a product page and submit a quote request.
6. Return to `/admin` and confirm the quote request appears.

## 7. If a page refresh fails

This project includes `vercel.json` with a Vite single-page app rewrite. That rewrite is required so direct visits like `/products/anna` and `/admin` keep working after deployment.
