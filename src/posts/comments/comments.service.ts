import { Injectable } from '@nestjs/common';
import { CommentDto } from './dto/comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';

import { User } from '@app/users/entities/user.entity';
@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private repo: Repository<Comment>,
   
  ) {}

  async create(post, createCommentDto: CommentDto,user:User) {
    const comment = this.repo.create({ ...createCommentDto, post });
    const savedComment = await this.repo.save(comment);

    return savedComment;
  }

  findAll(filter: any,page: number, limit: number ) {
    const skip = (page - 1) * limit;
    return this.repo.find({
      where: { post: filter.postId },
      relations: ['post'],
      take: limit,
      skip: skip,
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

  async findOne(filter:any) {
    return await this.repo.findOne({
      where: filter,
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
    
    const updateComment = await this.repo.update(id, updateCommentDto);
    console.log('updateComment',updateComment)
    if (updateComment.affected > 0) {
      const updatedComment = await this.repo.findOne({where:{
        id:id
      }});
      return updatedComment;
    } 
    return updateComment;
  }

  remove(id: number) {
    return this.repo.delete({ id });
  }
}
