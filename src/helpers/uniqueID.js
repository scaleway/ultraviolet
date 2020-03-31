const chr4 = () => Math.random().toString(16).slice(-4)

export const uniqueID = (prefix = '') =>
  `${prefix}${new Array(8)
    .fill()
    .map(() => chr4())
    .join('')}`
