import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotoDto } from './dto/photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';

@Controller('albums/:albumId/photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post()
  create(@Param('albumId') albumId: string, @Body() createPhotoDto: PhotoDto) {
    return this.photosService.create(createPhotoDto);
  }

  @Get()
  findAll(@Param('albumId') albumId: string) {
    return this.photosService.findAll({ albumId });
  }

  @Get(':id')
  findOne(@Param('albumId') albumId: string, @Param('id') id: string) {
    return this.photosService.findOne(+albumId, +id);
  }

  @Patch(':id')
  update(
    @Param('albumId') albumId: string,
    @Param('id') id: string,
    @Body() updatePhotoDto: UpdatePhotoDto,
  ) {
    return this.photosService.update(albumId, +id, updatePhotoDto);
  }

  @Delete(':id')
  remove(@Param('albumId') albumId: string, @Param('id') id: string) {
    return this.photosService.remove(+id);
  }
}
