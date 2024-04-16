import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PostsService } from '../posts.service';
import { User } from '@app/users/entities/user.entity';
import { GetUser } from '@app/common/decorator/getUser.decorator';

@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private postService: PostsService,
  ) {}

  @Post()
  async create(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() createCommentDto: CommentDto,
    @GetUser() user: User,
  ) {
    const findPost = await this.postService.findOne(postId);
    if (!findPost) {
      throw new NotFoundException('Record not Found');
    }
    console.log('findPost', findPost);
    const comment = await this.commentsService.create(
      findPost,
      createCommentDto,
      user,
    );
    return { data: comment, message: 'Record Created Succesfully' };
  }

  @Get()
  async findAll(
    @Param('postId', ParseIntPipe) postId: number,
    @Query('page', ParseIntPipe) page?: number,
    @Query('limit', ParseIntPipe) limit?: number,
  ) {
    const getAllComment = await this.commentsService.findAll(
      { postId: postId },
      page,
      limit,
    );
    return { data: getAllComment, message: 'Records found Succesfully' };
  }

  @Get(':id')
  async findOne(@Param('postId') postId: string, @Param('id') id: string) {
    const findComment = await this.commentsService.findOne(+postId, +id);
    if (!findComment) {
      throw new NotFoundException('Record not found');
    }
    return { data: findComment, message: 'Record Found Succesfully' };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Param('postId', ParseIntPipe) postId: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const findPost = await this.commentsService.findOne(postId, id);

    if (!findPost) {
      throw new NotFoundException('Record not found');
    }
    console.log('findPost', findPost);
    const updateData = await this.commentsService.update(id, updateCommentDto);

    return { data: updateData, message: 'Record Updated Succesfully' };
  }
  @Delete(':id')
  remove(@Param('postId') postId: string, @Param('id') id: string) {
    return this.commentsService.remove(+postId, +id);
  }
}
