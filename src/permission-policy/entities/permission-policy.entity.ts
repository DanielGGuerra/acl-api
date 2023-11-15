import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Module from 'src/module/entities/module.entity';
import { PermissionGroup } from 'src/permission-group/entities/permission-group.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export default class PermissionPolicy {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100, nullable: false })
  description: string;

  @ApiProperty()
  @Column({ type: 'boolean', nullable: false, default: false })
  all: boolean;

  @ApiProperty()
  @Column({ type: 'boolean', nullable: false, default: false })
  read: boolean;

  @ApiProperty()
  @Column({ type: 'boolean', nullable: false, default: false })
  create: boolean;

  @ApiProperty()
  @Column({ type: 'boolean', nullable: false, default: false })
  update: boolean;

  @ApiProperty()
  @Column({ type: 'boolean', nullable: false, default: false })
  delete: boolean;

  @ApiProperty()
  @ManyToOne(() => Module)
  @JoinColumn()
  module: Module;

  @ManyToMany(() => PermissionGroup)
  permissionGroup: PermissionGroup[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
