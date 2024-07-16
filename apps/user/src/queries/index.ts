import { GetUserByIdHandler } from './handlers/get-user-by-id.handler';
import { GetUserByEmailHandler } from './handlers/get-user-by-email.handler';

export const userQueries = [GetUserByIdHandler, GetUserByEmailHandler];
