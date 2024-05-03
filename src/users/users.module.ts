import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from '@app/albums/entities/album.entity';
import { Todo } from '@app/todos/entities/todo.entity';
import { Posts } from '@app/posts/entities/post.entity';
import { Group } from '@app/group/entities/group.entity';
import { GroupService } from '@app/group/group.service';
import { Permissions } from '@app/group/entities/permission.entity';
import { AbilityModule } from '@app/casl/casl.module';

@Module({
  imports: [AbilityModule, TypeOrmModule.forFeature([User, Todo, Posts, Album,Group,Permissions])],
  controllers: [UsersController],
  providers: [UsersService, User,GroupService],
  exports: [UsersService],
})
export class UsersModule {}
