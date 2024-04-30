import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from '@app/albums/entities/album.entity';
import { Todo } from '@app/todos/entities/todo.entity';
import { Post } from '@app/posts/entities/post.entity';
import { Group } from '@app/group/entities/group.entity';
import { GroupService } from '@app/group/group.service';
import { Permission } from '@app/group/entities/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Todo, Post, Album,Group,Permission])],
  controllers: [UsersController],
  providers: [UsersService, User,GroupService],
  exports: [UsersService],
})
export class UsersModule {}
