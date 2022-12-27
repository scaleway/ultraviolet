import type { ValidatorFn } from './types'

const maxLengthValidator: ValidatorFn<string, number> = maxLength => ({
  error: 'MAX_LENGTH',
  validate: value => value === undefined || value.length <= maxLength,
})

export default maxLengthValidator
