import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AlbumsModule } from './albums/albums.module';
import { TodosModule } from './todos/todos.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [UsersModule, AlbumsModule, TodosModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
