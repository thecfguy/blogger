import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: PostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll(@Query('page') page: number, @Query('maxRows') maxRows: number) {
    return this.postsService.findAll({ pagination: { page, maxRows } });
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.postsService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
