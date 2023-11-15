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
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiParam,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ForbiddenErrorSchema } from 'src/errors/schemas/forbidden';
import { BadRequestErrorSchema } from 'src/errors/schemas/bad-request';
import { UnauthorizedErrorSchema } from 'src/errors/schemas/unauthorized';
import { PermissionGroup } from './entities/permission-group.entity';

const PREFIX_CONTROLLER = 'permission-group';

@Controller(PREFIX_CONTROLLER)
@ApiTags('Grupo de permissões')
@ApiSecurity('Authorization')
@ApiForbiddenResponse({ type: ForbiddenErrorSchema })
@ApiBadRequestResponse({ type: BadRequestErrorSchema })
@ApiUnauthorizedResponse({ type: UnauthorizedErrorSchema })
export class PermissionGroupController {
  constructor(
    private readonly permissionGroupService: PermissionGroupService,
  ) {}

  @Post()
  @ApiBody({ type: CreatePermissionGroupDto })
  @ApiCreatedResponse({ type: PermissionGroup })
  @RequiredPermission({ action: Action.create, controller: PREFIX_CONTROLLER })
  create(@Body() createPermissionGroupDto: CreatePermissionGroupDto) {
    return this.permissionGroupService.create(createPermissionGroupDto);
  }

  @Get()
  @ApiOkResponse({ type: [PermissionGroup] })
  @RequiredPermission({ action: Action.read, controller: PREFIX_CONTROLLER })
  findAll() {
    return this.permissionGroupService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'ID do grupo de permissão',
    example: '33b5059f-d90a-4803-ad35-ee3ff507e2f1',
  })
  @ApiOkResponse({ type: PermissionGroup })
  @RequiredPermission({ action: Action.read, controller: PREFIX_CONTROLLER })
  findOne(@Param('id') id: string) {
    return this.permissionGroupService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: CreatePermissionGroupDto })
  @ApiParam({
    name: 'id',
    description: 'ID do Grupo de Permissão',
    example: '33b5059f-d90a-4803-ad35-ee3ff507e2f1',
  })
  @ApiOkResponse({ type: PermissionGroup })
  @RequiredPermission({ action: Action.update, controller: PREFIX_CONTROLLER })
  update(
    @Param('id') id: string,
    @Body() updatePermissionGroupDto: UpdatePermissionGroupDto,
  ) {
    return this.permissionGroupService.update(id, updatePermissionGroupDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'ID do Grupo de Permissão',
    example: '33b5059f-d90a-4803-ad35-ee3ff507e2f1',
  })
  @ApiOkResponse({ type: PermissionGroup })
  @RequiredPermission({ action: Action.delete, controller: PREFIX_CONTROLLER })
  remove(@Param('id') id: string) {
    return this.permissionGroupService.remove(id);
  }
}
