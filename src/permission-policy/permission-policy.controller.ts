import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PermissionPolicyService } from './permission-policy.service';
import { CreatePermissionPolicyDto } from './dto/create-permission-policy.dto';
import { UpdatePermissionPolicyDto } from './dto/update-permission-policy.dto';
import {
  Action,
  RequiredPermission,
} from 'src/common/decorator/permission-roles.decorator';

const PREFIX_CONTROLLER = 'permission-policy';

@Controller(PREFIX_CONTROLLER)
export class PermissionPolicyController {
  constructor(
    private readonly permissionPolicyService: PermissionPolicyService,
  ) {}

  @Post()
  @RequiredPermission({ action: Action.create, controller: PREFIX_CONTROLLER })
  create(@Body() createPermissionPolicyDto: CreatePermissionPolicyDto) {
    return this.permissionPolicyService.create(createPermissionPolicyDto);
  }

  @Get()
  @RequiredPermission({ action: Action.read, controller: PREFIX_CONTROLLER })
  findAll() {
    return this.permissionPolicyService.findAll();
  }

  @Get(':id')
  @RequiredPermission({ action: Action.read, controller: PREFIX_CONTROLLER })
  findOne(@Param('id') id: string) {
    return this.permissionPolicyService.findOne(id);
  }

  @Patch(':id')
  @RequiredPermission({ action: Action.update, controller: PREFIX_CONTROLLER })
  update(
    @Param('id') id: string,
    @Body() updatePermissionPolicyDto: UpdatePermissionPolicyDto,
  ) {
    return this.permissionPolicyService.update(id, updatePermissionPolicyDto);
  }

  @Delete(':id')
  @RequiredPermission({ action: Action.delete, controller: PREFIX_CONTROLLER })
  remove(@Param('id') id: string) {
    return this.permissionPolicyService.remove(id);
  }
}
