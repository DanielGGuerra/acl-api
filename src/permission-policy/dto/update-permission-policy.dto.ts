import { PartialType } from '@nestjs/mapped-types';
import { CreatePermissionPolicyDto } from './create-permission-policy.dto';

export class UpdatePermissionPolicyDto extends PartialType(
  CreatePermissionPolicyDto,
) {}
