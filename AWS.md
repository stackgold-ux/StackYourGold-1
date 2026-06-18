# AWS Hosting & Deployment Guide

This guide details how to deploy and host the **Stack Your Gold** React application on **Amazon Web Services (AWS)**. It covers three primary options based on your scaling and technical requirements: **AWS Amplify (Fastest & Easiest)**, **AWS S3 + CloudFront (Ultra-Low Cost)**, and **Advanced Serverless Integrations (AWS Lambda + API Gateway)**.

---

## Option 1: AWS Amplify (Recommended & Continuous Deployment)

AWS Amplify is the AWS equivalent of Vercel. It provides a managed hosting environment that connects directly to your GitHub repository and automatically deploys your site on every git push.

### Step-by-Step Setup:
1. Log in to the [AWS Management Console](https://aws.amazon.com/console/).
2. Search for and open **AWS Amplify**.
3. Under **Deploy**, click **Get Started** with **Amplify Hosting**.
4. Select **GitHub** as your source repository and click **Next**. (Authorize AWS Amplify to access your GitHub account if prompted).
5. Select the repository: `stackgold-ux/StackYourGold-1` and branch: `master`. Click **Next**.
6. **Configure Build Settings**:
   - Amplify will automatically detect your project framework. Ensure the build configuration (`amplify.yml`) is set up as follows to point to the `/code` root directory:
     ```yaml
     version: 1
     frontend:
       phases:
         preBuild:
           commands:
             - cd code
             - npm ci
         build:
           commands:
             - npm run build
       artifacts:
         baseDirectory: code/dist
         files:
           - '**/*'
       cache:
         paths:
           - code/node_modules/**/*
     ```
7. **Add Environment Variables**:
   Under the "Advanced settings" section, add any environment variables your app needs:
   - `VITE_WIX_CLIENT_ID`
   - `VITE_WIX_API_TOKEN`
8. **Configure SPA Redirects (Crucial for React Router)**:
   In the Amplify console for your app, go to **Hosting > Rewrites and redirects** and add the following rule to ensure client-side routing works without triggering 404s:
   - **Source Address**: `</^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf)$)([^.]+$)/>`
   - **Target Address**: `/index.html`
   - **Type**: `200 (Rewrite)`
9. Click **Save and Deploy**. Your application will be live on a secure `amplifyapp.com` URL within minutes.
10. **Add Custom Domain**: Go to **Domain Management** in the Amplify sidebar to point your custom domain (e.g., `stackyourgold.com` or a subdomain like `app.stackyourgold.com`) directly to your Amplify deployment.

---

## Option 2: S3 Static Website Hosting + CloudFront CDN (Lowest Cost)

This option uses Amazon S3 to store your static compiled assets and Amazon CloudFront (CDN) to serve them globally over HTTPS with sub-millisecond latency. This is highly cost-effective and handles millions of users effortlessly.

### 1. Build the Application Locally:
```bash
cd /code
npm run build
```
This compiles your Vite + React application into the `/code/dist/` directory.

### 2. Configure the Amazon S3 Bucket:
1. Open the **Amazon S3 Console**.
2. Click **Create Bucket**. Enter a bucket name (e.g., `stackyourgold-static`) and select your region.
3. Turn **OFF** "Block all public access" (you need S3 to serve the files, though we will restrict bucket access via CloudFront OAC later for best security practices).
4. Create the bucket.
5. Upload all files from the local `/code/dist/` folder into the root of your newly created S3 bucket.

### 3. Configure Amazon CloudFront (CDN):
1. Open the **Amazon CloudFront Console** and click **Create Distribution**.
2. Set **Origin Domain** to point to your S3 bucket.
3. For **Origin Access**, choose **Origin Access Control (OAC)** and create a control setting. This secures your bucket so that users can *only* access your files via the fast CloudFront CDN, not direct S3 links.
4. Set **Viewer Protocol Policy** to **Redirect HTTP to HTTPS**.
5. Set **Default Root Object** to `index.html`.
6. **Configure Custom Error Responses (for React Router SPAs)**:
   - Go to the **Error Pages** tab.
   - Click **Create Custom Error Response**.
   - **HTTP Error Code**: `404: Not Found`
   - **Customize Error Response**: Select **Yes**.
   - **Response Page Path**: `/index.html`
   - **HTTP Response Code**: `200: OK`
7. Click **Create Distribution**.
8. Go back to S3 and update your S3 bucket policy using the policy template provided by CloudFront to grant read access to CloudFront's OAC.

---

## Option 3: Enterprise Micro-Stacking Backends (AWS Lambda + API Gateway)

If you decide to move away from `localStorage` persistence and introduce a secure server-side user ledger (storing grain weights, subscription history, or manual payment receipts in a secure AWS database), you can easily scale our SQLite database architecture into a serverless AWS backend:

1. **Database (Amazon DynamoDB)**: Use DynamoDB as an ultra-fast, serverless key-value ledger to store customer profiles, checkout orders, and real-time metal portfolios.
2. **Business Logic (AWS Lambda)**: Create microservices written in Node.js/Python that execute:
   - Live spot price markups using scheduled CloudWatch Events.
   - Secure verification of Stripe payment webhooks.
3. **API Gateway**: Expose those serverless Lambda functions via secure, rate-limited REST endpoints connected directly to your Vite frontend.
