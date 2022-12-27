import type { ValidatorFn } from './types'

const minDateValidator: ValidatorFn<Date, Date> = minDate => ({
  error: 'MIN_DATE',
  validate: value => value === undefined || value >= minDate,
})

export default minDateValidator
