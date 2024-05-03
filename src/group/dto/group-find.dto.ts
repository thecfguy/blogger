import { PaginationDto } from '@app/common/dto/pagination.dto';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { GroupFilterDto } from './group-filter.dto';
import { GroupSortDto } from './group-sort.dto';

export class GroupFindDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => GroupFilterDto)
  filter?: GroupFilterDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => PaginationDto)
  pagination?: PaginationDto = { page: 1, maxRows: 50 };

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GroupSortDto)
  sort?: GroupSortDto[];
}
