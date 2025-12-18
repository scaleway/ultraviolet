export type ComparableType = string | number

export const orderBy = <T extends Record<string, unknown>>(
  key: string | ((a: T) => ComparableType),
  order: 'asc' | 'desc',
): ((a: T, b: T) => number) => {
  const direction = order === 'asc' ? 1 : -1
  const transform =
    typeof key === 'function'
      ? key
      : (item: T) =>
          typeof item[key] === 'string' ? item[key].toLowerCase() : item[key]

  return (a, b) => {
    const transformedA = transform(a) as ComparableType
    const transformedB = transform(b) as ComparableType
    if (transformedA > transformedB) {
      return direction
    }

    return transformedB > transformedA ? -1 * direction : 0
  }
}
