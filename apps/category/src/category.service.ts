import { Controller } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { CreateCategoryDto } from '@app/common/dto/category/create-category.dto';
import { UpdateCategoryDto } from '@app/common/dto/category/update-category.dto';
import { CategoryQuery } from '@app/common/utils/features/category.query';
import { CategoryFilter } from '@app/common/utils/types/category/category-filter.type';
@Controller()
export class CategoryService {
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

  private handleQuery(query: CategoryQuery): Promise<Category[]> {
    return this.categoryModel
      .find(this.filter(query))
      .select(query.fields)
      .limit(query.limit)
      .skip(query.skip)
      .sort(query.sort)
      .exec();
  }

  countDocuments(query: CategoryQuery): Observable<number> {
    return from(this.categoryModel.countDocuments(this.handleQuery(query)));
  }

  private filter(query: CategoryQuery): CategoryFilter {
    const filter: CategoryFilter = {};
    if (query.parent) {
      filter.parent = query.parent;
    }
    return filter;
  }
}
