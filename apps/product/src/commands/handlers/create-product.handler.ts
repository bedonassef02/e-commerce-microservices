import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from '../impl/create-product.command';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { HttpStatus, Inject } from '@nestjs/common';
import { CATEGORY_SERVICE } from '@app/common/utils/constants';
import { catchError, of, switchMap, throwError } from 'rxjs';
import { ProductService } from '../../product.service';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    @Inject(CATEGORY_SERVICE) private readonly categoryService: ClientProxy,
    private readonly productService: ProductService,
  ) {}

  async execute(command: CreateProductCommand): Promise<any> {
    return new Promise((resolve, reject) => {
      this.categoryService
        .send({ cmd: 'findById' }, command.createProductDto.category)
        .pipe(
          switchMap(() => {
            return of(this.productService.create(command.createProductDto));
          }),
          catchError((err) => {
            return throwError(
              () =>
                new RpcException({
                  status: HttpStatus.NOT_FOUND,
                  error: 'Category not found',
                }),
            );
          }),
        )
        .subscribe({
          next: (result) => resolve(result),
          error: (err) => reject(err),
        });
    });
  }
}
