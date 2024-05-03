import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from '../entities/post.entity';
import { Comment } from './entities/comment.entity';
import { PostsService } from '../posts.service';
import { User } from '@app/users/entities/user.entity';
import { Group } from '@app/group/entities/group.entity';
import { UsersModule } from '@app/users/users.module';
@Module({
  
  controllers: [CommentsController],
  providers: [CommentsService, PostsService],
  imports: [TypeOrmModule.forFeature([Posts, Comment, User,Group]),UsersModule],
})
export class CommentsModule {}
