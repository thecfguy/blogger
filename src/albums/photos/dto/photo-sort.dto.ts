import { Type } from 'class-transformer';
import { IsEnum, IsIn } from 'class-validator';

enum SortBy {
  ID = 'id',
  TITLE = 'title',
  
}

export class PhotoSortDto {
  @IsEnum(SortBy)
  sortBy: SortBy;

  @IsIn(['ASC', 'DESC'])
  order: 'ASC' | 'DESC';
}
