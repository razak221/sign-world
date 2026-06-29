# Sign World Prints — Website Redesign

This is the codebase for the newly redesigned **Sign World Prints** website, featuring modern aesthetics, a responsive 3D rotating canvas background globe, dynamic client marquees, and an admin live-chat/message dashboard.

Original design: [Figma Design](https://www.figma.com/design/8dskV0ZZq4n4XfG82Pllvs/Website-Redesign).

---

## 🛠️ Step-by-Step Deployment Guide

To deploy this new website and replace the old live site at **`https://www.signworldprints.com/`**, follow the steps below:

### 1. Database Prerequisite (Supabase Setup)
Before deploying the frontend, you must set up the database tables to handle contact form submissions and live chats:
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard/project/obxsdylgyccjlziqrwdc).
2. Click on the **SQL Editor** tab (the `SQL` icon in the left-hand navigation sidebar).
3. Click **New query** (or **New blank query**).
4. Open the [supabase-schema.sql](file:///Users/razakahmedkhan/Downloads/Website%20Redesign%20copy/supabase-schema.sql) file in your project editor, copy its entire contents, paste it into the editor, and click **Run**.
   * *This will create the database tables (`messages`, `chat_sessions`, `chat_messages`, `portfolio_custom`, `portfolio_hidden`, `portfolio_edits`, `page_views`), enable realtime sync, and create a public bucket called `portfolio_images` for custom portfolio uploads.*

---

### 2. Choose Your Deployment Method

#### Option A: Modern Cloud Hosting (Vercel / Netlify) — *Highly Recommended*
These platforms connect directly to your GitHub repository and automatically deploy any code changes you push to git.

##### For Vercel:
1. Go to [Vercel](https://vercel.com/) and sign in with your GitHub account.
2. Click **Add New** → **Project**.
3. Select your repository `razak221/sign-world` and click **Import**.
4. In **Environment Variables**, add:
   * `VITE_SUPABASE_URL` = `https://obxsdylgyccjlziqrwdc.supabase.co`
   * `VITE_SUPABASE_ANON_KEY` = `<your-anon-key-from-supabase-api-settings>`
5. Click **Deploy**. Vercel will build the project.
6. Once deployed, go to **Project Settings** → **Domains** and add `www.signworldprints.com` (and `signworldprints.com`).
7. Point your domain DNS records to Vercel (Vercel will provide the exact `A` and `CNAME` records to configure in your GoDaddy/Hostinger/domain panel).

##### For Netlify:
1. Go to [Netlify](https://www.netlify.com/) and import your GitHub repository.
2. Set the build command as `npm run build` and publish directory as `dist`.
3. Configure the same `.env` variables under **Site settings** → **Environment variables**.
4. Link `www.signworldprints.com` under **Domain management** and configure your DNS settings.
   * *Note: The pre-configured `public/_redirects` file in this codebase handles React client-side routing automatically on Netlify.*

---

#### Option B: Traditional cPanel / Shared Hosting (Hostinger, GoDaddy, Hostgator, etc.)
If your domain is hosted on standard Linux hosting, you can upload the build directly:

1. Create a local production build by running:
   ```bash
   npm run build
   ```
2. This creates a directory called **`dist`** containing optimized HTML, CSS, JS, and image assets.
3. Open your hosting provider's file manager (or connect via FTP) and go to the root folder of your website (typically named `public_html` or `www`).
4. Upload all files and folders inside the **`dist`** directory directly into the root folder.
   * *Note: The pre-configured `.htaccess` file inside `public/.htaccess` will automatically be copied to the root of your hosting folder. This file ensures that client-side page refreshes (e.g. going directly to `/services` or `/portfolio`) redirect to `index.html` instead of throwing a 404 error.*

---

## 💻 Local Development Setup

To run this project locally for development or testing:

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the local development server:
   ```bash
   npm run dev
   ```
3. Run build checks:
   ```bash
   npm run build
   ```