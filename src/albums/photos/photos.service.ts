import { Injectable } from '@nestjs/common';
import { PhotoDto } from './dto/photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { Album } from '../entities/album.entity';
@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo) private repo: Repository<Photo>,
    @InjectRepository(Album) private albumRepo,
  ) {}
  create(createPhotoDto: PhotoDto) {
    const photo = this.repo.create(createPhotoDto);
    return this.repo.save(photo);
  }

  findAll(filter: { albumId?: string } = {}) {
    return this.repo.find({
      where: {
        album: this.albumRepo.create(filter.albumId),
      },
      relations: ['album'],
      select: {
        id: true,
        title: true,
        url: true,
        thumbnailUrl: true,
        album: {
          id: true,
          title: true,
        },
      },
    });
  }

  findOne(albumId: number, id: number) {
    return this.repo.findOne({
      where: { id, album: this.albumRepo.create(albumId) },
      relations: ['album'],
      select: {
        id: true,
        title: true,
        url: true,
        thumbnailUrl: true,
        album: {
          id: true,
          title: true,
        },
      },
    });
  }

  async update(albumId, id: number, updatePhotoDto: UpdatePhotoDto) {
    const photo = await this.findOne(albumId, id);
    if (!photo) {
      return null;
    }
    Object.assign(photo, updatePhotoDto);
    return await this.repo.save(photo);
  }

  remove(id: number) {
    return this.repo.delete({ id });
  }
}
