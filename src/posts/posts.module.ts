import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { CommentsModule } from './comments/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comments/entities/comment.entity';
import { Post } from './entities/post.entity';
@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [CommentsModule, TypeOrmModule.forFeature([Post, Comment])],
})
export class PostsModule {}
