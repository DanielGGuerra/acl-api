import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUUID,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

class AssociatePermissionGroupDto {
  @ApiProperty({
    description: 'UUID do group de permissão',
    required: true,
    type: 'string',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}

export default class CreateUserDto {
  @ApiProperty({
    description: 'Define se o usuário é admin',
    required: false,
    type: 'boolean',
  })
  @IsOptional()
  @IsBoolean()
  isAdmin: boolean;

  @ApiProperty({
    description: 'Nome do usuário',
    required: true,
    type: 'string',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'E-Mail/Login do usuário',
    required: true,
    type: 'string',
  })
  @IsNotEmpty()
  @IsEmail()
  login: string;

  @ApiProperty({
    description: 'Senha do usuário',
    required: true,
    type: 'string',
  })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    description: 'Senha de confirmação',
    required: true,
    type: 'string',
  })
  @IsNotEmpty()
  @IsStrongPassword()
  passwordConfirmed: string;

  @ApiProperty({
    description: 'Grupo de permissão',
    required: false,
    type: AssociatePermissionGroupDto,
  })
  @ValidateNested()
  @Type(() => AssociatePermissionGroupDto)
  permissionGroup: AssociatePermissionGroupDto;
}
