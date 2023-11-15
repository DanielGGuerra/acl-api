import {
  IsBoolean,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateModuleDto } from 'src/module/dto/create-module.dto';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

class AssociateModuleDto extends PartialType(CreateModuleDto) {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

export class CreatePermissionPolicyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  all: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  read: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  create: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  update: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  delete: boolean;

  @ApiProperty()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AssociateModuleDto)
  module: AssociateModuleDto;
}
