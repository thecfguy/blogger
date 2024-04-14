import { Expose } from 'class-transformer';

export class UserMiniDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;
}
