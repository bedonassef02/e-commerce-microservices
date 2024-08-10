import { CurdCommands } from '@app/common/utils/commands/utils/curd.commands';
import { UserCommands } from '@app/common/utils/commands/services/user.commands';
import { WishlistCommands } from '@app/common/utils/commands/services/wishlist.commands';
import { AuthCommands } from '@app/common/utils/commands/services/auth.commands';
import { CartCommands } from '@app/common/utils/commands/services/cart.commands';
import { CouponCommands } from '@app/common/utils/commands/services/coupon.commands';
import { ReviewCommands } from '@app/common/utils/commands/services/review.commands';
import { PaymentCommands } from '@app/common/utils/commands/services/payment.commands';
import { MailCommands } from '@app/common/utils/commands/services/mail.commands';

export const Commands = {
  Crud: CurdCommands,
  Wishlist: WishlistCommands,
  Auth: AuthCommands,
  Cart: CartCommands,
  Coupon: CouponCommands,
  Review: ReviewCommands,
  Payment: PaymentCommands,
  Mail: MailCommands,
  User: UserCommands,
};
