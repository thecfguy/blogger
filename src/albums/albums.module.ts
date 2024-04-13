import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { PhotosModule } from './photos/photos.module';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  imports: [PhotosModule],
})
export class AlbumsModule {}
