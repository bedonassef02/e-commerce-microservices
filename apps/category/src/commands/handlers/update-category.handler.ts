import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Category } from '../../entities/category.entity';
import { from, lastValueFrom, map, mergeMap } from 'rxjs';
import { UpdateCategoryCommand } from '../impl/update-category.command';
import { CategoryService } from '../../category.service';
import { notFoundException } from '@app/common/utils/exception/not-found.exception';
import { RpcNotFoundException } from '@app/common/exceptions/rpc-not-found-exception';
import { RpcConflictException } from '@app/common/exceptions/rpc-conflict-exception';
import { RpcBadRequestException } from '@app/common/exceptions/rpc-bad-request-exception';

@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryHandler
  implements ICommandHandler<UpdateCategoryCommand>
{
  constructor(private readonly categoryService: CategoryService) {}

  async execute(command: UpdateCategoryCommand): Promise<Category> {
    const { name, parent } = command.updateCategoryDto;

    const category$ = from(this.categoryService.findByName(name)).pipe(
      mergeMap((existingCategory: Category | undefined) => {
        if (existingCategory && existingCategory.id.toString() !== command.id) {
          throw new RpcConflictException('Category name');
        }

        if (parent) {
          return from(this.categoryService.findById(parent)).pipe(
            mergeMap((parentCategory: Category | undefined) => {
              if (!parentCategory) {
                notFoundException('Parent category');
              }
              if (parentCategory.id === command.id) {
                throw new RpcBadRequestException(
                  'Cannot set a category as its own parent',
                );
              }
              return this.updateCategory(command.id, command.updateCategoryDto);
            }),
          );
        }

        return this.updateCategory(command.id, command.updateCategoryDto);
      }),
      map((category: Category) => {
        if (!category) {
          throw new RpcNotFoundException(Category.name);
        }
        return category;
      }),
    );

    return await lastValueFrom(category$);
  }

  private updateCategory(id: string, updateCategoryDto: any) {
    return from(this.categoryService.update(id, updateCategoryDto));
  }
}
