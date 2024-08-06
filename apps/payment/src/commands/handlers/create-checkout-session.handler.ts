import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCheckoutSessionCommand } from '../impl/create-checkout-session.command';
import { PaymentService } from '../../payment.service';
import { Inject } from '@nestjs/common';
import { Coupon } from '../../../../coupon/src/entities/coupon.entity';
import {
  CART_SERVICE,
  COUPON_SERVICE,
  PRODUCT_SERVICE,
} from '@app/common/utils/constants/service.constants';
import { ClientProxy } from '@nestjs/microservices';
import { Commands } from '@app/common/utils/types/crud.interface';
import { switchMap } from 'rxjs';
import { CartDocument } from '../../../../cart/src/entites/cart.entity';
import { RpcBadRequestException } from '@app/common/exceptions/rpc-bad-request-exception';
import { UseCouponDto } from '@app/common/dto/coupon/use-coupon.dto';
import { throwException } from '@app/common/utils/exception/throw-excpetion';

@CommandHandler(CreateCheckoutSessionCommand)
export class CreateCheckoutSessionHandler
  implements ICommandHandler<CreateCheckoutSessionCommand>
{
  constructor(
    private readonly paymentService: PaymentService,
    @Inject(PRODUCT_SERVICE) private productService: ClientProxy,
    @Inject(CART_SERVICE) private cartService: ClientProxy,
    @Inject(COUPON_SERVICE) private couponService: ClientProxy,
  ) {}

  async execute(command: CreateCheckoutSessionCommand) {
    const { code, user } = command.checkoutDto;
    return this.cartService.send(Commands.Cart.FIND_BY_USER, user).pipe(
      switchMap((cart: CartDocument) => {
        if (!cart.products || cart.products.length === 0) {
          throw new RpcBadRequestException('Your cart is empty');
        }

        if (code) {
          const couponDto: UseCouponDto = { user, code };
          return this.couponService
            .send(Commands.Coupon.CAN_USE, couponDto)
            .pipe(
              switchMap((coupon: Coupon) => {
                return this.paymentService.checkout(
                  cart.products,
                  coupon.discount,
                );
              }),
            );
        }

        return this.paymentService.checkout(cart.products);
      }),
      throwException,
    );
  }
}
