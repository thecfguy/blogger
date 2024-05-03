import {
    Injectable,
    CanActivate,
    ExecutionContext,
    NotFoundException,
  } from '@nestjs/common';
  import { AlbumsService } from '@app/albums/albums.service';
import { PhotosService } from '../photos.service';
  
  @Injectable()
  export class ValidateAlbumAndPhoto implements CanActivate {
    constructor(
      private albumsService: AlbumsService,
      private photosService: PhotosService,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
  
      const albumId = +request.params?.albumId;
      const photoId = +request.params?.id;
  
      const album = await this.albumsService.findOne({ id: albumId });
  
      if (!album) {
        throw new NotFoundException(`Album not found`);
      } 
     
  
      const photo = await this.photosService.findOne({
        id: photoId,
        album: { id: albumId },
      });
  
      if (!photo) {
        throw new NotFoundException(`Photo Not Found`);
      }
    
      request.album = album;
      request.photo = photo;
      
      return true;
    }
  }
  