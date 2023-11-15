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

@Entity()
export default class PermissionPolicy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  description: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  all: boolean;

  @Column({ type: 'boolean', nullable: false, default: false })
  read: boolean;

  @Column({ type: 'boolean', nullable: false, default: false })
  create: boolean;

  @Column({ type: 'boolean', nullable: false, default: false })
  update: boolean;

  @Column({ type: 'boolean', nullable: false, default: false })
  delete: boolean;

  @ManyToOne(() => Module)
  @JoinColumn()
  module: Module;

  @ManyToMany(() => PermissionGroup)
  permissionGroup: PermissionGroup[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
