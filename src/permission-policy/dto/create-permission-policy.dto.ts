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

class AssociateModuleDto extends PartialType(CreateModuleDto) {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

export class CreatePermissionPolicyDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  description: string;

  @IsOptional()
  @IsBoolean()
  all: boolean;

  @IsOptional()
  @IsBoolean()
  read: boolean;

  @IsOptional()
  @IsBoolean()
  create: boolean;

  @IsOptional()
  @IsBoolean()
  update: boolean;

  @IsOptional()
  @IsBoolean()
  delete: boolean;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AssociateModuleDto)
  module: AssociateModuleDto;
}
