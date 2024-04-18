import { Injectable } from '@nestjs/common';
import { CommentDto } from './dto/comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';

import { FilterDto } from '@app/common/dto/filter.dto';
import { PaginationDto } from '@app/common/dto/pagination.dto';
import { SortDto } from '@app/common/dto/sort.dto';

@Injectable()
export class CommentsService {
  constructor(@InjectRepository(Comment) private repo: Repository<Comment>) {}

  async create(createCommentDto: CommentDto) {
    const comment = await this.repo.create(createCommentDto);

    return await this.repo.save(comment);
  }

  //TODO: Change any with proper interface
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
    const take = maxRows 
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
      relations: ['post'],
      select: {
        id: true,
        name: true,
        email: true,
        body: true,
        post: {
          id: true,
          title: true,
        },
      },
    });
  }

  //TODO: Change any with proper interface
  async findOne({ filter }: { filter: FilterDto }): Promise<Comment> {
    const modifiedFilter: any = { post: filter?.post };
    if (typeof filter.id === 'number') {
      modifiedFilter.id = filter.id;
    }
    return await this.repo.findOne({
      where: modifiedFilter,
      relations: ['post'],
      select: {
        id: true,
        name: true,
        email: true,
        body: true,
        post: {
          id: true,
          title: true,
        },
      },
    });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    return await this.repo.update(id, updateCommentDto);
  }

  remove(id: number) {
    return this.repo.delete({ id });
  }
}
