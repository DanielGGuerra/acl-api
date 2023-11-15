import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/common/decorator/public-route.decorator';

import configurantion from 'src/config/configurantion';

const jwtConfig = configurantion().jwt;

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const jwtPayload = await this.verifyToken(token);

    try {
      const user = await this.userService.findOne(jwtPayload.sub);

      if (!user.activated) {
        throw new Error('User is not activated');
      }

      request['user'] = user;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async verifyToken(token: string | undefined): Promise<any> {
    if (!token) throw new UnauthorizedException();
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: jwtConfig.secret,
      });
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
