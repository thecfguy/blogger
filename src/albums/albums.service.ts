import { Injectable } from '@nestjs/common';
import { AlbumDto } from './dto/album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { In, Repository } from 'typeorm';
import { PaginationDto } from '@app/common/dto/pagination.dto';
import { AlbumFilterDto } from './dto/album-filter.dto';
import { AlbumSortDto } from './dto/album-sort.dto';

interface FindAllArgs {
  filter: AlbumFilterDto;
  pagination: PaginationDto;
  sort: AlbumSortDto[];
}

@Injectable()
export class AlbumsService {
  constructor(@InjectRepository(Album) private repo: Repository<Album>) {}

  async create(createAlbumDto: AlbumDto) {
    const album = this.repo.create(createAlbumDto);
    return await this.repo.save(album);
  }

  findAll({ filter, pagination, sort }: FindAllArgs) {
    const { page = 1, maxRows } = pagination || {};

    const skip = ((page - 1) * maxRows) | 0;
    const take = maxRows;
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

  findOne(filter: AlbumFilterDto) {
    const modifiedFilter: any = {};
    if (typeof filter.id === 'number') {
      modifiedFilter.id = filter.id;
    }
    return this.repo.findOne({
      where: modifiedFilter,
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
