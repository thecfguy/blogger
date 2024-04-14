import { Injectable } from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private repo: Repository<Post>) {}

  create(createPostDto: PostDto) {
    const post = this.repo.create(createPostDto);
    return this.repo.save(post);
  }

  findAll() {
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
    });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
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
    return this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
