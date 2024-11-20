export const minDateValidator =
  (maxDate?: Date) => (value: Date | [Date, Date]) =>
    value === undefined ||
    maxDate === undefined ||
    (Array.isArray(value) ? value[0] >= maxDate : value >= maxDate)
