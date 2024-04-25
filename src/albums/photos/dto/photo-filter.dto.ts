import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, ValidateNested } from 'class-validator';

class albumDto {
 @IsNotEmpty()
  @IsNumber()
  id?: number;
}
export class PhotoFilterDto {
  @IsOptional()
  id?: number | number[];
  
  @IsOptional()
  @ValidateNested()
  @Type(() => albumDto)
  album?: albumDto;
}
