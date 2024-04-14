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

  async create(postId: number, createCommentDto: CommentDto) {
    createCommentDto.post.id = postId;
    this.repo.create(createCommentDto);
    const comment = await this.repo.save(createCommentDto);
    return this.findOne(postId, comment.id);
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

  findOne(postId: number, id: number) {
    return this.repo.find({
      where: { id, post: this.postRepo.create({ id: postId }) },
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

  async update(postId: number, id: number, updateCommentDto: UpdateCommentDto) {
    if (updateCommentDto['post'] === undefined)
      updateCommentDto['post'] = { id: postId } as PostDto;
    else updateCommentDto['post']['id'] = postId;
    const comment = this.repo.create(updateCommentDto);
    await this.repo.update(id, comment);
    return this.findOne(postId, id);
  }

  remove(postId: number, id: number) {
    return this.repo.delete({ id, post: this.postRepo.create({ id: postId }) });
  }
}
