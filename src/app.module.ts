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
import { ResponseFormateInterceptor } from './common/interceptor/response-formate.interceptor';
import { GroupModule } from './group/group.module';

@Module({
  imports: [
    UsersModule,
    AlbumsModule,
    TodosModule,
    PostsModule,
    ConfigModule,
    DatabaseModule,
    AuthModule,
    GroupModule,   
  ],
  controllers: [AppController],
  providers: [AppService,
    {
    provide: 'APP_INTERCEPTOR',
    useClass: ResponseFormateInterceptor,
  }
  ,],
})
export class AppModule {}
