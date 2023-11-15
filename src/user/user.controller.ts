import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import CreateUserDto from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  Action,
  RequiredPermission,
} from 'src/common/decorator/permission-roles.decorator';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiForbiddenResponse,
  ApiResponse,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import User from './entities/user.entity';
import { BadRequestErrorSchema } from 'src/errors/schemas/bad-request';
import { UnauthorizedErrorSchema } from 'src/errors/schemas/unauthorized';
import { ForbiddenErrorSchema } from 'src/errors/schemas/forbidden';

const PREFIX_CONTROLLER = 'user';

@Controller(PREFIX_CONTROLLER)
@ApiTags('Usuário')
@ApiSecurity('Authorization')
@ApiForbiddenResponse({ type: ForbiddenErrorSchema })
@ApiBadRequestResponse({ type: BadRequestErrorSchema })
@ApiUnauthorizedResponse({ type: UnauthorizedErrorSchema })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, type: User })
  @RequiredPermission({ action: Action.create, controller: PREFIX_CONTROLLER })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @RequiredPermission({ action: Action.read, controller: PREFIX_CONTROLLER })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @RequiredPermission({ action: Action.read, controller: PREFIX_CONTROLLER })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @RequiredPermission({ action: Action.update, controller: PREFIX_CONTROLLER })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @RequiredPermission({ action: Action.delete, controller: PREFIX_CONTROLLER })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
