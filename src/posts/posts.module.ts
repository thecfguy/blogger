import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { CommentsModule } from './comments/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PostResponseInterceptor } from './interceptor/postResponse-format.interceptor';
import { UsersService } from '@app/users/users.service';
import { User } from '@app/users/entities/user.entity';
@Module({
  controllers: [PostsController],
  providers: [PostsService,UsersService],
  imports: [CommentsModule, TypeOrmModule.forFeature([Post,User])],
})
export class PostsModule {}
