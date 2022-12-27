import type { FormErrors } from '../types'

export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

export const mockErrors: FormErrors = {
  MAX_DATE: ({ maxDate }) => `Date must be lower than ${maxDate?.toString()}`,
  MAX_LENGTH: ({ maxLength }) =>
    `This field should have a length lower than ${maxLength}`,
  MIN_DATE: ({ minDate }) => `Date must be greater than ${minDate?.toString()}`,
  MIN_LENGTH: ({ minLength }) =>
    `This field should have a length greater than ${minLength}`,
  REGEX: ({ regex }) => {
    if (
      (Array.isArray(regex[0])
        ? regex?.[0]?.[0]?.source
        : regex?.[0]?.source) === emailRegex.source
    ) {
      return 'Invalid email'
    }

    return `This field should match the regex ${regex
      .map(r =>
        Array.isArray(r)
          ? r.map(nestedRegex => nestedRegex.source).join(' or ')
          : r.source,
      )
      .join(' and ')}`
  },
  REQUIRED: 'This field is required',
  TOO_HIGH: ({ max }) => `This field is too high (maximum is : ${max})`,
  TOO_LOW: 'This field is too low',
}
