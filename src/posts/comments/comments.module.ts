import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { Comment } from './entities/comment.entity';
import { PostsService } from '../posts.service';
import { CommentResponseInterceptor } from './interceptor/commentsResponse-formater.interceptor';
import { UsersService } from '@app/users/users.service';
import { UsersModule } from '@app/users/users.module';
import { User } from '@app/users/entities/user.entity';
@Module({
  
  controllers: [CommentsController],
  providers: [CommentsService, PostsService,UsersService],
  imports: [TypeOrmModule.forFeature([Post, Comment, User])],
})
export class CommentsModule {}
