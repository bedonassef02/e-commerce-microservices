import {} from '@app/common/utils/constants/constants';
import { MessagePatterns } from '@app/common/utils/types/message-pattern.interface';
import {
  CART_SERVICE,
  CATEGORY_SERVICE,
  ORDER_SERVICE,
  PRODUCT_SERVICE,
  USER_SERVICE,
  WISHLIST_SERVICE,
} from '@app/common/utils/constants/service.constants';
import {
  CART_QUEUE,
  CATEGORY_QUEUE,
  ORDER_QUEUE,
  PRODUCT_QUEUE,
  USER_QUEUE,
  WISHLIST_QUEUE,
} from '@app/common/utils/constants/queue.constants';

export const UserMP: MessagePatterns = {
  NAME: USER_SERVICE,
  QUEUE: USER_QUEUE,
};

export const CategoryMP: MessagePatterns = {
  NAME: CATEGORY_SERVICE,
  QUEUE: CATEGORY_QUEUE,
};

export const ProductMP: MessagePatterns = {
  NAME: PRODUCT_SERVICE,
  QUEUE: PRODUCT_QUEUE,
};

export const CartMP: MessagePatterns = {
  NAME: CART_SERVICE,
  QUEUE: CART_QUEUE,
};

export const OrderMP: MessagePatterns = {
  NAME: ORDER_SERVICE,
  QUEUE: ORDER_QUEUE,
};

export const WishlistMP: MessagePatterns = {
  NAME: WISHLIST_SERVICE,
  QUEUE: WISHLIST_QUEUE,
};
