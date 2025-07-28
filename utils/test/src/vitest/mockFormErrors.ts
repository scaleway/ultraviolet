import type { FormErrors } from '../../../../packages/form/src'

export const mockFormErrors: FormErrors = {
  isInteger: ({ isInteger }) => {
    if (typeof isInteger === 'number') {
      if (Number.isInteger(isInteger)) {
        return 'This field should be a decimal number'
      }

      return 'This field should be a whole number'
    }

    return 'This field should be a number'
  },
  max: ({ max }) => `This field is too high (maximum is : ${max ?? ''})`,
  maxDate: ({ maxDate }) =>
    `This field should be before ${maxDate?.toString() ?? ''}`,
  maxLength: ({ maxLength }) =>
    `This field should have a length lower than ${maxLength ?? ''}`,
  min: () => 'This field is too low',
  minDate: ({ minDate }) =>
    `This field should be after ${minDate?.toString() ?? ''}`,
  minLength: ({ minLength }) =>
    `This field should have a length greater than ${minLength ?? ''}`,
  pattern: ({ regex }) =>
    `This field should match the regex ${(regex ?? [])
      .map(r =>
        Array.isArray(r)
          ? r.map(nestedRegex => nestedRegex.source).join(' or ')
          : r.source,
      )
      .join(' and ')}`,
  required: () => 'This field is required',
}
