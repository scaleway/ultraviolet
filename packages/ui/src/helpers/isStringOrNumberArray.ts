export const isStringOrNumberArray = (value: unknown): value is (string | number)[] =>
  Array.isArray(value)
    ? value.every((item): item is string | number => typeof item === 'string' || typeof item === 'number')
    : false
