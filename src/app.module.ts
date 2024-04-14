import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AlbumsModule } from './albums/albums.module';
import { TodosModule } from './todos/todos.module';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@app/common/config/config.module';
import { DatabaseModule } from './common/database/database.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    UsersModule,
    AlbumsModule,
    TodosModule,
    PostsModule,
    ConfigModule,
    DatabaseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
