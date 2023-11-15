import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TestPermissionService } from './test-permission.service';
import { CreateTestPermissionDto } from './dto/create-test-permission.dto';
import { UpdateTestPermissionDto } from './dto/update-test-permission.dto';
import {
  Action,
  RequiredPermission,
} from 'src/common/decorator/permission-roles.decorator';

const PREFIX_CONTROLLER = 'test-permission';

@Controller(PREFIX_CONTROLLER)
export class TestPermissionController {
  constructor(private readonly testPermissionService: TestPermissionService) {}

  @Post()
  @RequiredPermission({ controller: PREFIX_CONTROLLER, action: Action.create })
  create(@Body() createTestPermissionDto: CreateTestPermissionDto) {
    console.log(createTestPermissionDto);
    return this.testPermissionService.create(createTestPermissionDto);
  }

  @Get()
  @RequiredPermission({ controller: PREFIX_CONTROLLER, action: Action.read })
  findAll() {
    return this.testPermissionService.findAll();
  }

  @Get(':id')
  @RequiredPermission({ controller: PREFIX_CONTROLLER, action: Action.read })
  findOne(@Param('id') id: string) {
    return this.testPermissionService.findOne(+id);
  }

  @RequiredPermission({ controller: PREFIX_CONTROLLER, action: Action.update })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTestPermissionDto: UpdateTestPermissionDto,
  ) {
    return this.testPermissionService.update(+id, updateTestPermissionDto);
  }

  @RequiredPermission({ controller: PREFIX_CONTROLLER, action: Action.delete })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testPermissionService.remove(+id);
  }
}
