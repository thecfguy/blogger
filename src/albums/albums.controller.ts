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
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumDto } from './dto/album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { findAllQueryDto } from '@app/common/dto/findAllQuery.dto';
import { GetUser } from '@app/common/decorator/getUser.decorator';
import { User } from '@app/users/entities/user.entity';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { AlbumfindAllBodyDto } from './dto/albumFindAll-body.dto';
// @UseGuards(JwtAuthGuard)
@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  async create(@Body() createAlbumDto: AlbumDto, @GetUser() loginUser: User) {
    return await this.albumsService.create({...createAlbumDto, user:loginUser});
  }

  @Post('list')
  async findAll(@Body() queryDto:AlbumfindAllBodyDto) {
    // const albumQuery = new findAllQueryDto(queryDto);
    const { filter, pagination, sort } = queryDto;
   
    return await this.albumsService.findAll({ filter, pagination, sort });
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const album= await this.albumsService.findOne({id:id});
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const album= await this.albumsService.findOne({id:id});
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return await this.albumsService.update(+id, updateAlbumDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const album= await this.albumsService.findOne({id:id});
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return await this.albumsService.remove(+id);
  }
}
