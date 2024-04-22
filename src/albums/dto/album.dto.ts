import { UserMiniDto } from '@app/users/dto/user-mini.dto';
import { Expose, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
export class AlbumDto {
  @IsOptional()
  @IsNumber()
  @Expose()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Expose()
  title: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => UserMiniDto)
  @Expose()
  user: UserMiniDto;
}
