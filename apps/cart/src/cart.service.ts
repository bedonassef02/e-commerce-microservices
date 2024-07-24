import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './entites/cart.entity';
import { from, Observable } from 'rxjs';
import { CartDto } from '@app/common/dto/cart/cart.dto';
import { productIndex } from './utils/product-index.helper';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>,
  ) {}

  create(user: string): Observable<Cart> {
    return from(this.cartModel.create({ user: user, products: [] }));
  }

  findUserCart(user: string): Observable<Cart> {
    return from(this.cartModel.findOne({ user }));
  }

  async update(cart: CartDocument, cartDto: CartDto): Promise<CartDocument> {
    const index = productIndex(cart, cartDto.product);

    if (index !== -1) {
      cart.products[index].quantity += cartDto.quantity;
    } else {
      cart.products.push({
        product: cartDto.product,
        quantity: cartDto.quantity,
      });
    }

    return cart.save();
  }
}
