import { PartialType } from '@nestjs/mapped-types';
import { CreateTestPermissionDto } from './create-test-permission.dto';

export class UpdateTestPermissionDto extends PartialType(CreateTestPermissionDto) {}
