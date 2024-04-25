import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { Photo } from '@app/albums/photos/entities/photo.entity';
import { User } from '@app/users/entities/user.entity';

@Entity({ name: 'albums' })
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  title: string;

  @ManyToOne(() => User, (user) => user.albums)
  user: User;

  @OneToMany(() => Photo, (photo) => photo.album, {
    onDelete: 'CASCADE',
  })
  photos: Photo[];
}
