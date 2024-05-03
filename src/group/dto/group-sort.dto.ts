import { IsEnum, IsIn } from 'class-validator';

enum SortBy {
  ID = 'id',
  NAME = 'title',
}

export class GroupSortDto {
  @IsEnum(SortBy)
  sortBy: SortBy;

  @IsIn(['ASC', 'DESC'])
  order: 'ASC' | 'DESC';
}
