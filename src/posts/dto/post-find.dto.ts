import { PaginationDto } from '@app/common/dto/pagination.dto';
import { PostFilterDto } from './post-filter.dto';
import { PostSortDto } from './post-sort.dto';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class PostFindDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => PostFilterDto)
  filter?: PostFilterDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => PaginationDto)
  pagination?: PaginationDto = { page: 1, maxRows: 50 };

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PostSortDto)
  sort?: PostSortDto[];
}
