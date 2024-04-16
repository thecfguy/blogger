import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() createPostDto: PostDto) {
    const post = await this.postsService.create(createPostDto);
    return { data: post, message: 'Record Created Succesfully' };
  }

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page?: number,
    @Query('limit', ParseIntPipe) limit?: number,
  ) {
    const posts = await this.postsService.findAll(page, limit);
    return { data: posts, message: 'Records found Succesfully' };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const findPost = await this.postsService.findOne(+id);
    if (!findPost) {
      throw new NotFoundException('Record not found');
    }
    return { data: findPost, message: 'Record found succesfully' };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    const findPost = await this.findOne(id);

    if (!findPost) {
      throw new NotFoundException('Record not found');
    }
    const updatePost = await this.postsService.update(+id, updatePostDto);
    return { data: updatePost, message: 'Record Updated Succesfully' };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
