import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ModuleService } from './module.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
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
import Module from './entities/module.entity';

const PREFIX_CONTROLLER = 'module';

@Controller(PREFIX_CONTROLLER)
@ApiTags('Modulo/Controller API')
@ApiSecurity('Authorization')
@ApiForbiddenResponse({ type: ForbiddenErrorSchema })
@ApiBadRequestResponse({ type: BadRequestErrorSchema })
@ApiUnauthorizedResponse({ type: UnauthorizedErrorSchema })
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Post()
  @ApiBody({ type: CreateModuleDto })
  @ApiCreatedResponse({ type: Module })
  @RequiredPermission({ action: Action.create, controller: PREFIX_CONTROLLER })
  create(@Body() createModuleDto: CreateModuleDto) {
    return this.moduleService.create(createModuleDto);
  }

  @Get()
  @ApiOkResponse({ type: [Module] })
  @RequiredPermission({ action: Action.read, controller: PREFIX_CONTROLLER })
  findAll() {
    return this.moduleService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'ID do modulo',
    example: '33b5059f-d90a-4803-ad35-ee3ff507e2f1',
  })
  @ApiOkResponse({ type: Module })
  @RequiredPermission({ action: Action.read, controller: PREFIX_CONTROLLER })
  findOne(@Param('id') id: string) {
    return this.moduleService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: CreateModuleDto })
  @ApiParam({
    name: 'id',
    description: 'ID do modulo',
    example: '33b5059f-d90a-4803-ad35-ee3ff507e2f1',
  })
  @ApiOkResponse({ type: Module })
  @RequiredPermission({ action: Action.update, controller: PREFIX_CONTROLLER })
  update(@Param('id') id: string, @Body() updateModuleDto: UpdateModuleDto) {
    return this.moduleService.update(id, updateModuleDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'ID do modulo',
    example: '33b5059f-d90a-4803-ad35-ee3ff507e2f1',
  })
  @ApiOkResponse({ type: Module })
  @RequiredPermission({ action: Action.delete, controller: PREFIX_CONTROLLER })
  remove(@Param('id') id: string) {
    return this.moduleService.remove(id);
  }
}
