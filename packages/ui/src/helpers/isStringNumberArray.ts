export const isStringNumberArray = (value: unknown): value is (string | number)[] => {
  return (
    Array.isArray(value) &&
    value.every((item): item is string | number => typeof item === 'string' || typeof item === 'number')
  )
}
