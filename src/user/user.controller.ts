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
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiParam,
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
  @ApiCreatedResponse({ type: User })
  @RequiredPermission({ action: Action.create, controller: PREFIX_CONTROLLER })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({ type: [User] })
  @RequiredPermission({ action: Action.read, controller: PREFIX_CONTROLLER })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'ID do usuário',
    example: '33b5059f-d90a-4803-ad35-ee3ff507e2f1',
  })
  @ApiOkResponse({ type: User })
  @RequiredPermission({ action: Action.read, controller: PREFIX_CONTROLLER })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: CreateUserDto })
  @ApiParam({
    name: 'id',
    description: 'ID do usuário',
    example: '33b5059f-d90a-4803-ad35-ee3ff507e2f1',
  })
  @ApiOkResponse({ type: User })
  @RequiredPermission({ action: Action.update, controller: PREFIX_CONTROLLER })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'ID do usuário',
    example: '33b5059f-d90a-4803-ad35-ee3ff507e2f1',
  })
  @ApiOkResponse({ type: User })
  @RequiredPermission({ action: Action.delete, controller: PREFIX_CONTROLLER })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
