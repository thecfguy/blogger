import { User } from '@app/users/entities/user.entity';
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from '../comments/entities/comment.entity';

@Entity({ name: 'posts' })
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 255, nullable: false })
  title: string;

  @Column({length: 255, nullable: false })
  body: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post,{
    onDelete: 'CASCADE',
  })
  comments: Comment[];

  constructor(posts: Partial<Posts>) {
    Object.assign(this,posts)
  }

}
