import { UserMiniDto } from '@app/users/dto/user-mini.dto';
export class AlbumDto {
  id: number;
  title: string;
  user: UserMiniDto;
}
