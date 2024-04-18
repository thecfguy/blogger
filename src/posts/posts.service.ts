import { Injectable } from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostListFilterDto } from './dto/list-post.dto';
import { PostGetFilterDto } from './dto/get-post.dto';
@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private repo: Repository<Post>) {}

  create(createPostDto: PostDto) {
    const post = this.repo.create(createPostDto);
    return this.repo.save(post);
  }

  findAll(filter: PostListFilterDto) {
    return this.repo.find({
      relations: ['user'],
      select: {
        id: true,
        title: true,
        body: true,
        user: {
          id: true,
          name: true,
          email: true,
          username: true,
        },
      },
      skip: (filter.pagination.page - 1) * filter.pagination.maxRows,
      take: filter.pagination.maxRows,
    });
  }

  findOne(filter: PostGetFilterDto) {
    return this.repo.findOne({
      where: filter,
      relations: ['user'],
      select: {
        id: true,
        title: true,
        body: true,
        user: {
          id: true,
          name: true,
          email: true,
          username: true,
        },
      },
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = this.repo.create(updatePostDto);
    await this.repo.update(id, post);
    return this.findOne({ id });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
