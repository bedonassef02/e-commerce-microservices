import { UpdateProductDto } from '@app/common/dto/product/update-product.dto';

export class UpdateProductCommand {
  constructor(
    public readonly id: string,
    public readonly updateProductDto: UpdateProductDto,
  ) {}
}
