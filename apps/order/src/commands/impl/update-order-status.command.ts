import { OrderStatus } from '../../utils/order-status';

export class UpdateOrderStatusCommand {
  constructor(
    public readonly id: string,
    public readonly status: OrderStatus,
  ) {}
}
