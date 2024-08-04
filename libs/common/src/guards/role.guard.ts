import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import {
  PUBLIC_KEY,
  Role,
  ROLES_KEY,
} from '@app/common/utils/constants/constants';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  private matchRoles(roles: string[], userRole: Role) {
    return roles.some((role) => role === userRole);
  }

  private isPublic(handler: any): boolean {
    return this.reflector.get<boolean>(PUBLIC_KEY, handler);
  }

  private getRoles(handler: any): string[] {
    return this.reflector.get<string[]>(ROLES_KEY, handler);
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (this.isPublic(context.getHandler())) return true;

    const roles: string[] = this.getRoles(context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return this.matchRoles(roles, user.role);
  }
}
