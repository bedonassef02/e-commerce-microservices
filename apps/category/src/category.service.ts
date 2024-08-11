import { Controller, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { CreateCategoryDto } from '@app/common/dto/category/create-category.dto';
import { UpdateCategoryDto } from '@app/common/dto/category/update-category.dto';
import { CategoryQuery } from '@app/common/utils/features/category.query';
import { IPagination } from '@app/common/utils/interfaces/pagination.interface';
import { categoryFilter } from './utils/helpers/category-filter.helper';

@Controller()
export class CategoryService implements IPagination {
  private logger = new Logger(CategoryService.name);

  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto): Observable<Category> {
    return from(this.categoryModel.create(createCategoryDto));
  }

  findAll(query: CategoryQuery) {
    return from(this.handleQuery(query));
  }

  findByName(name: string): Observable<Category | null> {
    return from(this.categoryModel.findOne({ name }));
  }

  findById(id: string): Observable<Category> {
    return from(this.categoryModel.findById(id).exec());
  }

  update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Observable<Category> {
    return from(
      this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, {
        new: true,
      }),
    );
  }

  remove(id: string): Observable<Category> {
    return from(this.categoryModel.findByIdAndDelete(id));
  }

  handleQuery(query: CategoryQuery): Promise<Category[]> {
    this.logger.log(this.filter(query));
    return this.categoryModel
      .find(this.filter(query))
      .select(query.fields)
      .limit(query.limit)
      .skip(query.skip)
      .sort(query.sort)
      .exec();
  }

  countDocuments(query: CategoryQuery): Observable<number> {
    return from(this.categoryModel.countDocuments(query.filter));
  }

  filter(query: CategoryQuery) {
    return categoryFilter(query);
  }
}
