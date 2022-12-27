import type { ValidatorFn } from './types'

const minValidator: ValidatorFn<number> = min => ({
  error: 'TOO_LOW',
  validate: value => value === undefined || Number(value) >= min,
})

export default minValidator
