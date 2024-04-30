import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { Comment } from './entities/comment.entity';
import { PostsService } from '../posts.service';
import { UsersService } from '@app/users/users.service';
import { User } from '@app/users/entities/user.entity';
import { Group } from '@app/group/entities/group.entity';
import { GroupService } from '@app/group/group.service';
import { UsersModule } from '@app/users/users.module';
@Module({
  
  controllers: [CommentsController],
  providers: [CommentsService, PostsService],
  imports: [TypeOrmModule.forFeature([Post, Comment, User,Group]),UsersModule],
})
export class CommentsModule {}
