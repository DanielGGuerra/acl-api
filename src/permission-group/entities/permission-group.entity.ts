import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100, nullable: false })
  description: string;

  @ApiProperty({ type: [PermissionPolicy] })
  @ManyToMany(() => PermissionPolicy)
  @JoinTable()
  permissionPolicy: PermissionPolicy[];

  @OneToMany(() => User, (user) => user.permissionGroup)
  user: User[];
}
