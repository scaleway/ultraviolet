const parseIntOr = (str, fallback) => {
  const value = Number.parseInt(str, 10)

  return !Number.isNaN(value) ? value : fallback
}

export default parseIntOr
