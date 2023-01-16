import type { ValidatorFn } from './types'

export const minDateValidator: ValidatorFn<Date, Date> = minDate => ({
  error: 'MIN_DATE',
  validate: value => value === undefined || value >= minDate,
})
