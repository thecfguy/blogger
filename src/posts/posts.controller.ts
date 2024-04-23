import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { GetUser } from '@app/common/decorator/getUser.decorator';
import { User } from '@app/users/entities/user.entity';
import { PostFindDto } from './dto/post-find.dto';
import { ValidatePost } from './guard/ValidatePost.guard';
import { Request } from 'express';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { ResponseValidationInterceptor } from '@app/common/interceptor/response-validate.interceptor';

@UseGuards(JwtAuthGuard)
@UseInterceptors( new ResponseValidationInterceptor(PostDto))
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
    // @UseInterceptors(PostResponseInterceptor)
  async create(@Body() createPostDto: PostDto, @GetUser() loginUser: User):Promise<PostDto> {
    return await this.postsService.create({
      ...createPostDto,
      user: loginUser,
    });
  }

  @Post('list')
  async findAll(@Body() queryDto: PostFindDto):Promise<PostDto[]> {
    const { filter, pagination, sort } = queryDto;
    return await this.postsService.findAll({ filter, pagination, sort });
  }

  @Get(':id')
  @UseGuards(ValidatePost)
  async findOne(@Req() request):Promise<PostDto> {
    const post = request.post;
    return post;
  }

  @Patch(':id')
  @UseGuards(ValidatePost)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) :Promise<PostDto>{
    //TODO: We should latest full post object
    return await this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(ValidatePost)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.postsService.remove(id);
  }
}
