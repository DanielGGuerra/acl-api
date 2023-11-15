import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PermissionGroup } from 'src/permission-group/entities/permission-group.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export default class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @ApiProperty()
  @Column({ type: 'boolean', nullable: false, default: false })
  activated: boolean;

  @ApiProperty()
  @Column({ type: 'boolean', nullable: false, default: false })
  isAdmin: boolean;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @ApiProperty()
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  login: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 300, nullable: false })
  password: string;

  @ApiProperty()
  @ManyToOne(() => PermissionGroup)
  @JoinColumn()
  permissionGroup: PermissionGroup;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
