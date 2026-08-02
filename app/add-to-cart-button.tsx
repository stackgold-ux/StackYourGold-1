"use client";

import { useTransition } from "react";
import { addToCart } from "@/lib/cart-actions";

export function AddToCartButton({
  variantId,
  availableForSale,
}: {
  variantId: string;
  availableForSale: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      await addToCart(variantId);
    });
  }

  return (
    <button onClick={handleClick} disabled={!availableForSale || isPending}>
      {!availableForSale
        ? "Sold Out"
        : isPending
          ? "Adding..."
          : "Add to Cart"}
    </button>
  );
}
