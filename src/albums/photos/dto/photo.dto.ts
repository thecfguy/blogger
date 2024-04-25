import { AlbumMiniDto } from '@app/albums/dto/album-mini.dto';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class PhotoDto {

  @IsOptional()
  @IsNumber()
  @Expose()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Expose()
  title: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  url: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  thumbnailUrl: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => AlbumMiniDto)
  @Expose()
  album: AlbumMiniDto;
}
