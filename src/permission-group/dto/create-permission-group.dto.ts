import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsNotEmpty,
  IsUUID,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

class PermissionPolicyDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}

export class CreatePermissionGroupDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  description: string;

  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => PermissionPolicyDto)
  permissionPolicy: PermissionPolicyDto[];
}
