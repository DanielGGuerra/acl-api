import { Module } from '@nestjs/common';
import { TestPermissionService } from './test-permission.service';
import { TestPermissionController } from './test-permission.controller';

@Module({
  controllers: [TestPermissionController],
  providers: [TestPermissionService]
})
export class TestPermissionModule {}
