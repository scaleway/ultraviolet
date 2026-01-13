export const mockErrors = {
  isInteger: () => 'Incorrect field',
  max: () => 'This field is too high (maximum is : ...)',
  maxDate: () => 'Date must be lower than ...',
  maxLength: () => 'This field should have a length lower than ...',
  min: () => 'This field is too low (minimum is: ...)',
  minDate: () => 'Date must be greater than ...',
  minLength: () => 'This field should have a length greater than ...',
  pattern: () => 'This field should match the regex',
  required: () => 'This field is required',
}
