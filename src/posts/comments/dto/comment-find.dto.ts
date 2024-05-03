import { PaginationDto } from "@app/common/dto/pagination.dto";
import { CommentFilterDto } from "./comment-filter.dto";
import { CommentSortDto } from "./comment-sort.dto";
import { IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CommentFindDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => CommentFilterDto)
  filter?: CommentFilterDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => PaginationDto)
  pagination?: PaginationDto = { page: 1, maxRows: 50 };

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CommentSortDto)
  sort?: CommentSortDto[];
}
