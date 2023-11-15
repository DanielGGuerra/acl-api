import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PermissionGroupService } from './permission-group.service';
import { CreatePermissionGroupDto } from './dto/create-permission-group.dto';
import { UpdatePermissionGroupDto } from './dto/update-permission-group.dto';
import {
  Action,
  RequiredPermission,
} from 'src/common/decorator/permission-roles.decorator';

const PREFIX_CONTROLLER = 'permission-group';

@Controller(PREFIX_CONTROLLER)
export class PermissionGroupController {
  constructor(
    private readonly permissionGroupService: PermissionGroupService,
  ) {}

  @Post()
  @RequiredPermission({ action: Action.create, controller: PREFIX_CONTROLLER })
  create(@Body() createPermissionGroupDto: CreatePermissionGroupDto) {
    return this.permissionGroupService.create(createPermissionGroupDto);
  }

  @Get()
  @RequiredPermission({ action: Action.read, controller: PREFIX_CONTROLLER })
  findAll() {
    return this.permissionGroupService.findAll();
  }

  @Get(':id')
  @RequiredPermission({ action: Action.read, controller: PREFIX_CONTROLLER })
  findOne(@Param('id') id: string) {
    return this.permissionGroupService.findOne(id);
  }

  @Patch(':id')
  @RequiredPermission({ action: Action.update, controller: PREFIX_CONTROLLER })
  update(
    @Param('id') id: string,
    @Body() updatePermissionGroupDto: UpdatePermissionGroupDto,
  ) {
    return this.permissionGroupService.update(id, updatePermissionGroupDto);
  }

  @Delete(':id')
  @RequiredPermission({ action: Action.delete, controller: PREFIX_CONTROLLER })
  remove(@Param('id') id: string) {
    return this.permissionGroupService.remove(id);
  }
}
