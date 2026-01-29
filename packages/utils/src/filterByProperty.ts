export const filterByProperty = <T, K extends keyof T>(
  arr: T[],
  key: K,
): (T & { [P in K]: NonNullable<T[P]> })[] =>
  arr.filter(
    item => item[key] !== undefined && item[key] !== null,
  ) as unknown as (T & {
    [P in K]: NonNullable<T[P]>
  })[]
