const parseIntOr = (str: string, fallback: number): number => {
  const value = Number.parseInt(str, 10)

  return !Number.isNaN(value) ? value : fallback
}

export default parseIntOr
