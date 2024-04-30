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
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotoDto } from './dto/photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { AlbumsService } from '../albums.service';
import { AlbumDto } from '../dto/album.dto';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { PhotoFindDto } from './dto/photo-find.dto';
import { ValidateAlbumAndPhoto } from './guard/validateAlbumAndPhoto.guard';
import { ResponseValidationInterceptor } from '@app/common/interceptor/response-validate.interceptor';
import { Permission } from '@app/common/decorator/permissions.decorator';
import { PermissionGuard } from '@app/common/guard/permission.guard';
@UseGuards(JwtAuthGuard,PermissionGuard)
@UseInterceptors( new ResponseValidationInterceptor(PhotoDto))
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
  ):Promise<PhotoDto> {
    const album = await this.photosService.create({
      ...createPhotoDto,
      album: { id: albumId } as AlbumDto,
    });
    return album;
  }

  @Post('list')
  async findAll(
    @Param('albumId', ParseIntPipe) albumId: number,
    @Body() queryDto: PhotoFindDto,
  ):Promise<PhotoDto[]> {
    const { filter, pagination, sort } = queryDto;
    const modifiedFilter: any = { album: { id: albumId }, ...filter };
    return this.photosService.findAll({
      filter: modifiedFilter,
      pagination,
      sort,
    });
  }

  @Get(':id')
  @Permission({ access: 'READ', ownership: 'OWN', module: 'PHOTO' })
  @UseGuards(ValidateAlbumAndPhoto)
  async findOne(@Req() request):Promise<PhotoDto> {
      const albumPhoto = request.photo;
    return albumPhoto;
  }

  @Patch(':id')
  @UseGuards(ValidateAlbumAndPhoto)
  async update(
    @Param('albumId', ParseIntPipe) albumId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePhotoDto: UpdatePhotoDto,
  ):Promise<PhotoDto> {
    return await this.photosService.update(albumId, id, updatePhotoDto);
  }

  @Delete(':id')
  @UseGuards(ValidateAlbumAndPhoto)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.photosService.remove(+id);
  }
}
