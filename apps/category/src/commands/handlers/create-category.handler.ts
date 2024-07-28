import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCategoryCommand } from '../impl/create-category.command';
import { Category } from '../../entities/category.entity';
import { from, lastValueFrom, mergeMap } from 'rxjs';
import { HttpStatus } from '@nestjs/common';
import { CategoryService } from '../../category.service';
import { RpcException } from '@nestjs/microservices';
import { notFoundException } from '@app/common/utils/exception/not-found.exception';
import { RpcNotFoundException } from '@app/common/exceptions/rpc-not-found-exception';
import { RpcConflictException } from '@app/common/exceptions/rpc-conflict-exception';

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
          throw new RpcConflictException('Category name');
        }

        if (parent) {
          return from(this.categoryService.findById(parent)).pipe(
            mergeMap((parentCategory: Category | undefined) => {
              if (!parentCategory) {
                throw new RpcNotFoundException('Parent Category');
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
