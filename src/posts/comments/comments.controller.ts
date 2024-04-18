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
    const post = await this.postsService.findOne({ id: postId });
    if (!post) throw new NotFoundException('Post not found');
    return this.commentsService.create({
      ...createCommentDto,
      post: { id: postId } as PostDto,
    });
  }

  @Get()
  findAll(@Param('postId', ParseIntPipe) postId: number) {
    return this.commentsService.findAll({ post: { id: postId } });
  }

  @Get(':id')
  findOne(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.commentsService.findOne({ id, post: { id: postId } });
  }

  @Patch(':id')
  async update(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    // check if the comment is belongs with the post
    const postComment = await this.commentsService.findOne({
      id,
      post: { id: postId },
    });
    // Error: comment not found
    if (!postComment) throw new NotFoundException('Comment not found');

    // update the comment
    await this.commentsService.update(id, updateCommentDto);
    return updateCommentDto;
  }

  @Delete(':id')
  async remove(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    // check if the comment is belongs with the post
    const postComment = await this.commentsService.findOne({
      id,
      post: { id: postId },
    });
    // Error: comment not found
    if (!postComment) throw new NotFoundException('Comment not found');
    return this.commentsService.remove(id);
  }
}
