import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePermissionPolicyDto } from './dto/create-permission-policy.dto';
import { UpdatePermissionPolicyDto } from './dto/update-permission-policy.dto';
import { InjectRepository } from '@nestjs/typeorm';
import PermissionPolicy from './entities/permission-policy.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionPolicyService {
  constructor(
    @InjectRepository(PermissionPolicy)
    private readonly permissionPolicyRepository: Repository<PermissionPolicy>,
  ) {}

  async create(
    createPermissionPolicyDto: CreatePermissionPolicyDto,
  ): Promise<PermissionPolicy> {
    return await this.permissionPolicyRepository.save(
      createPermissionPolicyDto,
    );
  }

  async findAll(): Promise<PermissionPolicy[]> {
    return await this.permissionPolicyRepository.find();
  }

  async findOne(id: string): Promise<PermissionPolicy> {
    const permissionPolicy = await this.permissionPolicyRepository.findOne({
      where: { id },
    });

    if (!permissionPolicy) {
      throw new BadRequestException(`Permission Policy ${id} not found`);
    }

    return permissionPolicy;
  }

  async update(
    id: string,
    updatePermissionPolicyDto: UpdatePermissionPolicyDto,
  ) {
    const permissionPolicy = await this.findOne(id);

    const permissionPolicyUpdate = Object.assign(
      {},
      permissionPolicy,
      updatePermissionPolicyDto,
    );

    return await this.permissionPolicyRepository.save(permissionPolicyUpdate);
  }

  async remove(id: string) {
    const permissionPolicy = await this.findOne(id);
    await this.permissionPolicyRepository.delete(id);
    return permissionPolicy;
  }
}
