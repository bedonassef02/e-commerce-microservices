import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Category } from '../../entities/category.entity';
import { from, lastValueFrom, map, mergeMap } from 'rxjs';
import { HttpStatus } from '@nestjs/common';
import { UpdateCategoryCommand } from '../impl/update-category.command';
import { CategoryService } from '../../category.service';
import { RpcException } from '@nestjs/microservices';
import { notFoundException } from '@app/common/utils/exception/not-found.exception';

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
          throw new RpcException({
            status: HttpStatus.CONFLICT,
            error: 'Category name already exists',
          });
        }

        if (parent) {
          return from(this.categoryService.findById(parent)).pipe(
            mergeMap((parentCategory: Category | undefined) => {
              if (!parentCategory) {
                notFoundException('Parent category');
              }
              if (parentCategory.id === command.id) {
                throw new RpcException({
                  status: HttpStatus.CONFLICT,
                  error: 'Cannot set a category as its own parent',
                });
              }
              return this.updateCategory(command.id, command.updateCategoryDto);
            }),
          );
        }

        return this.updateCategory(command.id, command.updateCategoryDto);
      }),
      map((category: Category) => {
        if (!category) {
          notFoundException('Category ID');
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
