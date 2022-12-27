import type { ValidatorObject } from '../types'

export type ValidatorFn<InputValue = unknown, ArgsValue = InputValue> = (
  args: ArgsValue,
) => ValidatorObject<InputValue>
