export class PaginationDto {
  page?: number = 1;
  maxRows?: number = 50;
  totalPage?: number;
  totalNumber?: number;
  perPage?: number;
}
