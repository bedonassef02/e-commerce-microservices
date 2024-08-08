import { CreateOrderHandler } from './handlers/create-order.handler';
import { UpdateOrderStatusHandler } from './handlers/update-order-status.handler';

export const orderHandlers = [CreateOrderHandler, UpdateOrderStatusHandler];
