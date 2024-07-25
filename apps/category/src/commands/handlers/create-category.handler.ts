import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCategoryCommand } from '../impl/create-category.command';
import { Category } from '../../entities/category.entity';
import { from, lastValueFrom, mergeMap } from 'rxjs';
import { HttpStatus } from '@nestjs/common';
import { CategoryService } from '../../category.service';
import { RpcException } from '@nestjs/microservices';
import { notFoundException } from '@app/common/utils/exception/not-found.exception';

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler
  implements ICommandHandler<CreateCategoryCommand>
{
  constructor(private readonly categoryService: CategoryService) {}

  async execute(command: CreateCategoryCommand): Promise<Category> {
    const { name, parent } = command.createCategoryDto;

    const category$ = from(this.categoryService.findByName(name)).pipe(
      mergeMap((existingCategory: Category | undefined) => {
        if (existingCategory) {
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
              return from(
                this.categoryService.create(command.createCategoryDto),
              );
            }),
          );
        }

        return from(this.categoryService.create(command.createCategoryDto));
      }),
    );

    return await lastValueFrom(category$);
  }
}
