

export function sortTransform(sort) {
  const order = {};
  if (sort) {
    sort.forEach((item) => {
      order[item.sortBy] = item.order.toUpperCase();
    });
  }

  return order;
}
