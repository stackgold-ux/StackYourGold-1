# Shopify Headless & Buy Button Integration Guide

This guide details how to transition or expand the **Stack Your Gold** frontend to integrate with **Shopify** as your e-commerce and checkout backend.

Shopify offers world-class inventory control, highly localized tax calculations, and a secure checkout pipeline (Shopify Payments). You can connect this app to Shopify using two primary methods: **Headless Shopify Storefront API** or **Shopify Buy Buttons**.

---

## Method 1: Headless Shopify Storefront API (Recommended for Custom UX)

With this method, Shopify serves as the headless product database and checkout engine, while your Vercel React frontend handles the custom UI, spot price dynamic ticker, and DCA slider.

### 1. Enable the Headless Channel in Shopify
1. Log in to your **Shopify Admin Dashboard**.
2. Search for and install the **Headless** sales channel (formerly "Storefront API").
3. Click **Create Storefront** to generate a custom API client.

### 2. Generate API Credentials
Once the channel is created, Shopify will provide:
- **Public Access Token (Storefront Access Token)**: Permitted to read public products, collections, and create checkouts.
- **Storefront URL**: e.g., `https://your-store.myshopify.com/api/2024-04/graphql.json`

### 3. Frontend Code Integration
The Storefront API uses GraphQL. To fetch products and generate checkouts:

1. **Install Shopify Storefront JS SDK (Optional)** or use standard `fetch` GraphQL queries:
   ```bash
   npm install @shopify/hydrogen-react
   ```
2. **Configure Environment Variables** in your `.env` or Vercel dashboard:
   ```env
   VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   VITE_SHOPIFY_STOREFRONT_TOKEN=your_public_storefront_access_token
   ```
3. **Checkout Mutation**:
   When a user clicks "Buy Now" on a custom-marked bullion item, the app runs a Shopify mutation to create a checkout line item and redirects the user to the secure Shopify Checkout URL:
   ```javascript
   const createShopifyCheckout = async (lineItems) => {
     const query = `
       mutation checkoutCreate($input: CheckoutCreateInput!) {
         checkoutCreate(input: $input) {
           checkout {
             webUrl
           }
         }
       }
     `;
     // execute request and redirect user to checkout.webUrl
   };
   ```

---

## Method 2: Shopify Buy Buttons (Fastest, Ultra-Reliable)

If you prefer to bypass GraphQL programming and leverage Shopify's pre-built billing iframe and payment collection, you can generate Shopify **Buy Buttons** and embed them directly inside the bullion shop UI.

### 1. Create a Buy Button in Shopify
1. In Shopify Admin, go to **Settings** > **Apps and sales channels** > **Buy Button**.
2. Click **Create a Buy Button**.
3. Select **Product Buy Button** and choose your Gold, Silver, or Surprise Sack product.
4. Customize the button appearance (colors, typography, cart modal overlay) to match the dark-gold palette of Stack Your Gold.
5. Click **Next** and copy the generated HTML/JS embed snippet.

### 2. Embed the Snippet in React
To cleanly integrate raw JS snippets within React components (such as `src/components/BullionShop.jsx`):

Create a custom component, e.g., `ShopifyBuyButton.jsx`:
```jsx
import React, { useEffect, useRef } from 'react';

export default function ShopifyBuyButton({ productId }) {
  const containerRef = useRef(null);

  useEffect(() => {
    // Dynamically load Shopify's Buy Button JS library
    const script = document.createElement('script');
    script.src = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.ShopifyBuy && containerRef.current) {
        const client = window.ShopifyBuy.buildClient({
          domain: 'your-store.myshopify.com',
          storefrontAccessToken: 'your_storefront_token',
        });

        window.ShopifyBuy.UI.onReady(client).then((ui) => {
          ui.createComponent('product', {
            id: productId,
            node: containerRef.current,
            options: {
              product: {
                styles: {
                  button: {
                    'background-color': '#cca43b',
                    ':hover': { 'background-color': '#e5b83f' },
                  }
                }
              }
            }
          });
        });
      }
    };

    return () => {
      script.remove();
    };
  }, [productId]);

  return <div ref={containerRef} />;
}
```

---

## Method 3: Point-of-Sale & Multi-Channel Sync

If you use Shopify for your brick-and-mortar storefront or wire transactions:
1. **Dynamic Spot Margins**: Set up a Shopify webhook that listens for metadata updates or use our local spot calculator utility to automatically update prices in real-time.
2. **Order Syncing**: Every order synced in our localStorage `/merchant` portal can be pushed to Shopify using the Admin Rest API via standard webhook scripts, maintaining a single unified catalog ledger.
