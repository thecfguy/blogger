import { Injectable } from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostFilterDto } from './dto/post-filter.dto';
import { PostFindDto } from './dto/post-find.dto';
import { sortTransform } from '@app/common/service/sort-transform';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private repo: Repository<Post>) {}

  async create(createPostDto: PostDto): Promise<Post> {
    const post = await this.repo.create(createPostDto);
    return this.repo.save(post);
  }

  findAll({ filter, pagination, sort }: PostFindDto): Promise<Post[]> {
    //Pagination Logic
    const { page, maxRows } = pagination;
    const skip = ((page - 1) * maxRows) | 0;
    const take = maxRows;

    //Find Logic
    const where: any = { ...filter };
    if (where.id && Array.isArray(where.id)) {
      where.id = In(where.id);
    }

    //Sort Logic
    const order = sortTransform(sort);

    return this.repo.find({
      take,
      skip,
      where,
      order,
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

  async findOne(filter: PostFilterDto): Promise<Post> {
    const modifiedFilter: any = {};
    if (typeof filter.id === 'number') {
      modifiedFilter.id = filter.id;
    }

    return await this.repo.findOne({
      where: modifiedFilter,
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
    return this.findOne({ id: id });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
