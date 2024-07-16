import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { CATEGORY_SERVICE } from '@app/common/utils/constants';
import { switchMap, of, lastValueFrom } from 'rxjs';
import { ProductService } from '../../product.service';
import { UpdateProductCommand } from '../impl/update-product.command';
import { throwException } from '@app/common/utils/exception/throw-excpetion';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler
  implements ICommandHandler<UpdateProductCommand>
{
  constructor(
    @Inject(CATEGORY_SERVICE) private readonly categoryService: ClientProxy,
    private readonly productService: ProductService,
  ) {}

  async execute(command: UpdateProductCommand): Promise<any> {
    return lastValueFrom(
      this.categoryService
        .send({ cmd: 'findById' }, command.updateProductDto.category)
        .pipe(
          switchMap(() => {
            return of(
              this.productService.update(command.id, command.updateProductDto),
            );
          }),
          throwException,
        ),
    );
  }
}
