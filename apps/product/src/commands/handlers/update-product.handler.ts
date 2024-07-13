import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProductCommand } from '../impl/update-product.command';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { HttpStatus, Inject } from '@nestjs/common';
import { CATEGORY_SERVICE } from '@app/common/utils/constants';
import { map } from 'rxjs/operators';
import { ProductService } from '../../product.service';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler
  implements ICommandHandler<UpdateProductCommand>
{
  constructor(
    @Inject(CATEGORY_SERVICE) private readonly categoryService: ClientProxy,
    private readonly productService: ProductService,
  ) {}

  async execute(command: UpdateProductCommand): Promise<any> {
    const { category } = command.updateProductDto;

    if (category) {
      return this.categoryService.send({ cmd: 'findById' }, category).pipe(
        map((cat) => {
          if (!cat) {
            new RpcException({
              status: HttpStatus.NOT_FOUND,
              error: 'Category not found',
            });
          }
          return this.productService.update(
            command.id,
            command.updateProductDto,
          );
        }),
      );
    }
  }
}
