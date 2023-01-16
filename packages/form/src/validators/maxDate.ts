import type { ValidatorFn } from './types'

export const maxDateValidator: ValidatorFn<Date, Date> = maxDate => ({
  error: 'MAX_DATE',
  validate: value => value === undefined || value <= maxDate,
})
