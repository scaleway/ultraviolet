import type { FieldPath, FieldValues, PathValue } from 'react-hook-form'

export const validateRegex = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(
  value: PathValue<TFieldValues, TName>,
  regexes: (RegExp | RegExp[])[],
) =>
  regexes.every(
    regex =>
      value === undefined ||
      value === '' ||
      (Array.isArray(regex)
        ? regex.some(regexOr => regexOr.test(value))
        : regex.test(value)),
  )
