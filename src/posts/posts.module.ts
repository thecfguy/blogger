import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { CommentsModule } from './comments/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './entities/post.entity';
import { UsersService } from '@app/users/users.service';
import { User } from '@app/users/entities/user.entity';
import { Group } from '@app/group/entities/group.entity';
import { GroupModule } from '@app/group/group.module';
import { AbilityModule } from '@app/casl/casl.module';
@Module({
  controllers: [PostsController],
  providers: [PostsService, UsersService],
  imports: [
    CommentsModule,
    GroupModule,
    TypeOrmModule.forFeature([Posts, User, Group]),
    AbilityModule,
  ],
})
export class PostsModule {}
