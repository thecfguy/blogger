import { UserMiniDto } from '@app/users/dto/user-mini.dto';

export class TodoDto {
  title: string;
  description: string;
  completed: boolean;
  user: UserMiniDto;
}
