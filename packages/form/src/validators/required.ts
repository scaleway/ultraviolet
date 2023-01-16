import type { ValidatorFn } from './types'

export const requiredValidator: ValidatorFn = required => ({
  error: 'REQUIRED',
  validate: (value: unknown) => (required ? !!value : true),
})
