import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { switchMap, of, lastValueFrom } from 'rxjs';
import { ProductService } from '../../product.service';
import { UpdateProductCommand } from '../impl/update-product.command';
import { throwException } from '@app/common/utils/exception/throw-excpetion';
import { Commands } from '@app/common/utils/commands';
import { CATEGORY_SERVICE } from '@app/common/utils/constants/service.constants';

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
        .send(Commands.Crud.FIND_BY_ID, command.updateProductDto.category)
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
