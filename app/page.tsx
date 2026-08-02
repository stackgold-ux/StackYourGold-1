import Image from "next/image";
import { shopifyFetch } from "@/lib/shopify";
import { PRODUCTS_QUERY } from "@/lib/shopify-queries";
import type { Product } from "@/lib/shopify-types";
import { MOCK_PRODUCTS } from "@/lib/mock-products";
import { AddToCartButton } from "./add-to-cart-button";

export default async function HomePage() {
  let products: Product[] = [];
  let usingMock = false;
  try {
    const data = await shopifyFetch<{ products: { nodes: Product[] } }>(
      PRODUCTS_QUERY,
      { first: 12 }
    );
    products = data.products.nodes;
  } catch (error) {
    console.error("Failed to fetch products from Shopify, using mock data:", error);
    products = MOCK_PRODUCTS;
    usingMock = true;
  }

  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: "2rem" }}>
      <h1>Products</h1>
      {usingMock && (
        <p style={{ background: "#fff3cd", padding: "0.5rem 1rem", borderRadius: 4, fontSize: "0.85rem" }}>
          ⚠️ Demo mode — showing sample products. Connect your Shopify store to go live.
        </p>
      )}
      {products.length === 0 ? (
        <p>No products available right now. Check back soon.</p>
      ) : (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "2rem",
        }}
      >
        {products.map((product) => (
          <div key={product.id}>
            {product.featuredImage && (
              <Image
                src={product.featuredImage.url}
                alt={product.featuredImage.altText ?? product.title}
                width={200}
                height={200}
                style={{ objectFit: "cover" }}
              />
            )}
            <h2 style={{ fontSize: "1rem" }}>{product.title}</h2>
            <p>
              ${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}{" "}
              {product.priceRange.minVariantPrice.currencyCode}
            </p>
            {product.variants.nodes.length > 0 && (
              <AddToCartButton
                variantId={product.variants.nodes[0].id}
                availableForSale={product.availableForSale}
              />
            )}
          </div>
        ))}
      </div>
      )}
    </main>
  );
}
