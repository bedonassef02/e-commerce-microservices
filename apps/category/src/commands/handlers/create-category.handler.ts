import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCategoryCommand } from '../impl/create-category.command';
import { Category } from '../../entities/category.entity';
import { from, lastValueFrom } from 'rxjs';
import { HttpStatus } from '@nestjs/common';
import { mergeMap } from 'rxjs/operators';
import { CategoryService } from '../../category.service';
import { RpcException } from '@nestjs/microservices';

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler
  implements ICommandHandler<CreateCategoryCommand>
{
  constructor(private readonly categoryService: CategoryService) {}

  async execute(command: CreateCategoryCommand): Promise<Category> {
    const category$ = from(
      this.categoryService.findByName(command.createCategoryDto.name),
    ).pipe(
      mergeMap((existingCategory: Category | undefined) => {
        if (existingCategory) {
          throw new RpcException({
            status: HttpStatus.CONFLICT,
            error: 'Category name already exists',
          });
        }
        return from(this.categoryService.create(command.createCategoryDto));
      }),
    );

    return await lastValueFrom(category$);
  }
}
