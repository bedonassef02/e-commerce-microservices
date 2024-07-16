import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from '../impl/create-product.command';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { CATEGORY_SERVICE } from '@app/common/utils/constants';
import { switchMap, of, lastValueFrom } from 'rxjs';
import { ProductService } from '../../product.service';
import { throwException } from '@app/common/utils/exception/throw-excpetion';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    @Inject(CATEGORY_SERVICE) private readonly categoryService: ClientProxy,
    private readonly productService: ProductService,
  ) {}

  async execute(command: CreateProductCommand): Promise<any> {
    return lastValueFrom(
      this.categoryService
        .send({ cmd: 'findById' }, command.createProductDto.category)
        .pipe(
          switchMap(() => {
            return of(this.productService.create(command.createProductDto));
          }),
          throwException,
        ),
    );
  }
}
