import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from '@app/common/dto/order/create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
