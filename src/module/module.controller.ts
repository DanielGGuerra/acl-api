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

const PREFIX_CONTROLLER = 'module';

@Controller(PREFIX_CONTROLLER)
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Post()
  @RequiredPermission({ action: Action.create, controller: PREFIX_CONTROLLER })
  create(@Body() createModuleDto: CreateModuleDto) {
    return this.moduleService.create(createModuleDto);
  }

  @Get()
  @RequiredPermission({ action: Action.read, controller: PREFIX_CONTROLLER })
  findAll() {
    return this.moduleService.findAll();
  }

  @Get(':id')
  @RequiredPermission({ action: Action.read, controller: PREFIX_CONTROLLER })
  findOne(@Param('id') id: string) {
    return this.moduleService.findOne(id);
  }

  @Patch(':id')
  @RequiredPermission({ action: Action.update, controller: PREFIX_CONTROLLER })
  update(@Param('id') id: string, @Body() updateModuleDto: UpdateModuleDto) {
    return this.moduleService.update(id, updateModuleDto);
  }

  @Delete(':id')
  @RequiredPermission({ action: Action.delete, controller: PREFIX_CONTROLLER })
  remove(@Param('id') id: string) {
    return this.moduleService.remove(id);
  }
}
