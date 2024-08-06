import { formatMessage } from './format-message.hleper';

export function getDescription(
  description: string,
  price: number,
  discount: number,
): string {
  return discount === 0 ? description : formatMessage(price, discount);
}
