import { CreateUserHandler } from './handlers/create-user.handler';
import { UpdatePasswordHandler } from './handlers/update-password.handler';
import { TwoFactorHandler } from './handlers/two-factor.handler';

export const userHandlers = [
  CreateUserHandler,
  UpdatePasswordHandler,
  TwoFactorHandler,
];
