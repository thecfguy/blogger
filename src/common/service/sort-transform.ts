import { SortDto } from "../dto/sort.dto";

export function sortTransform(sort: SortDto[] | undefined) {
  const order = {};
  if (sort) {
    sort.forEach((item) => {
      order[item.sortBy] = item.order.toUpperCase();
    });
  }

  return order;
}
