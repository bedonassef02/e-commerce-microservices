import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProductService } from '../../product.service';
import { RemoveProductCommand } from '../impl/remove-product.command';
import { from, map, Observable } from 'rxjs';
import { Product } from '../../entities/product.entity';
import { RpcException } from '@nestjs/microservices';
import { HttpStatus } from '@nestjs/common';

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
        throw new RpcException({
          status: HttpStatus.NOT_FOUND,
          error: 'Product not found',
        });
      }),
    );
  }
}
