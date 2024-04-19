export class PaginationDto {
    page?: number=1;
    maxRows?: number=5;
    totalPage?: number;
    totalNumber?: number;
    perPage?: number;
}