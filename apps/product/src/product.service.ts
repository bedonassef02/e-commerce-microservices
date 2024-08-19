import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { CreateProductDto } from '@app/common/dto/product/create-product.dto';
import { UpdateProductDto } from '@app/common/dto/product/update-product.dto';
import { ProductQuery } from '@app/common/utils/features/product.query';
import { IPagination } from '@app/common/utils/interfaces/pagination.interface';
import { productFilter } from './utils/helpers/product-filter.helper';

@Injectable()
export class ProductService implements IPagination {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    return this.productModel.create(createProductDto);
  }

  findAll(query: ProductQuery): Observable<Product[]> {
    return from(this.handleQuery(query));
  }

  findById(id: string): Observable<Product> {
    return from(this.productModel.findById(id));
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productModel
      .findByIdAndUpdate(
        id,
        { ...updateProductDto },
        {
          new: true,
        },
      )
      .exec();
  }

  remove(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }

  countDocuments(query: ProductQuery): Observable<number> {
    return from(
      this.productModel
        .countDocuments({ ...this.textSearch(query.search), ...query.filter })
        .exec(),
    );
  }

  filter(query: ProductQuery): any {
    return productFilter(query);
  }

  handleQuery(query: ProductQuery) {
    return this.productModel
      .find({ ...this.textSearch(query.search), ...query.filter })
      .select(query.fields)
      .limit(query.limit)
      .skip(query.skip)
      .sort(query.search ? { score: { $meta: 'textScore' } } : query.sort)
      .exec();
  }

  private textSearch(search: string) {
    return search ? { $text: { $search: search } } : {};
  }
}
