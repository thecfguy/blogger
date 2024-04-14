import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from '../entities/album.entity';
import { Photo } from './entities/photo.entity';

@Module({
  controllers: [PhotosController],
  providers: [PhotosService],
  imports: [TypeOrmModule.forFeature([Album, Photo])],
})
export class PhotosModule {}
