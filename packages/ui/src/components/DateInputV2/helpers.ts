export const POPUP_WIDTH = '264px'

// The current year
export const CURRENT_YEAR = new Date().getFullYear()

// The current month starting from 1 - 12
// 1 => January, 12 => December
export const CURRENT_MONTH = new Date().getMonth() + 1

// The current day 1-28/29/30/31

// Weeks displayed on calendar
export const CALENDAR_WEEKS = 6

// Number days in a month for a given year
export const getMonthDays = (month = CURRENT_MONTH, year = CURRENT_YEAR) => {
  const months30 = [4, 6, 9, 11] // 30 days in april, june, september and november
  const leapYear = year % 4 === 0

  if (month === 2) {
    return leapYear ? 29 : 28 // Days in february
  }

  return months30.includes(month) ? 30 : 31
}

// First day of the month for a given year from 1 (monday) - 7 (saturday)
export const getMonthFirstDay = (month = CURRENT_MONTH, year = CURRENT_YEAR) =>
  new Date(`${year}-${month}-01`).getDay() + 1

// Adds a zero for 1-digit months/days
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
