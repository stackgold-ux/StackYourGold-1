import { getCart } from "@/lib/cart-actions";
import { CartLineItem } from "./cart-line-item";
import Link from "next/link";

export default async function CartPage() {
  const cart = await getCart();

  if (!cart || cart.lines.nodes.length === 0) {
    return (
      <main style={{ maxWidth: 960, margin: "0 auto", padding: "2rem" }}>
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
        <Link href="/">Continue Shopping</Link>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: "2rem" }}>
      <h1>Your Cart</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>
            <th style={{ padding: "0.5rem" }}>Product</th>
            <th style={{ padding: "0.5rem" }}>Price</th>
            <th style={{ padding: "0.5rem" }}>Quantity</th>
            <th style={{ padding: "0.5rem" }}>Total</th>
            <th style={{ padding: "0.5rem" }}></th>
          </tr>
        </thead>
        <tbody>
          {cart.lines.nodes.map((line) => (
            <CartLineItem key={line.id} line={line} />
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "2rem", textAlign: "right" }}>
        <p>
          <strong>
            Subtotal: $
            {parseFloat(cart.cost.subtotalAmount.amount).toFixed(2)}{" "}
            {cart.cost.subtotalAmount.currencyCode}
          </strong>
        </p>
        <a
          href={cart.checkoutUrl}
          style={{
            display: "inline-block",
            marginTop: "1rem",
            padding: "0.75rem 1.5rem",
            background: "#000",
            color: "#fff",
            textDecoration: "none",
          }}
        >
          Proceed to Checkout
        </a>
      </div>

      <p style={{ marginTop: "1rem" }}>
        <Link href="/">Continue Shopping</Link>
      </p>
    </main>
  );
}
