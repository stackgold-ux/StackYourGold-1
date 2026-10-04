/**
 * Shared product categorization for the dual-brand storefront.
 *
 * Buckets:
 *  - 'gold'   → Stack Your Gold: in-stock gold products
 *  - 'silver' → Stack Your Silver: in-stock silver products
 *  - 'other'  → everything else: copper, platinum/palladium, and
 *               antique / vintage / certified-collectible items
 *
 * Vintage/antique is checked first so a vintage gold coin lands in
 * "Vault Finds" rather than the gold wall.
 */

const VENDOR_WORDS = new Set([
  'stack your gold | silver',
  'stack your gold',
  'stack your silver',
]);

const VINTAGE_RE = /vintage|antique|pre.?1933|\bngc\b|\bpcgs\b|\bicg\b|\banacs\b|\b(18\d{2}|19\d{2})\b/i;
const OTHER_METALS_RE = /\b(copper|platinum|palladium)\b/i;

function blobOf(product) {
  const tags = (product.tags || []).filter(
    (t) => !VENDOR_WORDS.has(String(t).toLowerCase())
  );
  return `${product.name || ''} ${tags.join(' ')} ${product.type || ''}`.toLowerCase();
}

function countMetal(blob, metal) {
  const m = blob.match(new RegExp(`\\b${metal}\\b`, 'g'));
  return m ? m.length : 0;
}

export function isVintageLike(product) {
  return VINTAGE_RE.test(product.name || '') || VINTAGE_RE.test((product.tags || []).join(' '));
}

/**
 * Returns 'gold' | 'silver' | 'other' for a Shopify-mapped product
 * ({ name, tags, type } shape from shopifyClient).
 */
export function categorizeProduct(product) {
  if (isVintageLike(product)) return 'other';

  const blob = blobOf(product);
  if (OTHER_METALS_RE.test(blob)) return 'other';

  const title = (product.name || '').toLowerCase();
  const goldInTitle = countMetal(title, 'gold');
  const silverInTitle = countMetal(title, 'silver');

  // Title decides when it names a metal; majority count breaks "Gold & Silver" ties.
  if (goldInTitle > 0 || silverInTitle > 0) {
    return goldInTitle >= silverInTitle ? 'gold' : 'silver';
  }

  const gold = countMetal(blob, 'gold');
  const silver = countMetal(blob, 'silver');
  if (gold > 0 || silver > 0) {
    return gold >= silver ? 'gold' : 'silver';
  }

  return 'other';
}

export function filterByCategory(products, category) {
  return (products || []).filter((p) => categorizeProduct(p) === category);
}
