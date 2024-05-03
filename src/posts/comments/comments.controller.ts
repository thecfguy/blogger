import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  ForbiddenException,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ParseIntPipe } from '@nestjs/common';
import { PostDto } from '../dto/post.dto';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { CommentFindDto } from './dto/comment-find.dto';
import { ValidatePostAndComment } from './guard/ValidatePostAndComment.guard';
import { ResponseValidationInterceptor } from '../../common/interceptor/response-validate.interceptor';
import { ForbiddenError } from '@casl/ability';
import { AbilityFactory } from '@app/casl/casl-ability.factory';
import { GetUser } from '@app/common/decorator/getUser.decorator';
import { User } from '@app/users/entities/user.entity';
import { Action } from '@app/common/constants/action';
import { Comment } from './entities/comment.entity';

//  implement JwtGuard On Controller
@UseGuards(JwtAuthGuard)
@UseInterceptors(new ResponseValidationInterceptor(CommentDto))
@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() createCommentDto: CommentDto,
    @GetUser() loginUser: User,
  ): Promise<CommentDto> {
    const userAbility = new AbilityFactory().defineAbilitiesFor(loginUser);
    try {
      ForbiddenError.from(userAbility).throwUnlessCan(Action.Create, Comment);
      return this.commentsService.create({
        ...createCommentDto,
        post: { id: postId } as PostDto,
      });
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
  }

  @Post('list')
  async findAll(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() queryDto: CommentFindDto,
    @Req() req,
    @GetUser() loginUser: User,
  ): Promise<CommentDto[]> {
    const userAbility = new AbilityFactory().defineAbilitiesFor(loginUser);

    try {
      ForbiddenError.from(userAbility).throwUnlessCan(Action.Read, Comment);
      const { filter, pagination, sort } = queryDto;
      const modifiedFilter: any = { post: { id: postId }, ...filter };
      const { data: comments, count } = await this.commentsService.findAll({
        filter: modifiedFilter,
        pagination,
        sort,
      });
      const { page, maxRows } = pagination;
      req.body['pagination'] = {
        page: page,
        maxRows: maxRows,
        offset: page + 1,
        count: count,
      };
      return comments;
    } catch (err) {
      if (err instanceof ForbiddenError) {
        throw new ForbiddenException(err.message);
      }
    }
  }

  @Get(':id')
  @UseGuards(ValidatePostAndComment)
  async findOne(
    @Req() request,
    @GetUser() loginUser: User,
  ): Promise<CommentDto> {
    const userAbility = new AbilityFactory().defineAbilitiesFor(loginUser);
    try {
      ForbiddenError.from(userAbility).throwUnlessCan(Action.Read, Comment);
      const postComment = request.comment;
      return postComment;
    } catch (err) {
      if (err instanceof ForbiddenError) {
        throw new ForbiddenException(err.message);
      }
    }
  }

  @Patch(':id')
  @UseGuards(ValidatePostAndComment)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
    @GetUser() loginUser: User,
    @Req() request,
  ): Promise<CommentDto> {
    const userAbility = new AbilityFactory().defineAbilitiesFor(loginUser);
    try {
      const post= request.post
      const commentInstance = new Comment({
        ...UpdateCommentDto,
        post: post 
      });
      ForbiddenError.from(userAbility).throwUnlessCan(
        Action.Update,
        commentInstance,
      );
      return await this.commentsService.update(id, updateCommentDto);
    } catch (err) {
      if (err instanceof ForbiddenError) {
        throw new ForbiddenException('User Can update only their own Comment.');
      }
    }
  }

  @Delete(':id')
  @UseGuards(ValidatePostAndComment)
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() loginUser: User,
  ) {
    const userAbility = new AbilityFactory().defineAbilitiesFor(loginUser);

    try {
      ForbiddenError.from(userAbility).throwUnlessCan(Action.Delete, Comment);
      return await this.commentsService.remove(id);
    } catch (err) {
      if (err instanceof ForbiddenError) {
        throw new ForbiddenException(err.message);
      }
    }
  }
}
