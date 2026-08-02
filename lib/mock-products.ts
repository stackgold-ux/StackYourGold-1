import type { Product } from "./shopify-types";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "gid://shopify/Product/1",
    title: "1 oz .999 Fine Silver Round — Stacker Choice",
    handle: "stacker-choice-silver-round",
    description: "Our most popular entry-level silver. .999 pure silver rounds selected by our vault team for maximum liquidity and beauty.",
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: "32.50", currencyCode: "USD" } },
    featuredImage: { url: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=800", altText: "Silver Round", width: 800, height: 800 },
    variants: { nodes: [
      { id: "gid://shopify/ProductVariant/1a", title: "1 oz Round", availableForSale: true, price: { amount: "32.50", currencyCode: "USD" }, selectedOptions: [{ name: "Size", value: "1 oz" }] },
      { id: "gid://shopify/ProductVariant/1b", title: "5 oz Round", availableForSale: true, price: { amount: "160.00", currencyCode: "USD" }, selectedOptions: [{ name: "Size", value: "5 oz" }] },
    ]},
  },
  {
    id: "gid://shopify/Product/2",
    title: "10 oz Legacy Cast Silver Bar",
    handle: "legacy-cast-silver-bar",
    description: "Cast silver bar featuring the Stack Your Gold hallmark. A rugged, hand-poured aesthetic for the serious stacker.",
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: "315.00", currencyCode: "USD" } },
    featuredImage: { url: "https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=800", altText: "Silver Bar", width: 800, height: 800 },
    variants: { nodes: [
      { id: "gid://shopify/ProductVariant/2a", title: "10 oz Bar", availableForSale: true, price: { amount: "315.00", currencyCode: "USD" }, selectedOptions: [{ name: "Size", value: "10 oz" }] },
      { id: "gid://shopify/ProductVariant/2b", title: "100 oz Bar", availableForSale: true, price: { amount: "3100.00", currencyCode: "USD" }, selectedOptions: [{ name: "Size", value: "100 oz" }] },
    ]},
  },
  {
    id: "gid://shopify/Product/3",
    title: "1/10 oz American Gold Eagle",
    handle: "gold-eagle-tenth",
    description: "Official U.S. Mint Gold Eagle in fractional size. The most trusted gold coin in America, now accessible for regular stackers.",
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: "275.00", currencyCode: "USD" } },
    featuredImage: { url: "https://images.unsplash.com/photo-1618403088890-3d9ff6f4c8ff?q=80&w=800", altText: "Gold Eagle", width: 800, height: 800 },
    variants: { nodes: [
      { id: "gid://shopify/ProductVariant/3a", title: "1/10 oz", availableForSale: true, price: { amount: "275.00", currencyCode: "USD" }, selectedOptions: [{ name: "Size", value: "1/10 oz" }] },
    ]},
  },
  {
    id: "gid://shopify/Product/4",
    title: "1 oz Copper Round — The Gateway Stack",
    handle: "copper-gateway-round",
    description: "Affordable copper rounds for the new stacker. Start building the habit without breaking the bank. Pure .999 copper.",
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: "3.99", currencyCode: "USD" } },
    featuredImage: { url: "https://images.unsplash.com/photo-1633158829585-23bb8f62b423?q=80&w=800", altText: "Copper Round", width: 800, height: 800 },
    variants: { nodes: [
      { id: "gid://shopify/ProductVariant/4a", title: "1 oz Round", availableForSale: true, price: { amount: "3.99", currencyCode: "USD" }, selectedOptions: [{ name: "Size", value: "1 oz" }] },
      { id: "gid://shopify/ProductVariant/4b", title: "5 Pack", availableForSale: true, price: { amount: "18.95", currencyCode: "USD" }, selectedOptions: [{ name: "Size", value: "5 Pack" }] },
    ]},
  },
  {
    id: "gid://shopify/Product/5",
    title: "Stacker Elite Hoodie",
    handle: "stacker-elite-hoodie",
    description: "Premium heavyweight hoodie for the dedicated stacker. Stack Your Gold embroidered logo.",
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: "65.00", currencyCode: "USD" } },
    featuredImage: { url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800", altText: "Hoodie", width: 800, height: 800 },
    variants: { nodes: [
      { id: "gid://shopify/ProductVariant/5a", title: "Large", availableForSale: true, price: { amount: "65.00", currencyCode: "USD" }, selectedOptions: [{ name: "Size", value: "Large" }] },
    ]},
  },
  {
    id: "gid://shopify/Product/6",
    title: "Sound Money Tee",
    handle: "sound-money-tee",
    description: "Soft combed cotton tee with the Sound Money manifesto. Wear the movement.",
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: "32.00", currencyCode: "USD" } },
    featuredImage: { url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800", altText: "Tee", width: 800, height: 800 },
    variants: { nodes: [
      { id: "gid://shopify/ProductVariant/6a", title: "Medium", availableForSale: true, price: { amount: "32.00", currencyCode: "USD" }, selectedOptions: [{ name: "Size", value: "Medium" }] },
    ]},
  },
];
