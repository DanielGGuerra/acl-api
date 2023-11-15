import { ApiProperty } from '@nestjs/swagger';
import PermissionPolicy from 'src/permission-policy/entities/permission-policy.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export default class Module {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100, nullable: false })
  nameController: string;

  @OneToMany(
    () => PermissionPolicy,
    (permissionPolicy) => permissionPolicy.module,
  )
  permissionPolicy: PermissionPolicy[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
