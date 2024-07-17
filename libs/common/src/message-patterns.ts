import {
  CATEGORY_QUEUE,
  CATEGORY_SERVICE,
  PRODUCT_QUEUE,
  PRODUCT_SERVICE,
  USER_QUEUE,
  USER_SERVICE,
} from '@app/common/utils/constants';
import { MessagePatterns } from '@app/common/utils/types/message-pattern.interface';

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
