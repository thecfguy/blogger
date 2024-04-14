import { AlbumMiniDto } from '@app/albums/dto/album-mini.dto';

export class PhotoDto {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  album: AlbumMiniDto;
}
