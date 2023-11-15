import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export default class SingInDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
