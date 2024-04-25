import { Injectable } from '@nestjs/common';
import { AlbumDto } from './dto/album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { In, Repository } from 'typeorm';
import { AlbumFilterDto } from './dto/album-filter.dto';
import { AlbumFindDto } from './dto/album-find.dto';
import { sortTransform } from '@app/common/service/sort-transform';

@Injectable()
export class AlbumsService {
  constructor(@InjectRepository(Album) private repo: Repository<Album>) {}

  async create(createAlbumDto: AlbumDto) {
    const album = this.repo.create(createAlbumDto);
    return await this.repo.save(album);
  }

  findAll({ filter, pagination, sort }: AlbumFindDto):Promise<Album[]> {
    //Pagination Logic
    const { page, maxRows } = pagination;
    const skip = ((page - 1) * maxRows) | 0;
    const take = maxRows;

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

  findOne(filter: AlbumFilterDto):Promise<Album> {
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

  async update(id: number, updateAlbumDto: UpdateAlbumDto, album) {
    Object.assign(album, updateAlbumDto);
    await this.repo.save(album);

    return this.findOne({ id: id });
  }

  remove(id: number) {
    return this.repo.delete({ id });
  }
}
