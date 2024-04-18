import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { Comment } from './entities/comment.entity';
import { PostsService } from '../posts.service';
import { CommentResponseInterceptor } from './interceptor/commentsResponse-formater.interceptor';
@Module({
  controllers: [CommentsController],
  providers: [CommentsService, PostsService],
  imports: [TypeOrmModule.forFeature([Post, Comment])],
})
export class CommentsModule {}
