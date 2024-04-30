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
import { PaginationDto } from '@app/common/dto/pagination.dto';
import { Permission } from '@app/common/decorator/permissions.decorator';
import { PermissionGuard } from '@app/common/guard/permission.guard';



//  implement JwtGuard On Controller
@UseGuards(JwtAuthGuard)
@UseInterceptors( new ResponseValidationInterceptor(CommentDto))
@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
  ) {}

  @Post()  
   create(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() createCommentDto: CommentDto,
  ): Promise<CommentDto> {
   return  this.commentsService.create({
      ...createCommentDto,
      post: { id: postId } as PostDto,
    });    
  }

  @Post('list') 
  async findAll(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() queryDto: CommentFindDto,
    @Req() req
  ): Promise<CommentDto[]>  {
    
    const { filter, pagination, sort } = queryDto;
    const modifiedFilter: any = { post: { id: postId }, ...filter };
    const {data: comments, count} = await this.commentsService.findAll({
      filter: modifiedFilter,
      pagination,
      sort,
    });
    const {page,maxRows}=pagination
    req.body['pagination'] = {page:page,maxRows:maxRows,offset:page+1,count:count};
    return comments;
  }

  @Get(':id') 
  @UseGuards(ValidatePostAndComment) 
  async findOne(
    @Req() request
  ): Promise<CommentDto> {
    const postComment = request.comment;
    return postComment
  }

  @Patch(':id')
  @UseGuards(ValidatePostAndComment)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<CommentDto>  {
     return await this.commentsService.update(id, updateCommentDto);
  }


  @Delete(':id')
  @UseGuards(ValidatePostAndComment)
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
  
    return await this.commentsService.remove(id);
  }
}
