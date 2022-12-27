import type { ValidatorFn } from './types'

const maxDateValidator: ValidatorFn<Date, Date> = maxDate => ({
  error: 'MAX_DATE',
  validate: value => value === undefined || value <= maxDate,
})

export default maxDateValidator
