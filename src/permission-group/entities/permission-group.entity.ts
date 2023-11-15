import PermissionPolicy from 'src/permission-policy/entities/permission-policy.entity';
import User from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PermissionGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  description: string;

  @ManyToMany(() => PermissionPolicy)
  @JoinTable()
  permissionPolicy: PermissionPolicy[];

  @OneToMany(() => User, (user) => user.permissionGroup)
  user: User[];
}
