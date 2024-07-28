import { SetMetadata } from '@nestjs/common';
export const ROLES = 'roles';

export const Roles = (...args: string[]) => SetMetadata(ROLES, args);
