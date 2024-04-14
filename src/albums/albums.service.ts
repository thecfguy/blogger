import { Injectable } from '@nestjs/common';
import { AlbumDto } from './dto/album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(@InjectRepository(Album) private repo: Repository<Album>) {}

  create(createAlbumDto: AlbumDto) {
    const album = this.repo.create(createAlbumDto);
    return this.repo.save(album);
  }

  findAll() {
    return this.repo.find({
      relations: ['user'],
      select: {
        id: true,
        title: true,
        user: {
          id: true,
          name: true,
          email: true,
          username: true,
        },
      },
    });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['user'],
      select: {
        id: true,
        title: true,
        user: {
          id: true,
          name: true,
          email: true,
          username: true,
        },
      },
    });
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.repo.findOneBy({ id });
    if (!album) {
      return null;
    }
    Object.assign(album, updateAlbumDto);
    return await this.repo.save(album);
  }

  remove(id: number) {
    return this.repo.delete({ id });
  }
}
