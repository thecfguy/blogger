import { Todo } from '@app/todos/entities/todo.entity';
import { Post } from '@app/posts/entities/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany ,BeforeInsert, Unique, JoinTable, ManyToMany } from 'typeorm';
import { Album } from '@app/albums/entities/album.entity';
import { Role } from '../dto/user.dto';
import { Group } from '@app/group/entities/group.entity';


@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, unique:true })
  username: string;

  @Column({ nullable: false,unique:true })
  email: string;
  
  @Column({ nullable: false , default: Role.User, name: 'role' })
  role: Role;

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

  @OneToMany(() => Todo, (todo) => todo.user,{cascade:true})
  todos: Todo[];

  @OneToMany(() => Post, (post) => post.user,{cascade:true})
  posts: Post[];

  @OneToMany(() => Album, (album) => album.user,{cascade:true})
  albums: Album[];

  @ManyToMany(() => Group, group => group.users)
  @JoinTable({name:'users_groups_link',joinColumn: {
     name: 'userId', 
  },
  inverseJoinColumn: {
       name: 'groupId', 
  },})
  groups: Group[];


  @BeforeInsert()
  setDefaultRole() {
    if (!this.role) {
      this.role = Role.User;
    }
  }
}
