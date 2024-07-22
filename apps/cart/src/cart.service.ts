import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './entites/cart.entity';
import { from, map, Observable, of } from 'rxjs';
import { CartDto } from '@app/common/dto/cart/cart.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>,
  ) {}

  add(cartDto: CartDto) {
    this.findUserCart(cartDto.user).pipe(
      map((cart: CartDocument) => {
        if (!cart) {
          return this.create(cartDto);
        } else {
          this.productIndex(cart, cartDto.product).pipe(
            map((index: number) => {
              if (index === -1) {
                cart.products.push({ product: cartDto.product, quantity: 1 });
              } else {
                cart.products[index].quantity += cartDto.quantity;
              }
              return this.cartModel.findByIdAndUpdate(
                cart.id,
                { ...cart },
                { new: true },
              );
            }),
          );
        }
      }),
    );
  }

  remove(cartDto: CartDto) {
    return this.findUserCart(cartDto.user).pipe(
      map((cart: CartDocument) => {
        this.productIndex(cart, cartDto.product).pipe(
          map((index) => {
            if (index !== -1) {
              cart.products.splice(index, 1);
              return this.cartModel.findByIdAndUpdate(
                cart.id,
                {
                  ...cart,
                },
                { new: true },
              );
            }
            return cart;
          }),
        );
      }),
    );
  }

  clear(cartDto: CartDto) {
    return this.findUserCart(cartDto.user).pipe(
      map((cart: CartDocument) => {
        if (cart) {
          return this.cartModel.findByIdAndUpdate(
            cart.id,
            { products: [] },
            { new: true },
          );
        }
        return cart;
      }),
    );
  }

  update(cartDto: CartDto) {
    return this.findUserCart(cartDto.user).pipe(
      map((cart: CartDocument) => {
        return this.productIndex(cart, cartDto.product).pipe(
          map((index: number) => {
            if (index === -1) {
              throw new RpcException({
                status: HttpStatus.NOT_FOUND,
                message: 'product not found',
              });
            } else {
              cart.products[index].quantity = cartDto.quantity;
            }
            return this.cartModel.findByIdAndUpdate(
              cart.id,
              { ...cart },
              { new: true },
            );
          }),
        );
      }),
    );
  }

  productIndex(cart: Cart, product: string): Observable<number> {
    return of(cart.products.findIndex((p) => p.product === product));
  }

  create(cartDto: CartDto) {
    return this.cartModel.create({
      user: cartDto.user,
      products: [{ product: cartDto.product, quantity: cartDto.quantity }],
    });
  }

  findUserCart(user: string): Observable<Cart> {
    return from(this.cartModel.findOne({ user }));
  }
}
