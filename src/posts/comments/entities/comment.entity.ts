import {  Posts } from '@app/posts/entities/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Unique } from 'typeorm';

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false }) 
  name: string;

  @Column({ nullable: false }) 
  email: string;

  @Column({ nullable: false }) 
  body: string;

  @ManyToOne(() => Posts, (post) => post.comments , {
    cascade: true,
    onDelete: 'CASCADE',
  })
  post: Posts;

  constructor(comment: Partial<Comment>) {
    Object.assign(this,comment)
  }
}
