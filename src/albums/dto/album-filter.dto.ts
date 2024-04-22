import { IsNotEmpty, IsOptional } from "class-validator";

export class AlbumFilterDto {
  @IsNotEmpty()
  id?: number | number[];
}
