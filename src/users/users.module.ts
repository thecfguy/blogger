import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from '@app/albums/entities/album.entity';
import { Todo } from '@app/todos/entities/todo.entity';
import { Post } from '@app/posts/entities/post.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, Todo, Post, Album])],
  controllers: [UsersController],
  providers: [UsersService, User],
  exports: [UsersService],
})
export class UsersModule {}
