import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Album } from '@app/albums/entities/album.entity';

@Entity({ name: 'photos' })
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  url: string;

  @Column({ nullable: false })
  thumbnailUrl: string;

  @ManyToOne(() => Album, (album) => album.photos)
  album: Album;
}
