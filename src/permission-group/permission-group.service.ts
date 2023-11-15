import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePermissionGroupDto } from './dto/create-permission-group.dto';
import { UpdatePermissionGroupDto } from './dto/update-permission-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionGroup } from './entities/permission-group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionGroupService {
  constructor(
    @InjectRepository(PermissionGroup)
    private readonly permissionGroupRepository: Repository<PermissionGroup>,
  ) {}
  async create(createPermissionGroupDto: CreatePermissionGroupDto) {
    return await this.permissionGroupRepository.save(createPermissionGroupDto);
  }

  async findAll() {
    return await this.permissionGroupRepository.find();
  }

  async findOne(id: string) {
    const permissionGroup = await this.permissionGroupRepository.findOne({
      where: { id },
    });
    if (!permissionGroup) {
      throw new BadRequestException(`PermissionGroup ${id} not found`);
    }
    return permissionGroup;
  }

  async update(id: string, updatePermissionGroupDto: UpdatePermissionGroupDto) {
    const permissionGroup = await this.findOne(id);
    const updatePermissionGroup = Object.assign(
      {},
      permissionGroup,
      updatePermissionGroupDto,
    );
    return await this.permissionGroupRepository.save(updatePermissionGroup);
  }

  async remove(id: string) {
    const permissionGroup = await this.findOne(id);
    await this.permissionGroupRepository.delete(id);
    return permissionGroup;
  }
}
