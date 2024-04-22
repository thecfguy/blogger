import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  //ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumDto } from './dto/album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { GetUser } from '@app/common/decorator/getUser.decorator';
import { User } from '@app/users/entities/user.entity';
import { AlbumFindDto } from './dto/album-find.dto';
// @UseGuards(JwtAuthGuard)
@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  async create(@Body() createAlbumDto: AlbumDto, @GetUser() loginUser: User) {
    return await this.albumsService.create({
      ...createAlbumDto,
      user: loginUser,
    });
  }

  @Post('list')
  async findAll(@Body() queryDto: AlbumFindDto) {
    const { filter, pagination, sort } = queryDto;

    return await this.albumsService.findAll({ filter, pagination, sort });
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    console.log(id);
    const album = await this.albumsService.findOne({ id: id });
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  @Patch(':id')
  async update(id: number, @Body() updateAlbumDto: UpdateAlbumDto) {
    const album = await this.albumsService.findOne({ id: id });
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return await this.albumsService.update(+id, updateAlbumDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const album = await this.albumsService.findOne({ id: id });
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return await this.albumsService.remove(+id);
  }
}
