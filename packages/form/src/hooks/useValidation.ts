import type { AnyObject, FieldState, FieldValidator } from 'final-form'
import { useCallback } from 'react'
import type { ValidatorObject } from '../types'

type UseValidationParams<FieldValue = unknown> = {
  validators: ValidatorObject<FieldValue>[]
  validate?: FieldValidator<FieldValue>
}

type UseValidationResult<FieldValue = unknown> = (
  value: FieldValue,
  allValues: AnyObject,
  meta?: FieldState<FieldValue>,
) => string[] | undefined | unknown

export const useValidation = <T = unknown>({
  validators,
  validate,
}: UseValidationParams<T>): UseValidationResult<T> =>
  useCallback(
    (
      value: T,
      allValues: AnyObject,
      meta?: FieldState<T>,
    ): (string | unknown)[] | unknown | undefined => {
      if (validate) {
        const validateErr = validate(value, allValues, meta) as
          | unknown
          | undefined
        if (validateErr !== undefined && validateErr !== true) {
          return validateErr
        }
      }

      const errors = validators
        .filter(validator => !validator.validate(value, allValues, meta))
        .map(({ error }) => error) as (string | unknown)[]

      return errors.length > 0 ? errors : undefined
    },
    [validate, validators],
  )
