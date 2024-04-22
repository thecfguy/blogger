import { Type } from 'class-transformer';
import { IsEnum, IsIn } from 'class-validator';

enum SortBy {
  ID = 'id',
  NAME = 'name',
  EMAIL='email'
}

export class CommentSortDto {
  @IsEnum(SortBy)
  sortBy: SortBy;

  @IsIn(['ASC', 'DESC'])
  order: 'ASC' | 'DESC';
}
