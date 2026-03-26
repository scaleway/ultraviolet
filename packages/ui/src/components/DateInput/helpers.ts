const SPLIT_REGEX = /\D+/
const DATE_SEPARATOR_REGEX = /[^a-zA-Z0-9]+/
// First day of the month for a given year
export const getMonthFirstDay = (month: number, year: number) => {
  const firstDay = new Date(year, month - 1, 1).getDay()

  // Change so that a week starts on monday
  return firstDay === 0 ? 6 : firstDay - 1
}

export const addZero = (value: number) => `${value}`.padStart(2, '0')

export const getPreviousMonth = (month: number, year: number) => {
  if (month === 1) {
    return [12, year - 1]
  }

  return [month - 1, year]
}

export const getNextMonth = (month: number, year: number) => {
  if (month === 12) {
    return [1, year + 1]
  }

  return [month + 1, year]
}

// Checks if two date values are of the same month and year
export const isSameMonth = (date: Date, basedate: Date) =>
  basedate.getMonth() === date.getMonth() &&
  basedate.getFullYear() === date.getFullYear()

// (bool) Checks if two date values are the same day
export const isSameDay = (date: Date, basedate: Date) =>
  basedate.getDate() === date.getDate() &&
  basedate.getMonth() + 1 === date.getMonth() + 1 &&
  basedate.getFullYear() === date.getFullYear()

// Default format if none is provided
const getDateISO = (showMonthYearPicker: boolean, date?: Date) => {
  if (date) {
    if (showMonthYearPicker) {
      return [addZero(date.getMonth() + 1), date.getFullYear()].join('/')
    }

    return [
      addZero(date.getDate()),
      addZero(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/')
  }

  return ''
}

export const formatValue = (
  computedValue: Date | null,
  computedRange: {
    start: Date | null
    end: Date | null
  } | null,
  showMonthYearPicker: boolean,
  selectsRange: boolean,
  format?: (value?: Date) => string | undefined,
) => {
  if (selectsRange && computedRange) {
    return format
      ? `${
          format(computedRange.start ?? undefined)
            ? `${format(computedRange.start ?? undefined)} - `
            : ''
        }${format(computedRange.end ?? undefined) ?? ''}`
      : `${getDateISO(showMonthYearPicker, computedRange.start ?? undefined)}${
          computedRange.start ? ' - ' : ''
        }${getDateISO(showMonthYearPicker, computedRange.end ?? undefined)}`
  }

  if (computedValue && format) {
    return format(computedValue)
  }
  if (computedValue) {
    return getDateISO(showMonthYearPicker, computedValue)
  }

  return undefined
}

const returnValidDate = (
  computedDate: Date,
  minDate?: Date,
  maxDate?: Date,
) => {
  const isValidDate = !!computedDate.getTime()

  const isTooSoon = isValidDate && minDate && computedDate < minDate
  const isTooLate = isValidDate && maxDate && computedDate > maxDate

  if (isTooLate) {
    return maxDate
  }
  if (isTooSoon) {
    return minDate
  }

  return isValidDate ? computedDate : null
}

export const createDate = (
  value: string,
  showMonthYearPicker: boolean,
  minDate?: Date,
  maxDate?: Date,
) => {
  if (showMonthYearPicker) {
    // Force YYYY/MM (since MM/YYYY not recognised as a date in typescript)
    const res = value.split(SPLIT_REGEX).map(val => Number.parseInt(val, 10))
    const year =
      Math.max(...res) < 100 ? Math.max(...res) + 2000 : Math.max(...res) // MM/YY should be seen as MM/20YY instead of MM/19YY

    const month = Math.min(...res) - 1
    const computedDate = new Date(year, month)

    return returnValidDate(computedDate, minDate, maxDate)
  }

  // Cannot simply use new Date(value) since its base format is MM/DD/YYYY whereas the component uses DD/MM/YYYY
  const [day, month, year] = value.split(DATE_SEPARATOR_REGEX)
  const computedDate = new Date(`${month} ${day} ${year}`)

  return returnValidDate(computedDate, minDate, maxDate)
}

export const createDateRange = (
  value: string,
  showMonthYearPicker: boolean,
) => {
  const [startDateInput, endDateInput] = value
    .split(' - ')
    .map(val => createDate(val, showMonthYearPicker))

  const computedNewRange: [Date | null, Date | null] = [
    startDateInput instanceof Date && !Number.isNaN(startDateInput.getTime())
      ? startDateInput
      : null,
    endDateInput instanceof Date && !Number.isNaN(endDateInput.getTime())
      ? endDateInput
      : null,
  ]

  return computedNewRange
}

export const getIsInHoveredRange = (
  selectsRange: boolean,
  constructedDate: Date,
  hoveredDate?: Date | null,
  range?: {
    start?: Date | null
    end: Date | null
  },
) =>
  (selectsRange &&
    range?.start &&
    constructedDate > range.start &&
    hoveredDate &&
    constructedDate < hoveredDate &&
    !range.end) ||
  (selectsRange &&
    range?.start &&
    constructedDate < range.start &&
    hoveredDate &&
    constructedDate > hoveredDate &&
    !range.end) ||
  (range?.start &&
    range.end &&
    constructedDate < range.end &&
    constructedDate > range.start)
