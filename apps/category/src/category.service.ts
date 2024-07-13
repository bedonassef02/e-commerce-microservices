import { Controller } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { CreateCategoryDto } from '@app/common/dto/category/create-category.dto';
import { UpdateCategoryDto } from '@app/common/dto/category/update-category.dto';

@Controller()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto): Observable<Category> {
    return from(this.categoryModel.create(createCategoryDto));
  }

  findAll(): Observable<Category[]> {
    return from(this.categoryModel.find().exec());
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
}
