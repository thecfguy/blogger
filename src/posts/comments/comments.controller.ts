import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ParseIntPipe } from '@nestjs/common';
import { PostsService } from '../posts.service';
import { NotFoundException } from '@nestjs/common';
import { PostDto } from '../dto/post.dto';
import { GetUser } from '@app/common/decorator/getUser.decorator';
import { User } from '@app/users/entities/user.entity';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { Pagination } from '@app/common/interface/pagination.interface';

import { findAllQueryDto } from '../../common/dto/findAllQuery.dto';
import { In } from 'typeorm';

//  implement JwtGuard On Controller
@UseGuards(JwtAuthGuard)
@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly postsService: PostsService,
  ) {}

  @Post()
  async create(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() createCommentDto: CommentDto,
  ) {
    const findPost = await this.postsService.findOne({id:postId});
    if (!findPost) throw new NotFoundException('Post not found');
    const comment = await this.commentsService.create({
      ...createCommentDto,
      post: { id: postId } as PostDto,
    });

    return comment;
  }

  @Post('list')
  async findAll(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() queryDto: findAllQueryDto,
  ) {
  
    // queryDto.filter.post = { id: postId };
    const { filter, pagination, sort } = queryDto;
    const modifiedFilter: any = { post: { id: postId }, ...filter };

    const comments = await this.commentsService.findAll({
      filter: modifiedFilter,
      pagination,
      sort,
    });
    return comments;
  }

  @Get(':id')
  async findOne(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    // check if the comment is belongs with the post
    const postComment = await this.commentsService.findOne({
      filter:{id,post: { id: postId }},
     
    });
    // Error: comment not found
    if (!postComment) throw new NotFoundException('Comment not found');
    return postComment
  }

  @Patch(':id')
  async update(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    // check if the comment is belongs with the post
    const postComment = await this.commentsService.findOne({
      filter:{id,post: { id: postId }},
    });
    // Error: comment not found
    if (!postComment) throw new NotFoundException('Comment not found');

    // update the comment
     await this.commentsService.update(id, updateCommentDto);
     return updateCommentDto
  }


  @Delete(':id')
  async remove(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    // check if the comment is belongs with the post
    const postComment = await this.commentsService.findOne({
      filter:{id,post: { id: postId }},
    });
    // Error: comment not found
    if (!postComment) throw new NotFoundException('Comment not found');
    return await this.commentsService.remove(id);
  }
}
