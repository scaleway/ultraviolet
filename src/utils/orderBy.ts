type ComparableType = string | number

const orderBy = (
  key: string | ((a: Record<string, unknown>) => ComparableType),
  order: 'asc' | 'desc',
): ((a: Record<string, unknown>, b: Record<string, unknown>) => number) => {
  const direction = order === 'asc' ? 1 : -1
  const transform =
    typeof key === 'function'
      ? key
      : (item: Record<string, unknown>) =>
          typeof item[key] === 'string'
            ? (item[key] as string).toLowerCase()
            : item[key]

  return (a, b) => {
    const transformedA = transform(a) as ComparableType
    const transformedB = transform(b) as ComparableType
    if (transformedA > transformedB) return direction

    return transformedB > transformedA ? -1 * direction : 0
  }
}

export default orderBy
