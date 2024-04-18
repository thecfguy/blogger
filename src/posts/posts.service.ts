import { Injectable } from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { User } from '@app/users/entities/user.entity';
import { Pagination } from '@app/common/interface/pagination.interface';
@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private repo: Repository<Post>) {}

  async create(createPostDto: PostDto, loginUser: User): Promise<Post> {
    const post = await this.repo.create({ ...createPostDto, user: loginUser });

    return this.repo.save(post);
  }

  findAll(pagination: Pagination) {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;
    return this.repo.find({
      take: limit,
      skip: skip,
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

  async findOne(id: number) {
    return await this.repo.findOne({
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
