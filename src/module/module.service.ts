import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Module from './entities/module.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ModuleService {
  constructor(
    @InjectRepository(Module)
    private readonly moduleRepository: Repository<Module>,
  ) {}

  async create(createModuleDto: CreateModuleDto): Promise<Module> {
    return await this.moduleRepository.save(createModuleDto);
  }

  async findAll(): Promise<Module[]> {
    return await this.moduleRepository.find();
  }

  async findOne(id: string): Promise<Module> {
    const module = await this.moduleRepository.findOne({ where: { id } });
    if (!module) {
      throw new BadRequestException(`Module ${id} not found`);
    }
    return module;
  }

  async update(id: string, updateModuleDto: UpdateModuleDto): Promise<Module> {
    const module = await this.findOne(id);
    const updatedModule = Object.assign({}, module, updateModuleDto);
    return await this.moduleRepository.save(updatedModule);
  }

  async remove(id: string): Promise<Module> {
    const module = await this.findOne(id);
    await this.moduleRepository.delete({ id });
    return module;
  }
}
