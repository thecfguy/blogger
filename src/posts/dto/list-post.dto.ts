import { UserDto } from '@app/users/dto/user.dto';

export class PostListFilterDto {
  id?: number;
  title?: string;
  body?: string;
  user?: UserDto;
  pagination?: {
    page: number;
    maxRows: number;
  };
}
