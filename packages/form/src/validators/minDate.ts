export const minDateValidator = (minDate?: Date) => (value: Date) =>
  value === undefined || minDate === undefined || value >= minDate
