import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Wishlist, WishlistDocument } from './entities/wishlist.entity';
import { Model } from 'mongoose';
import { from, map, Observable, of } from 'rxjs';
import { CartDocument } from '../../cart/src/entites/cart.entity';

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel(Wishlist.name) private readonly wishlistModel: Model<Wishlist>,
  ) {}
  create(user: string): Observable<Wishlist> {
    return from(this.wishlistModel.create({ user }));
  }

  findByUserId(user: string): Observable<WishlistDocument> {
    return from(this.wishlistModel.findOne({ user }));
  }

  update(
    wishlist: WishlistDocument,
    product: string,
  ): Observable<WishlistDocument> {
    wishlist.products.push(product);
    return from(wishlist.save()).pipe(
      map((updatedWishlist: WishlistDocument) => updatedWishlist),
    );
  }
}
