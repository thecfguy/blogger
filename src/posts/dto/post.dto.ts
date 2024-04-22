import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Expose, Transform, Type } from 'class-transformer';
import { UserDto } from '@app/users/dto/user.dto';

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
  @Type(() => UserDto)
  @Expose() 
  user: Partial<UserDto>;
}
