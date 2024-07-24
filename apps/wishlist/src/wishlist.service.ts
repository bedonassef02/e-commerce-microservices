import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Wishlist } from './entities/wishlist.entity';
import { Model } from 'mongoose';

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel(Wishlist.name) private readonly wishlistModel: Model<Wishlist>,
  ) {}
  create(user: string) {
    return this.wishlistModel.create({ user });
  }
}
