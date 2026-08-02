import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stack Your Gold | Stack Your Silver",
  description: "Shift from fragile fiat reliance to tangible, generational wealth with physical gold and silver.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0 }}>
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "1rem 2rem",
            borderBottom: "1px solid #eee",
            background: "#0a0a0a",
            color: "#fff",
          }}
        >
          <a href="/" style={{ textDecoration: "none", fontWeight: "bold", color: "#f5c542" }}>
            Stack Your Gold | Stack Your Silver
          </a>
          <a href="/cart" style={{ textDecoration: "none", color: "#fff" }}>
            Cart
          </a>
        </nav>
        {children}
      </body>
    </html>
  );
}
