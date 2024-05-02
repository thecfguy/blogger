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
  ForbiddenException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { GetUser } from '@app/common/decorator/getUser.decorator';
import { User } from '@app/users/entities/user.entity';
import { PostFindDto } from './dto/post-find.dto';
import { ValidatePost } from './guard/ValidatePost.guard';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { ResponseValidationInterceptor } from '@app/common/interceptor/response-validate.interceptor';
import { Action } from '@app/common/constants/action';
import { Posts } from './entities/post.entity';
import { ForbiddenError } from '@casl/ability';
import { AbilityFactory } from '@app/casl/casl-ability.factory';

@UseGuards(JwtAuthGuard)
@UseInterceptors(new ResponseValidationInterceptor(PostDto))
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(
    @Body() createPostDto: PostDto,
    @GetUser() loginUser: User,
  ): Promise<PostDto> {
    const userAbility = new AbilityFactory().defineAbilitiesFor(loginUser);
    try {
      ForbiddenError.from(userAbility).throwUnlessCan(Action.Create, Posts);
      return await this.postsService.create({
        ...createPostDto,
        user: loginUser,
      });
    } catch (err) {
      if (err instanceof ForbiddenError) {
        throw new ForbiddenException(err.message);
      }
    }
  }

  @Post('list')
  async findAll(
    @Body() queryDto: PostFindDto,
    @GetUser() loginUser: User,
  ): Promise<PostDto[]> {
    const { filter, pagination, sort } = queryDto;
    const userAbility = new AbilityFactory().defineAbilitiesFor(loginUser);
    try {
      ForbiddenError.from(userAbility).throwUnlessCan(Action.Read, Posts);
      return await this.postsService.findAll({ filter, pagination, sort });
    } catch (err) {
      if (err instanceof ForbiddenError) {
        throw new ForbiddenException(err.message);
      }
    }
  }

  @Get(':id')
  @UseGuards(ValidatePost)
  async findOne(@Req() request, @GetUser() loginUser: User): Promise<PostDto> {
    const post = request.post;
    const userAbility = new AbilityFactory().defineAbilitiesFor(loginUser);
    try {
      ForbiddenError.from(userAbility).throwUnlessCan(Action.Read, Posts);
      return post;
    } catch (err) {
      if (err instanceof ForbiddenError) {
        throw new ForbiddenException(err.message);
      }
    }
  }

  @Patch(':id')
  @UseGuards(ValidatePost)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
    @GetUser() loginUser: User,
    @Req() request,
  ): Promise<PostDto> {
    const userAbility = new AbilityFactory().defineAbilitiesFor(loginUser);
    try {
      const userId = request.post?.user?.id;
      const postInstance = new Posts({
        ...updatePostDto,
        user: { id: userId } as User,
      });
      ForbiddenError.from(userAbility).throwUnlessCan(
        Action.Update,
        postInstance,
      );
      return await this.postsService.update(id, updatePostDto);
    } catch (err) {
      if (err instanceof ForbiddenError) {
        throw new ForbiddenException('User Can update only their own post.');
      }
    }
  }

  @Delete(':id')
  @UseGuards(ValidatePost)
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() loginUser: User,
  ) {
    const userAbility = new AbilityFactory().defineAbilitiesFor(loginUser);
    try {
      ForbiddenError.from(userAbility).throwUnlessCan(Action.Delete, Posts);
      return await this.postsService.remove(id);
    } catch (err) {
      if (err instanceof ForbiddenError) {
        throw new ForbiddenException(err.message);
      }
    }
  }
}
