import { PaginationDto } from "@app/common/dto/pagination.dto";
import { PhotoFilterDto } from "./photo-filter.dto";
import { PhotoSortDto } from "./photo-sort.dto";
import { IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class PhotoFindDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => PhotoFilterDto)
  filter?: PhotoFilterDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => PaginationDto)
  pagination?: PaginationDto = { page: 1, maxRows: 50 };

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PhotoSortDto)
  sort?: PhotoSortDto[];
}
