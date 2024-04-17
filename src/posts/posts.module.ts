import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { CommentsModule } from './comments/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PostResponseInterceptor } from './interceptor/postResponse-format.interceptor';
@Module({
  controllers: [PostsController],
  providers: [PostsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: PostResponseInterceptor,
    },
  ],
  imports: [CommentsModule, TypeOrmModule.forFeature([Post])],
})
export class PostsModule {}
