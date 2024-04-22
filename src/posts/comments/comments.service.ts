import { Injectable } from '@nestjs/common';
import { CommentDto } from './dto/comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { CommentFilterDto } from './dto/comment-filter.dto';
import { CommentFindDto } from './dto/comment-find.dto';
import { sortTransform } from '@app/common/service/sort-transform';

@Injectable()
export class CommentsService {
  constructor(@InjectRepository(Comment) private repo: Repository<Comment>) {}

   create(createCommentDto: CommentDto):Promise<CommentDto> {
    const comment =  this.repo.create(createCommentDto);
     return this.repo.save(comment);  
     
  }

  //TODO: Change any with proper interface
  findAll({
    filter,
    pagination,
    sort,
  }: CommentFindDto): Promise<Comment[]> {

   //Pagination Logic
    const { page , maxRows } = pagination ;
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
  async findOne(filter : CommentFilterDto ): Promise<Comment> {
    const modifiedFilter: any = { post: filter?.post };
    if (typeof filter.id === 'number') {
      modifiedFilter.id = filter.id;
    }
    return await this.repo.findOne({
      where: modifiedFilter,
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
     await this.repo.update(id, updateCommentDto);
     return this.findOne({ id: id })
  }

  remove(id: number) {
    return this.repo.delete({ id });
  }
}
