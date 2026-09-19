export function formatPrice(item) {
  if (!item?.price) return '';
  const primary = `$${Number(item.price).toFixed(2)}`;
  if (item.priceAlt) {
    return `${primary} / $${Number(item.priceAlt).toFixed(2)}`;
  }
  return primary;
}
