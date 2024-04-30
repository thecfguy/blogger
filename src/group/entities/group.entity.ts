import { User } from '@app/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Permission } from './permission.entity';

@Entity('group')
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @OneToMany(() => Permission, (permission) => permission.group, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  permission: Permission[];

  @ManyToMany(() => User, (user) => user.groups)
  users?: User[];
}
