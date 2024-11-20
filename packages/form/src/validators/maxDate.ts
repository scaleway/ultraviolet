export const maxDateValidator =
  (maxDate?: Date) => (value: Date | [Date, Date]) =>
    value === undefined ||
    maxDate === undefined ||
    (Array.isArray(value) ? value[1] <= maxDate : value <= maxDate)
