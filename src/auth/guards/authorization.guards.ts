import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request as RequestExpress } from 'express';
import {
  IPermissionMetadata,
  PERMISSION_ROLES,
} from 'src/common/decorator/permission-roles.decorator';
import Module from 'src/module/entities/module.entity';
import User from 'src/user/entities/user.entity';

interface Request extends RequestExpress {
  user: User;
}

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();

    const requiredPermission =
      this.reflector.getAllAndOverride<IPermissionMetadata>(PERMISSION_ROLES, [
        context.getHandler(),
        context.getClass(),
      ]);

    if (!requiredPermission) return false;
    if (requiredPermission.notRequired) return true;

    const user: User = request.user;

    if (user.isAdmin === true) return true;
    if (!user.permissionGroup) return false;

    for (const permissionPolicy of user.permissionGroup.permissionPolicy) {
      const module: Module = permissionPolicy.module as Module;
      if (module.nameController === requiredPermission.controller) {
        if (
          permissionPolicy[requiredPermission.action] ||
          permissionPolicy.all
        ) {
          return true;
        }
      }
    }

    return false;
  }
}
