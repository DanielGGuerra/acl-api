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
import PermissionPolicy from './entities/permission-policy.entity';

const PREFIX_CONTROLLER = 'permission-policy';

@Controller(PREFIX_CONTROLLER)
@ApiTags('Política de Permissão')
@ApiSecurity('Authorization')
@ApiForbiddenResponse({ type: ForbiddenErrorSchema })
@ApiBadRequestResponse({ type: BadRequestErrorSchema })
@ApiUnauthorizedResponse({ type: UnauthorizedErrorSchema })
export class PermissionPolicyController {
  constructor(
    private readonly permissionPolicyService: PermissionPolicyService,
  ) {}

  @Post()
  @ApiBody({ type: CreatePermissionPolicyDto })
  @ApiCreatedResponse({ type: PermissionPolicy })
  @RequiredPermission({ action: Action.create, controller: PREFIX_CONTROLLER })
  create(@Body() createPermissionPolicyDto: CreatePermissionPolicyDto) {
    return this.permissionPolicyService.create(createPermissionPolicyDto);
  }

  @Get()
  @ApiOkResponse({ type: [PermissionPolicy] })
  @RequiredPermission({ action: Action.read, controller: PREFIX_CONTROLLER })
  findAll() {
    return this.permissionPolicyService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'ID do usuário',
    example: '33b5059f-d90a-4803-ad35-ee3ff507e2f1',
  })
  @ApiOkResponse({ type: PermissionPolicy })
  @RequiredPermission({ action: Action.read, controller: PREFIX_CONTROLLER })
  findOne(@Param('id') id: string) {
    return this.permissionPolicyService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: CreatePermissionPolicyDto })
  @ApiParam({
    name: 'id',
    description: 'ID do usuário',
    example: '33b5059f-d90a-4803-ad35-ee3ff507e2f1',
  })
  @ApiOkResponse({ type: PermissionPolicy })
  @RequiredPermission({ action: Action.update, controller: PREFIX_CONTROLLER })
  update(
    @Param('id') id: string,
    @Body() updatePermissionPolicyDto: UpdatePermissionPolicyDto,
  ) {
    return this.permissionPolicyService.update(id, updatePermissionPolicyDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'ID do usuário',
    example: '33b5059f-d90a-4803-ad35-ee3ff507e2f1',
  })
  @ApiOkResponse({ type: PermissionPolicy })
  @RequiredPermission({ action: Action.delete, controller: PREFIX_CONTROLLER })
  remove(@Param('id') id: string) {
    return this.permissionPolicyService.remove(id);
  }
}
