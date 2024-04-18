import { Injectable } from '@nestjs/common';
import { CommentDto } from './dto/comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { CommentFilter } from './dto/commentFilter.interface';
import { Pagination } from '@app/common/interface/pagination.interface';

@Injectable()
export class CommentsService {
  constructor(@InjectRepository(Comment) private repo: Repository<Comment>) {}

  async create(createCommentDto: CommentDto) {
    const comment = await this.repo.create(createCommentDto);
    console.log('comment', comment);
    return await this.repo.save(comment);
  }

  //TODO: Change any with proper interface
  findAll(filter: CommentFilter, pagination?: Pagination):Promise<Comment[]> {
    const modifiedFilter: any = { post: filter.post };

    if (typeof filter.id === 'number') {
      modifiedFilter.id = filter.id;
    } else if (Array.isArray(filter.id)) {
      modifiedFilter.id = In(filter.id);
    }
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;
    return this.repo.find({
      take: limit,
      skip: skip,
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

  //TODO: Change any with proper interface
  async findOne(filter: CommentFilter):Promise<Comment> {
    const modifiedFilter: any = { post: filter.post };

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
