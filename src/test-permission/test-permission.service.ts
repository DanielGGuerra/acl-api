import { Injectable } from '@nestjs/common';
import { CreateTestPermissionDto } from './dto/create-test-permission.dto';
import { UpdateTestPermissionDto } from './dto/update-test-permission.dto';

@Injectable()
export class TestPermissionService {
  create(createTestPermissionDto: CreateTestPermissionDto) {
    return 'This action adds a new testPermission';
  }

  findAll() {
    return `This action returns all testPermission`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testPermission`;
  }

  update(id: number, updateTestPermissionDto: UpdateTestPermissionDto) {
    return `This action updates a #${id} testPermission`;
  }

  remove(id: number) {
    return `This action removes a #${id} testPermission`;
  }
}
