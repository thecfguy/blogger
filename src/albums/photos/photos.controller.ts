import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotoDto } from './dto/photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { AlbumsService } from '../albums.service';
import { AlbumDto } from '../dto/album.dto';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { PhotofindAllBodyDto } from './dto/photoFindAll-body.dto';
// @UseGuards(JwtAuthGuard)
@Controller('albums/:albumId/photos')
export class PhotosController {
  constructor(
    private readonly photosService: PhotosService,
    private albumService: AlbumsService,
  ) {}

  @Post()
  async create(
    @Param('albumId', ParseIntPipe) albumId: number,
    @Body() createPhotoDto: PhotoDto,
  ) {
    const findAlbum = await this.albumService.findOne({ id: albumId });
    if (!findAlbum) throw new NotFoundException('Album not found');
    const album = await this.photosService.create({
      ...createPhotoDto,
      album: { id: albumId } as AlbumDto,
    });
    return album;
  }

  @Post('list')
  async findAll(
    @Param('albumId', ParseIntPipe) albumId: number,
    @Body() queryDto: PhotofindAllBodyDto,
  ) {
    // const photoQuery = new findAllQueryDto(queryDto);
    const { filter, pagination, sort } = queryDto;
    const modifiedFilter: any = { album: { id: albumId }, ...filter };
    return this.photosService.findAll({
      filter: modifiedFilter,
      pagination,
      sort,
    });
  }

  @Get(':id')
  async findOne(
    @Param('albumId', ParseIntPipe) albumId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const albumPhoto = await this.photosService.findOne({
      filter:{id,album : { id: albumId }},
     
    });
    if (!albumPhoto) {
      throw new NotFoundException('Photo not found');
    }
    return albumPhoto;
  }

  @Patch(':id')
  async update(
    @Param('albumId', ParseIntPipe) albumId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePhotoDto: UpdatePhotoDto,
  ) {
    const albumPhoto = await this.photosService.findOne({
      filter:{id,album : { id: albumId }},
     
    });
    if (!albumPhoto) {
      throw new NotFoundException('Photo not found');
    }
     await  this.photosService.update(albumId, id, updatePhotoDto);
     return updatePhotoDto
  }

  @Delete(':id')
  async remove(
    @Param('albumId', ParseIntPipe) albumId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const albumPhoto = await this.photosService.findOne({
      filter:{id,album : { id: albumId }},
     
    });
    if (!albumPhoto) {
      throw new NotFoundException('Photo not found');
    }
    return  await this.photosService.remove(+id);
  }
}
