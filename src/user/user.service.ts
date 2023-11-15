import { BadRequestException, Injectable } from '@nestjs/common';
import CreateUserDto from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import User from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password !== createUserDto.passwordConfirmed) {
      throw new BadRequestException(`Invalid passwordConfirmed`);
    }
    return await this.userRepository.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      relations: {
        permissionGroup: {
          permissionPolicy: {
            module: true,
          },
        },
      },
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        permissionGroup: {
          permissionPolicy: {
            module: true,
          },
        },
      },
    });

    if (!user) {
      throw new BadRequestException(`User ${id} not found`);
    }

    return user;
  }

  async findByLogin(login: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { login },
      relations: {
        permissionGroup: {
          permissionPolicy: {
            module: true,
          },
        },
      },
    });

    if (!user) {
      throw new BadRequestException(`User ${login} not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    const updatedUser = Object.assign({}, user, updateUserDto);
    return await this.userRepository.save(updatedUser);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    await this.userRepository.delete(id);
    return user;
  }
}
