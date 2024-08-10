import { CreateUserHandler } from './handlers/create-user.handler';
import { UpdatePasswordHandler } from './handlers/update-password.handler';

export const userHandlers = [CreateUserHandler, UpdatePasswordHandler];
