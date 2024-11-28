import type { FormErrors } from '../../../../packages/form/src'

export const mockFormErrors: FormErrors = {
  maxLength: ({ maxLength }) =>
    `This field should have a length lower than ${maxLength ?? ''}`,
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
  max: ({ max }) => `This field is too high (maximum is : ${max ?? ''})`,
  min: () => 'This field is too low',
  maxDate: ({ maxDate }) =>
    `This field should be before ${maxDate?.toString() ?? ''}`,
  minDate: ({ minDate }) =>
    `This field should be after ${minDate?.toString() ?? ''}`,
}
