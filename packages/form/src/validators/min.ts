import type { ValidatorFn } from './types'

export const minValidator: ValidatorFn<number> = min => ({
  error: 'TOO_LOW',
  validate: value => value === undefined || Number(value) >= min,
})
