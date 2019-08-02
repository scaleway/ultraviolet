const flatten = (list, depth) => {
  depth = typeof depth === 'number' ? depth : Infinity
  const lFlatten = (list, d) =>
    list.reduce(
      (acc, item) =>
        Array.isArray(item) && d < depth
          ? acc.concat(lFlatten(item, d + 1))
          : acc.concat(item),
      [],
    )

  if (!depth) {
    if (Array.isArray(list)) {
      return list.map(i => i)
    }
    return list
  }
  return lFlatten(list, 1)
}

export default flatten
