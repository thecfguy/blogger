import { Injectable } from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PaginationDto } from '@app/common/dto/pagination.dto';
import { PostFilterDto } from './dto/post-filter.dto';
import { PostSortDto } from './dto/post-sort.dto';
@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private repo: Repository<Post>) {}

  async create(createPostDto: PostDto): Promise<Post> {
    const post = await this.repo.create(createPostDto);
    return this.repo.save(post);
  }

  findAll({
    filter,
    pagination,
    sort,
  }: {
    filter: PostFilterDto;
    pagination: PaginationDto;
    sort: PostSortDto[];
  }): Promise<Post[]> {
     
    const { page = 1, maxRows } = pagination || {};
    const skip = ((page - 1) * maxRows) | 0;
    const take = maxRows 
    const where: any = { ...filter };
    if (where.id && Array.isArray(where.id)) {
      where.id = In(where.id);
    }
    const order: any = {};
    if (sort && sort.length > 0) {
      sort.forEach((item) => {
        order[item.sortBy] = item.order.toUpperCase();
      });
    }
       
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
    console.log('filter', typeof filter.id)
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
    return await this.repo.update(id, post);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
