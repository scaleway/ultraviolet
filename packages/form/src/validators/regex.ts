import type { ValidatorFn } from './types'

export const regexValidator: ValidatorFn<
  string,
  (RegExp | RegExp[])[]
> = regexes => ({
  error: 'REGEX',
  validate: value =>
    regexes.every(
      regex =>
        value === undefined ||
        value === '' ||
        (Array.isArray(regex)
          ? regex.some(regexOr => regexOr.test(value))
          : regex.test(value)),
    ),
})
