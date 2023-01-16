import type { ValidatorFn } from './types'

export const maxLengthValidator: ValidatorFn<string, number> = maxLength => ({
  error: 'MAX_LENGTH',
  validate: value => value === undefined || value.length <= maxLength,
})
