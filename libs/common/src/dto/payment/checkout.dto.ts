import { Product } from '../../../../../apps/product/src/entities/product.entity';

export class CheckoutDto {
  user: string;
  discount: number;
  products: Product[];
}
