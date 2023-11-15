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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nameController: string;

  @OneToMany(
    () => PermissionPolicy,
    (permissionPolicy) => permissionPolicy.module,
  )
  permissionPolicy: PermissionPolicy[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
