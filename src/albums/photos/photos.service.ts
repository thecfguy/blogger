import { Injectable } from '@nestjs/common';
import { PhotoDto } from './dto/photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { Album } from '../entities/album.entity';
import { FilterDto } from '@app/common/dto/filter.dto';
import { PaginationDto } from '@app/common/dto/pagination.dto';
import { SortDto } from '@app/common/dto/sort.dto';
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

  findAll({
    filter,
    pagination,
    sort,
  }: {
    filter: FilterDto;
    pagination: PaginationDto;
    sort: SortDto[];
  }) {
    
    const { page = 1, maxRows } = pagination || {};
    const skip = ((page - 1) * maxRows) | 0;
    const take = maxRows ;
    const where: any = { ...filter };

    if (where.id && Array.isArray(where.id)) {
      where.id = In(where.id);
    }
    const order: any = {};

    if (sort && sort.length > 0) {
      sort.forEach((item) => {
        order[item.sortBy] = item.order.toUpperCase();
      });
    }
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

  findOne({ filter }: { filter: FilterDto }) {
    const modifiedFilter: any = { album: filter?.post };
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
      filter: { id, post: { id: albumId } },
    });
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
