import { IsNotEmpty, IsString } from 'class-validator';

export default class SingInDto {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
