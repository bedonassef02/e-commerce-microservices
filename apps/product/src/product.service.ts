import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model, Promise } from 'mongoose';
import { from, Observable } from 'rxjs';
import { CreateProductDto } from '@app/common/dto/product/create-product.dto';
import { UpdateProductDto } from '@app/common/dto/product/update-product.dto';
import { ProductQuery } from '@app/common/utils/features/product.query';
import { IPagination } from '@app/common/utils/interfaces/pagination.interface';
import { productFilter } from './utils/helpers/product-filter.helper';

@Injectable()
export class ProductService implements IPagination{
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

  countDocuments(query: any): Observable<number> {
    return from(this.productModel.countDocuments(query.filter));
  }

  filter(query: any): any {
    return productFilter(query);
  }

  handleQuery(query: any){
    return this.productModel
      .find(this.filter(query))
      .select(query.fields)
      .limit(query.limit)
      .skip(query.skip)
      .sort(query.sort)
      .exec();
  }
}
