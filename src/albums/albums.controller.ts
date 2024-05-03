import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumDto } from './dto/album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { GetUser } from '@app/common/decorator/getUser.decorator';
import { User } from '@app/users/entities/user.entity';
import { AlbumFindDto } from './dto/album-find.dto';
import { ValidateAlbum } from './guard/validateAlbum.guard';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { ResponseValidationInterceptor } from '@app/common/interceptor/response-validate.interceptor';
@UseGuards(JwtAuthGuard)
@UseInterceptors( new ResponseValidationInterceptor(AlbumDto))
@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  async create(@Body() createAlbumDto: AlbumDto, @GetUser() loginUser: User):Promise<AlbumDto> {
    return await this.albumsService.create({
      ...createAlbumDto,
      user: loginUser,
    });
  }

  @Post('list')
  async findAll(@Body() queryDto: AlbumFindDto):Promise<AlbumDto[]> {
    const { filter, pagination, sort } = queryDto;
    return await this.albumsService.findAll({ filter, pagination, sort });
  }

  @Get(':id')
  @UseGuards(ValidateAlbum)
  async findOne(@Req() request):Promise<AlbumDto> {
    const album = await request.album;
    return album;
  }

  @Patch(':id')
  @UseGuards(ValidateAlbum)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAlbumDto: UpdateAlbumDto,
    @Req() request,
  ):Promise<AlbumDto> {
    const album = request.album;
    return await this.albumsService.update(+id, updateAlbumDto, album);
  }

  @Delete(':id')
  @UseGuards(ValidateAlbum)
  async remove(@Param('id') id: number) {
    return await this.albumsService.remove(+id);
  }
}
