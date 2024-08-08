import { Product } from '../../../../../apps/product/src/entities/product.entity';

export class CheckoutDto {
  discount: number;
  products: Product[];
  order?: string;
}
