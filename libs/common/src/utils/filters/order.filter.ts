import { OrderStatus } from '../../../../../apps/order/src/utils/order-status';
import { OrderPayment } from '../../../../../apps/order/src/utils/order-payment';

export type OrderFilter = {
  user?: string;
  status?: OrderStatus;
  price?: any;
  coupon?: any;
  payment?: OrderPayment;
};
