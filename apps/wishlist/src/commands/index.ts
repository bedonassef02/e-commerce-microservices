import { CreateWishlistHandler } from './handlers/create-wishlist.handler';
import { AddToWishlistHandler } from './handlers/add-to-wishlist.handler';
import { ClearWishlistHandler } from './handlers/clear-wishlist.handler';
import { RemoveFromWishlistHandler } from './handlers/remove-from-wishlist.handler';

export const wishlistHandlers = [
  CreateWishlistHandler,
  AddToWishlistHandler,
  ClearWishlistHandler,
  RemoveFromWishlistHandler,
];
