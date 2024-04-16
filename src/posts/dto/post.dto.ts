import { UserDto } from '@app/users/dto/user.dto';
import { PostUserDto } from './postUser.dto';

export class PostDto {
  id: number;
  title: string;
  body: string;
  user: PostUserDto;
}
