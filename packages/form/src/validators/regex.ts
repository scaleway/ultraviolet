import type { ValidatorFn } from './types'

const validator: ValidatorFn<string, (RegExp | RegExp[])[]> = regexes => ({
  error: 'REGEX',
  validate: value =>
    regexes.every(
      regex =>
        value === undefined ||
        (Array.isArray(regex)
          ? regex.some(regexOr => regexOr.test(value))
          : regex.test(value)),
    ),
})

export default validator
