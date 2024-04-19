import { FilterDto } from '@app/common/dto/filter.dto';
import { PaginationDto } from '@app/common/dto/pagination.dto';
import { SortDto } from '@app/common/dto/sort.dto';

export class findAllQueryDto {
  filter?: FilterDto;
  pagination?: PaginationDto= { page: 1, maxRows: 50 };
  sort?: SortDto[];

  constructor(dto?: Partial<findAllQueryDto>) {
    Object.assign(this, dto);
    if (dto && dto.pagination === undefined) {
      console.log('working');
      this.pagination = { page: 1, maxRows: 50 };
      console.log('dto',this.pagination)
    }
  }
}
