import { User } from '@app/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'todos' })
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ default: false })
  completed: boolean;

  @ManyToOne(() => User, (user) => user.todos)
  @JoinColumn({ name: 'userId' })
  user: User;
}
