export class PaginationDto {
  page?: number = 1;
  maxRows?: number = 50;
  offset?: number;
  totalNumber?: number;
}
