# Vercel Deployment Guide

To deploy the **Stack Your Gold** application to Vercel, follow these steps to ensure a smooth, one-click production launch.

## 1. Import Project
- Log in to your [Vercel Dashboard](https://vercel.com/dashboard).
- Click **Add New** > **Project**.
- Connect your GitHub/GitLab/Bitbucket account and select the `stack-your-silver` repository.

## 2. Project Configuration
During the "Configure Project" step, apply the following settings:

- **Framework Preset**: Select `Vite`.
- **Root Directory**: Select `/code`.
- **Build Command**: `npm run build` (default for Vite).
- **Output Directory**: `dist` (default for Vite).
- **Install Command**: `npm install`.

## 3. Node.js Version
The application requires **Node.js 20.x or higher** due to its use of Tailwind CSS v4 and Vite v8.
- Vercel should automatically detect the `engines` field in `package.json`.
- If necessary, verify the version in **Project Settings > General > Node.js Version**.

## 4. Environment Variables
Add the following environment variables if you wish to override the default local development values:
- `VITE_WIX_CLIENT_ID`: Your Wix App ID.
- `VITE_WIX_API_TOKEN`: Your Wix API Key.

## 5. Deployment
- Click **Deploy**.
- Once the build is complete, your site will be live at a `.vercel.app` URL.

---

### Key Technical Notes:
- **Fast Refresh**: Optimized for React 19 and Vite 8.
- **Client-Side Persistence**: Uses `localStorage` for cart and profile data in this version.
- **API Fallbacks**: The Wix Headless integration features robust mock data fallbacks to ensure the site remains stable even if API credentials are being rotated.
