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

@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(
    @Param('postId') postId: string,
    @Body() createCommentDto: CommentDto,
  ) {
    return this.commentsService.create(+postId, createCommentDto);
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
  update(
    @Param('postId') postId: string,
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(+postId, +id, updateCommentDto);
  }
  @Delete(':id')
  remove(@Param('postId') postId: string, @Param('id') id: string) {
    return this.commentsService.remove(+postId, +id);
  }
}
