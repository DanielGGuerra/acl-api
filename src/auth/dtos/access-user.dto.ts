import { ApiProperty } from '@nestjs/swagger';
import User from 'src/user/entities/user.entity';

export class AccessUserDto {
  @ApiProperty()
  user: User;

  @ApiProperty()
  accessor_token: string;
}
