import { MaxFileCount } from '@app/common/utils/files/constants/file-count.constants';

export const productFields = [
  { name: 'cover', maxCount: 1 },
  { name: 'images', maxCount: MaxFileCount.PRODUCTS_IMAGES },
];
