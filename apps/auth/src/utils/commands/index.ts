import { ResetPasswordHandler } from './handlers/reset-password.handler';
import { ChangePasswordHandler } from './handlers/change-password.handler';
import { ForgetPasswordHandler } from './handlers/forget-password.handler';

export const passwordHandlers = [
  ResetPasswordHandler,
  ChangePasswordHandler,
  ForgetPasswordHandler,
];
