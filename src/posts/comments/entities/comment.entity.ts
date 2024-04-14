import { Post } from '@app/posts/entities/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  body: string;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;
}
