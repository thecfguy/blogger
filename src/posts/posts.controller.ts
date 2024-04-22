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
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { GetUser } from '@app/common/decorator/getUser.decorator';
import { User } from '@app/users/entities/user.entity';
import { PostFindDto } from './dto/post-find.dto';
import { ValidatePost } from './guard/ValidatePost.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() createPostDto: PostDto, @GetUser() loginUser: User) {
    return await this.postsService.create({
      ...createPostDto,
      user: loginUser,
    });
  }

  @Post('list')
  async findAll(@Body() queryDto: PostFindDto) {
    const { filter, pagination, sort } = queryDto;
    return await this.postsService.findAll({ filter, pagination, sort });
  }

  @Get(':id')
  @UseGuards(ValidatePost)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    //TODO: Get it from Request
    const post = await this.postsService.findOne({ id: id });
    return post;
  }

  @Patch(':id')
  @UseGuards(ValidatePost)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    //TODO: We should latest full post object
    return await this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(ValidatePost)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.postsService.remove(id);
  }
}
