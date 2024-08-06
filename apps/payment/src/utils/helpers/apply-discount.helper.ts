export function applyDiscount(price: number, discount: number): number {
  if (discount <= 0 || discount >= 100) {
    return price;
  }
  return Math.round(price * (1 - discount / 100));
}
