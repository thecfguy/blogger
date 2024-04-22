import { PaginationDto } from '@app/common/dto/pagination.dto';
import { AlbumFilterDto } from './album-filter.dto';
import { AlbumSortDto } from './album-sort.dto';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class AlbumFindDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => AlbumFilterDto)
  filter?: AlbumFilterDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => PaginationDto)
  pagination?: PaginationDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AlbumSortDto)
  sort?: AlbumSortDto[];
}
