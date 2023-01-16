import type { ValidatorFn } from './types'

export const maxValidator: ValidatorFn<number> = max => ({
  error: 'TOO_HIGH',
  validate: value => value === undefined || Number(value) <= max,
})
