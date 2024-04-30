import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { CommentsModule } from './comments/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { UsersService } from '@app/users/users.service';
import { User } from '@app/users/entities/user.entity';
import { Group } from '@app/group/entities/group.entity';
import { GroupModule } from '@app/group/group.module';
@Module({
  controllers: [PostsController],
  providers: [PostsService,UsersService],
  imports: [CommentsModule,GroupModule, TypeOrmModule.forFeature([Post,User,Group])],
})
export class PostsModule {}
