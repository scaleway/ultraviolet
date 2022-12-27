import type { ValidatorFn } from './types'

const maxValidator: ValidatorFn<number> = max => ({
  error: 'TOO_HIGH',
  validate: value => value === undefined || Number(value) <= max,
})

export default maxValidator
