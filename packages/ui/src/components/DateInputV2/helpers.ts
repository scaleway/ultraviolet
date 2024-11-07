export const POPUP_WIDTH = '264px'

export const CURRENT_YEAR = new Date().getFullYear()
export const CURRENT_MONTH = new Date().getMonth() + 1

// Weeks displayed on calendar
export const CALENDAR_WEEKS = 6

// Number days in a month for a given year
export const getMonthDays = (month = CURRENT_MONTH, year = CURRENT_YEAR) => {
  const months30 = [4, 6, 9, 11]
  const leapYear = year % 4 === 0

  if (month === 2) {
    return leapYear ? 29 : 28
  }

  return months30.includes(month) ? 30 : 31
}

// First day of the month for a given year
export const getMonthFirstDay = (month = CURRENT_MONTH, year = CURRENT_YEAR) =>
  new Date(`${year}-${month}-01`).getDay() + 1

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
export const isSameMonth = (date: Date, basedate = new Date()) =>
  basedate.getMonth() + 1 === date.getMonth() + 1 &&
  basedate.getFullYear() === date.getFullYear()

// (bool) Checks if two date values are the same day
export const isSameDay = (date: Date, basedate = new Date()) =>
  basedate.getDate() === date.getDate() &&
  basedate.getMonth() + 1 === date.getMonth() + 1 &&
  basedate.getFullYear() === date.getFullYear()
