import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import SingInDto from './dtos/sign-in.dto';
import { Public } from 'src/common/decorator/public-route.decorator';
import { NotRequiredPermission } from 'src/common/decorator/permission-roles.decorator';
import {
  ApiBody,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UnauthorizedErrorSchema } from 'src/errors/schemas/unauthorized';
import { AccessUserDto } from './dtos/access-user.dto';
import User from 'src/user/entities/user.entity';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
@ApiTags('Autorização')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post('signin')
  @Public()
  @NotRequiredPermission()
  @ApiBody({ type: SingInDto })
  @ApiOkResponse({ type: AccessUserDto })
  signIn(@Body() signIn: SingInDto) {
    return this.authService.signIn(signIn.login, signIn.password);
  }

  @ApiSecurity('Authorization')
  @ApiOkResponse({ type: User })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorSchema })
  @NotRequiredPermission()
  @Get('profile')
  getProfile(@Req() request) {
    return request.user;
  }
}
