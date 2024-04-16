import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { CommentsModule } from './comments/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comments/entities/comment.entity';
import { Post } from './entities/post.entity';
import { ResponseFormateInterceptor } from '@app/common/interceptor/response-formate.interceptor';
@Module({
  controllers: [PostsController],
  providers: [PostsService,{
    provide: 'APP_INTERCEPTOR',
    useClass: ResponseFormateInterceptor,
  },],
  imports: [CommentsModule, TypeOrmModule.forFeature([Post, Comment])],
  exports:[PostsService]
})
export class PostsModule {}
