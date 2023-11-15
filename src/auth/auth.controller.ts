import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import SingInDto from './dtos/sign-in.dto';
import { Public } from 'src/common/decorator/public-route.decorator';
import { NotRequiredPermission } from 'src/common/decorator/permission-roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @NotRequiredPermission()
  @Post('signin')
  signIn(@Body() signIn: SingInDto) {
    return this.authService.signIn(signIn.login, signIn.password);
  }

  @NotRequiredPermission()
  @Get('profile')
  getProfile(@Req() request) {
    return request.user;
  }
}
