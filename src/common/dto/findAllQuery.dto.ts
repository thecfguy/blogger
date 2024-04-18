import { FilterDto } from '@app/common/dto/filter.dto';
import { PaginationDto } from '@app/common/dto/pagination.dto';
import { SortDto } from '@app/common/dto/sort.dto';

export class findAllQueryDto {
  filter?: FilterDto;
  pagination?: PaginationDto;
  sort?: SortDto[];

  constructor(dto?: Partial<findAllQueryDto>) {
    Object.assign(this, dto);
    this.pagination = this.pagination || { page: 1, maxRows: 50 };
    console.log(this.pagination);
  }
}
