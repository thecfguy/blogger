import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ParseIntPipe } from '@nestjs/common';
import { PostsService } from '../posts.service';
import { NotFoundException } from '@nestjs/common';
import { PostDto } from '../dto/post.dto';

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
    const post = await this.postsService.findOne(postId);
    if (!post) throw new NotFoundException('Post not found');
    return this.commentsService.create({
      ...createCommentDto,
      post: { id: postId } as PostDto,
    });
  }

  @Get()
  findAll(@Param('postId') postId: string) {
    return this.commentsService.findAll({ postId: +postId });
  }

  @Get(':id')
  findOne(@Param('postId') postId: string, @Param('id') id: string) {
    return this.commentsService.findOne(+postId, +id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Param('postId', ParseIntPipe) postId: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const postComment = await this.commentsService.findOne(postId, id);

    if (!postComment) throw new NotFoundException();
    await this.commentsService.update(id, updateCommentDto);

    return updateCommentDto;
  }

  @Delete(':id')
  remove(@Param('postId') postId: string, @Param('id') id: string) {
    return this.commentsService.remove(+postId, +id);
  }
}