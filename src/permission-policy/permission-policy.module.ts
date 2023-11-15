import { Module } from '@nestjs/common';
import { PermissionPolicyService } from './permission-policy.service';
import { PermissionPolicyController } from './permission-policy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import PermissionPolicy from './entities/permission-policy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionPolicy])],
  controllers: [PermissionPolicyController],
  providers: [PermissionPolicyService],
})
export class PermissionPolicyModule {}
