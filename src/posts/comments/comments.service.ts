import { Injectable } from '@nestjs/common';
import { CommentDto } from './dto/comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { CommentGetFilterDto } from './dto/getfilter.dto';
import { CommentListFilterDto } from './dto/listfilter.dto';

@Injectable()
export class CommentsService {
  constructor(@InjectRepository(Comment) private repo: Repository<Comment>) {}

  async create(createCommentDto: CommentDto) {
    const comment = await this.repo.create(createCommentDto);
    return await this.repo.save(comment);
  }

  //TODO: Change any with proper interface
  findAll(filter: CommentListFilterDto) {
    const newFilters = { post: filter.post, id: In(filter.id) };
    return this.repo.find({
      where: newFilters, // getting error here...
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
  async findOne(filter: CommentGetFilterDto) {
    return await this.repo.findOne({
      where: filter, // getting error here...
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
