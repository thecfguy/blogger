import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumDto } from './dto/album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  async create(@Body() createAlbumDto: AlbumDto) {
    return await this.albumsService.create(createAlbumDto);
  }

  @Get()
  async findAll(@Query('page', ParseIntPipe) page?: number,
  @Query('limit', ParseIntPipe) limit?: number) {
    return await this.albumsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.albumsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return await this.albumsService.update(+id, updateAlbumDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.albumsService.remove(+id);
  }
}
