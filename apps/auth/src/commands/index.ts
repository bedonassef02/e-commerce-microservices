import { LoginHandler } from './handlers/login.handler';
import { RegisterHandler } from './handlers/register.handler';
import { RefreshTokenHandler } from './handlers/refresh-token.handler';

export const authHandlers = [
  LoginHandler,
  RegisterHandler,
  RefreshTokenHandler,
];
