import { Expose, Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { PostDto } from '@app/posts/dto/post.dto';

export class CommentDto {
  @IsOptional()
  @IsNumber()
  @Expose() 
  id: number;

  @IsNotEmpty()
  @IsString()
  @Expose() 
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Expose() 
  email: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  body: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => PostDto)
  @Expose() 
  post: PostDto;
}
