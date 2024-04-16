import { Injectable } from '@nestjs/common';
import { CommentDto } from './dto/comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private repo: Repository<Comment>
  ) {}

  async create(createCommentDto: CommentDto) {
    const comment = await this.repo.create(createCommentDto);
    return await this.repo.save(comment);    
  }

  //TODO: Change any with proper interface
  findAll(filter: any) {
    return this.repo.find({
      where: { post: filter.postId },
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
  async findOne(filter:any) {
    return await this.repo.findOne({
      where: filter ,
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
