import { Injectable } from '@nestjs/common';
import { CommentDto } from './dto/comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Post } from '../entities/post.entity';
import { PostDto } from '../dto/post.dto';
@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private repo: Repository<Comment>,
    @InjectRepository(Post) private postRepo: Repository<Post>,
  ) {}

  async create(createCommentDto: CommentDto) {
    const comment = await this.repo.create(createCommentDto);
    return await this.repo.save(comment);    
  }

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

  async findOne(postId: number, id: number) {
    return await this.repo.findOne({
      where: { id, post: { id: postId } },
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

  remove(postId: number, id: number) {
    return this.repo.delete({ id, post: this.postRepo.create({ id: postId }) });
  }
}
