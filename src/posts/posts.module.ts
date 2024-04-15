import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { CommentsModule } from './comments/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [CommentsModule, TypeOrmModule.forFeature([Post])],
})
export class PostsModule {}
