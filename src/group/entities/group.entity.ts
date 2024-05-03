import { User } from '@app/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Permissions } from './permission.entity';

@Entity('group')
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @OneToMany(() => Permissions, (permission) => permission.group, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  permissions: Permissions[];

  @ManyToMany(() => User, (user) => user.groups)
  users?: User[];
}


