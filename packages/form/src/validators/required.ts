import type { ValidatorFn } from './types'

const requiredValidator: ValidatorFn = required => ({
  error: 'REQUIRED',
  validate: (value: unknown) => (required ? !!value : true),
})

export default requiredValidator
