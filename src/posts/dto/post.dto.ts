import { UserDto } from '@app/users/dto/user.dto';

export class PostDto {
  id: number;
  title: string;
  body: string;
  user: Partial<UserDto>;
}
