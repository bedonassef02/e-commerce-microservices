import { CreateProductDto } from '@app/common/dto/product/create-product.dto';

export class CreateProductCommand {
  constructor(public readonly createProductDto: CreateProductDto) {}
}
