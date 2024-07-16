import { CreateProductHandler } from './handlers/create-product.handler';
import { UpdateProductHandler } from './handlers/update-product.handler';
import { RemoveProductHandler } from './handlers/remove-product.handler';

export const productCommands = [
  CreateProductHandler,
  UpdateProductHandler,
  RemoveProductHandler,
];
