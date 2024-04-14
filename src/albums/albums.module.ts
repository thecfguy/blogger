import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { PhotosModule } from './photos/photos.module';
import { Album } from './entities/album.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './photos/entities/photo.entity';
@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  imports: [PhotosModule, TypeOrmModule.forFeature([Album, Photo])],
})
export class AlbumsModule {}
