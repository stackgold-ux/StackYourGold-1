"use server";

import { cookies } from "next/headers";
import { shopifyFetch } from "./shopify";
import {
  CREATE_CART_MUTATION,
  ADD_TO_CART_MUTATION,
  UPDATE_CART_MUTATION,
  REMOVE_FROM_CART_MUTATION,
  GET_CART_QUERY,
} from "./shopify-queries";
import type { Cart } from "./shopify-types";

async function getCartId(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get("cartId")?.value;
}

async function setCartId(cartId: string) {
  const cookieStore = await cookies();
  cookieStore.set("cartId", cartId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getCart(): Promise<Cart | null> {
  const cartId = await getCartId();
  if (!cartId) return null;

  const data = await shopifyFetch<{ cart: Cart | null }>(GET_CART_QUERY, {
    cartId,
  });

  return data.cart;
}

export async function createCart(): Promise<Cart> {
  const data = await shopifyFetch<{ cartCreate: { cart: Cart } }>(
    CREATE_CART_MUTATION
  );

  const cart = data.cartCreate.cart;
  await setCartId(cart.id);
  return cart;
}

export async function addToCart(variantId: string): Promise<Cart> {
  let cartId = await getCartId();

  if (!cartId) {
    const cart = await createCart();
    cartId = cart.id;
  }

  const data = await shopifyFetch<{ cartLinesAdd: { cart: Cart } }>(
    ADD_TO_CART_MUTATION,
    {
      cartId,
      lines: [{ merchandiseId: variantId, quantity: 1 }],
    }
  );

  return data.cartLinesAdd.cart;
}

export async function updateCartLine(
  lineId: string,
  quantity: number
): Promise<Cart> {
  const cartId = await getCartId();
  if (!cartId) throw new Error("No cart found");

  const data = await shopifyFetch<{ cartLinesUpdate: { cart: Cart } }>(
    UPDATE_CART_MUTATION,
    {
      cartId,
      lines: [{ id: lineId, quantity }],
    }
  );

  return data.cartLinesUpdate.cart;
}

export async function removeFromCart(lineId: string): Promise<Cart> {
  const cartId = await getCartId();
  if (!cartId) throw new Error("No cart found");

  const data = await shopifyFetch<{ cartLinesRemove: { cart: Cart } }>(
    REMOVE_FROM_CART_MUTATION,
    {
      cartId,
      lineIds: [lineId],
    }
  );

  return data.cartLinesRemove.cart;
}
