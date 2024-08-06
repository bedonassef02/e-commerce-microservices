export function formatMessage(price: number, discount: number): string {
  return `Original price: $${price.toFixed(2)}, with a discount of ${discount}%.`;
}
