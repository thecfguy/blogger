import { Injectable } from '@nestjs/common';
import { PhotoDto } from './dto/photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { Album } from '../entities/album.entity';
import { PhotoFilterDto } from './dto/photo-filter.dto';
import { PhotoFindDto } from './dto/photo-find.dto';
import { sortTransform } from '@app/common/service/sort-transform';
@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo) private repo: Repository<Photo>,
    @InjectRepository(Album) private albumRepo,
  ) {}
  async create(createPhotoDto: PhotoDto) {
    const photo = this.repo.create(createPhotoDto);
    return await this.repo.save(photo);
  }

  findAll({filter,pagination,sort,}:PhotoFindDto): Promise<Photo[]> {
     //Pagination Logic
    const { page, maxRows } = pagination 
    const skip = ((page - 1) * maxRows) | 0;
    const take = maxRows ;

     //Find Logic 
    const where: any = { ...filter };
    if (where.id && Array.isArray(where.id)) {
      where.id = In(where.id);
    }
    //Sort Logic
    const order = sortTransform(sort); 
    
    return this.repo.find({
      take,
      skip,
      where,
      order,
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

  findOne( filter: PhotoFilterDto ): Promise<Photo> {
    const modifiedFilter: any = { album: filter?.album };
    if (typeof filter.id === 'number') {
      modifiedFilter.id = filter.id;
    }
    return this.repo.findOne({
      where: modifiedFilter,
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
    const photo = await this.findOne({
       id, album: { id: albumId } ,
    });
    if (!photo) {
      return null;
    }
    Object.assign(photo, updatePhotoDto);
     await this.repo.save(photo);
     return await this.findOne({
      id, album: { id: albumId } ,
   });
  }

  remove(id: number) {
    return this.repo.delete({ id });
  }
}
