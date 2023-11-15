import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ModuleModule } from './module/module.module';
import { PermissionPolicyModule } from './permission-policy/permission-policy.module';
import { PermissionGroupModule } from './permission-group/permission-group.module';
import { TestPermissionModule } from './test-permission/test-permission.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    ModuleModule,
    PermissionPolicyModule,
    PermissionGroupModule,
    TestPermissionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
