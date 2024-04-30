import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Expose, Transform, Type } from 'class-transformer';
import { UserMiniDto } from '@app/users/dto/user-mini.dto';


export class PostDto {
  @IsOptional()
  @IsNumber()
  @Expose() 
  id: number;

  @IsNotEmpty()
  @IsString()
  @Expose() 
  title: string;

  @IsString()
  @IsNotEmpty()
  @Expose() 
  body: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UserMiniDto)
  @Expose()
  user: UserMiniDto;
}
