const orderBy = (key, order) => {
  const direction = order === 'asc' ? 1 : -1
  const transform =
    typeof key === 'function'
      ? key
      : item =>
          typeof item[key] === 'string' ? item[key].toLowerCase() : item[key]

  return (a, b) => {
    const transformedA = transform(a)
    const transformedB = transform(b)
    if (transformedA > transformedB) return direction

    return transformedB > transformedA ? -1 * direction : 0
  }
}

export default orderBy
