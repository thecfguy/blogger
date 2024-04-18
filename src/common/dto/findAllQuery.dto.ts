import { FilterDto } from '@app/common/dto/filter.dto';
import { PaginationDto } from '@app/common/dto/pagination.dto';
import { SortDto } from '@app/common/dto/sort.dto';

export class findAllQueryDto {
  constructor(dto?: Partial<findAllQueryDto>) {
    Object.assign(this, dto);
    if (dto && dto.pagination === undefined) {
      console.log('working')
      this.pagination = { page: 1, maxRows: 50 };
    }
  }
  filter?: FilterDto;
  pagination?: PaginationDto;
  sort?: SortDto[];

  
}
