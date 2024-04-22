import { Post } from '@app/posts/entities/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Unique } from 'typeorm';

@Entity({ name: 'comments' })
@Unique(['email'])
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false }) 
  name: string;

  @Column({ unique: true, nullable: false }) 
  email: string;

  @Column({ nullable: false }) 
  body: string;

  @ManyToOne(() => Post, (post) => post.comments, { cascade: true })
  post: Post;
}
