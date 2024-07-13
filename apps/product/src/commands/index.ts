import { CreateProductHandler } from './handlers/create-product.handler';
import { UpdateProductHandler } from './handlers/update-product.handler';

export const productCommands = [CreateProductHandler, UpdateProductHandler];
