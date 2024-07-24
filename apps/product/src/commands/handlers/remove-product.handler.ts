import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProductService } from '../../product.service';
import { RemoveProductCommand } from '../impl/remove-product.command';
import { from, map, Observable } from 'rxjs';
import { Product } from '../../entities/product.entity';
import { notFoundException } from '@app/common/utils/exception/not-found.exception';

@CommandHandler(RemoveProductCommand)
export class RemoveProductHandler
  implements ICommandHandler<RemoveProductCommand>
{
  constructor(private readonly productService: ProductService) {}

  async execute(command: RemoveProductCommand): Promise<Observable<Product>> {
    return from(this.productService.remove(command.id)).pipe(
      map((product: Product) => {
        if (product) {
          return product;
        }

        notFoundException(Product.name);
      }),
    );
  }
}
