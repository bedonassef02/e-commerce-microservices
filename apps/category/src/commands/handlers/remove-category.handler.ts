import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Category } from '../../entities/category.entity';
import { from, lastValueFrom, map } from 'rxjs';
import { RemoveCategoryCommand } from '../impl/remove-category.command';
import { CategoryService } from '../../category.service';
import { RpcNotFoundException } from '@app/common/exceptions/rpc-not-found-exception';

@CommandHandler(RemoveCategoryCommand)
export class RemoveCategoryHandler
  implements ICommandHandler<RemoveCategoryCommand>
{
  constructor(private readonly categoryService: CategoryService) {}

  async execute(command: RemoveCategoryCommand): Promise<Category> {
    const category$ = from(this.categoryService.remove(command.id)).pipe(
      map((category: Category) => {
        if (!category) {
          throw new RpcNotFoundException(Category.name);
        }
        return category;
      }),
    );
    return await lastValueFrom(category$);
  }
}
