export const maxDateValidator = (maxDate?: Date) => (value: Date) =>
  value === undefined || maxDate === undefined || value <= maxDate
