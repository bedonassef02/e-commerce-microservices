import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Category } from '../../entities/category.entity';
import { from, lastValueFrom } from 'rxjs';
import { HttpStatus } from '@nestjs/common';
import { mergeMap } from 'rxjs/operators';
import { UpdateCategoryCommand } from '../impl/update-category.command';
import { CategoryService } from '../../category.service';
import { RpcException } from '@nestjs/microservices';

@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryHandler
  implements ICommandHandler<UpdateCategoryCommand>
{
  constructor(private readonly categoryService: CategoryService) {}

  async execute(command: UpdateCategoryCommand): Promise<Category> {
    const category$ = from(
      this.categoryService.findByName(command.updateCategoryDto.name),
    ).pipe(
      mergeMap((existingCategory: Category | undefined) => {
        if (existingCategory && existingCategory.id.toString() !== command.id) {
          throw new RpcException({
            status: HttpStatus.CONFLICT,
            error: 'Category name already exists or not found',
          });
        }

        return from(
          this.categoryService.update(command.id, command.updateCategoryDto),
        );
      }),
    );

    return await lastValueFrom(category$);
  }
}
