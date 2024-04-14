import { Todo } from '@app/todos/entities/todo.entity';
import { Post } from '@app/posts/entities/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Album } from '@app/albums/entities/album.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: true })
  street: string;

  @Column({ nullable: true })
  suite: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  zipcode: string;

  @Column('decimal', { precision: 9, scale: 6, nullable: true })
  lat: number;

  @Column('decimal', { precision: 9, scale: 6, nullable: true })
  lng: number;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true, name: 'company_name' })
  companyName: string;

  @Column({ nullable: true, name: 'company_catchPhrase' })
  companyCatchPhrase: string;

  @Column({ nullable: true, name: 'company_bs' })
  companyBs: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Album, (album) => album.user)
  albums: Album[];
}
