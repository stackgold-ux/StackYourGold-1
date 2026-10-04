#!/usr/bin/env python3
"""
Syncs visible Printify products into src/data/printifySwag.json
for the website's Swag tab. Run manually when the Printify
catalog changes; the JSON is committed so the site build needs
no API token in the browser.

Usage: python3 scripts/sync_printify_swag.py
"""
import json
import re
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

SHOP_ID = "27972404"
OUT_PATH = Path(__file__).resolve().parent.parent / "src" / "data" / "printifySwag.json"

VISIBLE_PRODUCT_IDS = [
    "6a541e0131990337b407dc66",  # Desk Mat (logo)
    "6a541c77451647754d0367e3",  # Neck Gaiter
    "6a54175c14d12578ee00445e",  # Trucker Cap
    "6a356245312c92d1320a454b",  # Fanny Pack
    "6a355c4f32fad0e4cc091732",  # Infant Tee
    "6a355b6fa9db8a623404da2a",  # Beanie
    "6a34c76f2d7d0f30ad01d328",  # Womens Tank
    "6a34bc56722a0b482e106800",  # AC/DC Tee
    "6a34b9c6b4bbba59670e6d27",  # Tapestry (AU/AC)
    "6a34b1b785a983abad0a7e01",  # Hoodie
    "6a34a38a2d7d0f30ad019e72",  # Gold Drip T-shirt
]

ETSY_SHOP_URL = "https://www.etsy.com/shop/StackYourSilver"


def strip_html(text: str) -> str:
    text = re.sub(r"<[^>]+>", " ", text or "")
    text = re.sub(r"\s+", " ", text).strip()
    return text


def shorten(text: str, limit: int = 160) -> str:
    if len(text) <= limit:
        return text
    cut = text[:limit].rsplit(" ", 1)[0]
    return cut + "…"


def fetch_product(pid: str) -> dict:
    out = subprocess.run(
        ["printify", "products", "--shop-id", SHOP_ID, "--product-id", pid],
        capture_output=True, text=True, timeout=60,
    )
    if out.returncode != 0:
        raise RuntimeError(f"printify CLI failed for {pid}: {out.stderr[:200]}")
    return json.loads(out.stdout)["body"]


def main() -> None:
    products = []
    for pid in VISIBLE_PRODUCT_IDS:
        body = fetch_product(pid)
        if not body.get("visible") or body.get("is_deleted"):
            print(f"skip {pid}: not visible", file=sys.stderr)
            continue
        images = [img.get("src") for img in body.get("images", []) if img.get("src")]
        if not images:
            print(f"skip {pid}: no images", file=sys.stderr)
            continue
        variants = [
            {
                "id": v["id"],
                "title": v.get("title", ""),
                "price": round(v["price"] / 100, 2),
            }
            for v in body.get("variants", [])
            if v.get("is_enabled") and v.get("is_available")
        ]
        if not variants:
            print(f"skip {pid}: no purchasable variants", file=sys.stderr)
            continue
        prices = [v["price"] for v in variants]
        products.append({
            "id": body["id"],
            "title": body.get("title", ""),
            "description": shorten(strip_html(body.get("description", ""))),
            "images": images[:6],
            "variants": variants,
            "priceMin": min(prices),
            "priceMax": max(prices),
            "etsyUrl": ETSY_SHOP_URL,
        })
        print(f"ok: {body.get('title','')[:50]} ({len(variants)} variants)")

    payload = {
        "syncedAt": datetime.now(timezone.utc).isoformat(),
        "shop": "Stack Your Silver | Stack Your Gold",
        "products": products,
    }
    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUT_PATH.write_text(json.dumps(payload, indent=2) + "\n")
    print(f"\nwrote {OUT_PATH} ({len(products)} products)")


if __name__ == "__main__":
    main()
