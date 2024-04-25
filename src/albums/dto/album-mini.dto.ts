import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class AlbumMiniDto {
  @IsOptional()
  @IsNumber()
  id: number;
  
  @IsNotEmpty()
  @IsString()
  title: string;
}
