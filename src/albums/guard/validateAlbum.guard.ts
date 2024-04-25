import {
    Injectable,
    CanActivate,
    ExecutionContext,
    NotFoundException,
  } from '@nestjs/common';
  import { AlbumsService } from '../albums.service'; 
  
  @Injectable()
  export class ValidateAlbum implements CanActivate {
    constructor(private albumService: AlbumsService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const albumId = +request.params?.id;
     
      const album = await this.albumService.findOne({ id: albumId });
     
      if (!album) {
        throw new NotFoundException(`album not found`);
      }
      request.album = album;
      return true;
    }
  }
  