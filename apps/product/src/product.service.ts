import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { CreateProductDto } from '@app/common/dto/product/create-product.dto';
import { UpdateProductDto } from '@app/common/dto/product/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    return this.productModel.create(createProductDto);
  }

  findAll(): Observable<Product[]> {
    return from(this.productModel.find().exec());
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
}
