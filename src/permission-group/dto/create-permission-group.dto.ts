import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}

export class CreatePermissionGroupDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  description: string;

  @ApiProperty({ type: [PermissionPolicyDto] })
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => PermissionPolicyDto)
  permissionPolicy: PermissionPolicyDto[];
}
