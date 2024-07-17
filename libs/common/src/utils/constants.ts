export const DATABASE_URI: string = 'DATABASE_URI';
export const CATEGORY_SERVICE: string = 'CATEGORY_SERVICE';
export const PRODUCT_SERVICE: string = 'PRODUCT_SERVICE';

export const USER_SERVICE: string = 'USER_SERVICE';
export const AUTH_SERVICE: string = 'AUTH_SERVICE';

export const RMQ_URL: string = 'amqp://localhost:5672';

export const CATEGORY_QUEUE: string = 'categories-queue';
export const PRODUCT_QUEUE: string = 'products-queue';

export const USER_QUEUE: string = 'users-queue';
export const AUTH_QUEUE: string = 'auth-queue';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}
