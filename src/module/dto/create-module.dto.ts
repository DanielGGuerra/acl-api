import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateModuleDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  nameController: string;
}
