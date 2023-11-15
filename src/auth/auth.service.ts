import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { IAccessUser } from './protocols/access-user.interface';
import User from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<IAccessUser> {
    try {
      const user = await this.userService.findByLogin(email);

      if (!user.activated) {
        throw new UnauthorizedException();
      }

      if (password !== user.password) {
        throw new UnauthorizedException();
      }

      const payload = {
        sub: user.id,
        username: user.name,
      };

      return {
        user,
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async findUser(id: string): Promise<User> {
    return await this.userService.findOne(id);
  }
}
