import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { GetUser } from '@app/common/decorator/getUser.decorator';
import { User } from '@app/users/entities/user.entity';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { UserDto } from '@app/users/dto/user.dto';

@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() createPostDto: PostDto, @GetUser() loginUser: User) {
    //return message also for particular operations
    const post = await this.postsService.create(createPostDto, loginUser);
    return { data: post, message: 'Post Created Succesfully' };
  }

  @Get()
  async findAll() {
    const posts = await this.postsService.findAll();
    return { data: posts, message: ' All Posts Found Succesfully' };
  }

  @Get(':id')
  async findOne(@Param('id',ParseIntPipe) id: number) {
    const post = await  this.postsService.findOne(id);
   
    if(!post){
      throw new NotFoundException('Post not found')
    }
    return { data: post, message: 'Post Found Succesfully' };
  }

  @Patch(':id')
  async update(@Param('id',ParseIntPipe) id: number, @Body() updatePostDto: UpdatePostDto) {
    const findPost = await  this.postsService.findOne(id);
   
    if(!findPost){
      throw new NotFoundException('Post not found')
    }
    const post = await this.postsService.update(id, updatePostDto);
    
    return { data: post, message: 'Post Updated Succesfully' };
  }

  @Delete(':id')
  async remove(@Param('id',ParseIntPipe) id: number) {
    const findPost = await  this.postsService.findOne(id);
   
    if(!findPost){
      throw new NotFoundException('Post not found')
    }
    const post = await this.postsService.remove(id);
    return { message: 'Post deleted Succesfully' };
  }
}
