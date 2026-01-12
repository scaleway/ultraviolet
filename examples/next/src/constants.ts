import type { FormErrors } from '@ultraviolet/form'
export const APP_MAX_WIDTH = 1140

export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
export const mockErrors: FormErrors = {
  isInteger: ({ isInteger }) => {
    if (typeof isInteger === 'number') {
      if (Number.isInteger(isInteger)) {
        return 'This field should be a decimal number'
      }

      return 'This field should be a whole number'
    }

    return 'This field should be a number'
  },
  max: ({ max }) => `This field is too high (maximum is : ${max})`,
  maxDate: ({ maxDate }) => `Date must be lower than ${maxDate?.toString()}`,
  maxLength: ({ maxLength }) =>
    `This field should have a length lower than ${maxLength}`,
  min: ({ min }) => `This field is too low (minimum is: ${min})`,
  minDate: ({ minDate }) => `Date must be greater than ${minDate?.toString()}`,
  minLength: ({ minLength }) =>
    `This field should have a length greater than ${minLength}`,
  pattern: () => 'This field should match the regex',
  required: () => 'This field is required',
}
