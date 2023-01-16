import type { ValidatorFn } from './types'

export const minLengthValidator: ValidatorFn<string, number> = minLength => ({
  error: 'MIN_LENGTH',
  validate: value => value === undefined || value.length >= minLength,
})
