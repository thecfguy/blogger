import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Album } from '@app/albums/entities/album.entity';

@Entity({ name: 'photos' })
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 255, nullable: false })
  title: string;

  @Column({length: 255, nullable: false })
  url: string;

  @Column({length: 255, nullable: false })
  thumbnailUrl: string;

  @ManyToOne(() => Album, (album) => album.photos, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  album: Album;
}
