import { PaginationDto } from "@app/common/dto/pagination.dto";
import { AlbumFilterDto } from "./album-filter.dto";
import { AlbumSortDto } from "./album-sort.dto";
import { IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class AlbumfindAllBodyDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => AlbumFilterDto)
  filter?: AlbumFilterDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => PaginationDto)
  pagination?: PaginationDto = { page: 1, maxRows: 50 };

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AlbumSortDto)
  sort?: AlbumSortDto[];
}
