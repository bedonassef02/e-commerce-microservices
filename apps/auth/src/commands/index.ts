import { LoginHandler } from './handlers/login.handler';
import { RegisterHandler } from './handlers/register.handler';
import { RefreshTokenHandler } from './handlers/refresh-token.handler';
import { LoginOrRegisterHandler } from './handlers/login-or-register.handler';
import { Generate2faSecretHandler } from './handlers/generate-2fa-secret.handler';
import { Verify2faTokenHandler } from './handlers/verify-2fa.handler';

export const authHandlers = [
  LoginHandler,
  RegisterHandler,
  RefreshTokenHandler,
  LoginOrRegisterHandler,
  Generate2faSecretHandler,
  Verify2faTokenHandler,
];
