
import fs from 'fs';
import path from 'fs';

// Mock import.meta.env
global.import = {
  meta: {
    env: {
      VITE_SHOPIFY_STORE_DOMAIN: 'vercel-store-a8184ee5.myshopify.com',
      VITE_SHOPIFY_STOREFRONT_TOKEN: 'f538c8684ee0765417ec9295342822da'
    }
  }
};

import { shopifyClient } from './src/utils/shopifyClient.js';

async function test() {
  console.log('Testing Shopify Client...');
  
  console.log('\nFetching Swag...');
  const swag = await shopifyClient.getProducts('swag');
  console.log('Swag Products found:', swag.length);
  swag.forEach(p => console.log(` - ${p.name} ($${p.price})`));
  
  console.log('\nFetching Silver Bullion...');
  const silver = await shopifyClient.getProducts('silver');
  console.log('Silver Products found:', silver.length);
  silver.forEach(p => {
    console.log(` - ${p.name}`);
    p.variants.forEach(v => console.log(`   * ${v.title}: $${v.price} (Weight: ${v.weightOz}oz)`));
  });
}

test().catch(console.error);
