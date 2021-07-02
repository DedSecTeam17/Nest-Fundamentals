import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log(roles);

    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = {
      'roles': ['agent','admin'],
    };
    console.log(user);

    return this.matchRoles(roles, user.roles);

  }

  private matchRoles(roles: String[], userRoles: String[]): boolean {
    for (let index = 0; index < roles.length; index++) {
      const currentRole = roles[index];
      if (userRoles.includes(currentRole)) {
        return true;
      }
    }
    return false;
  }

}
