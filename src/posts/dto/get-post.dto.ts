import { UserDto } from '@app/users/dto/user.dto';

export class PostGetFilterDto {
  id?: number;
  title?: string;
  body?: string;
  user?: UserDto;
}
