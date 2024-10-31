import { createContext } from 'react'
import type { ContextProps } from './types'

export const DAYS_DEFAULT = {
  Sunday: 'Su',
  Monday: 'Mo',
  Tuesday: 'Tu',
  Wednesday: 'We',
  Thursday: 'Th',
  Friday: 'Fr',
  Saturday: 'Sa',
}

// Calendar months names and short names
export const MONTHS_DEFAULT = {
  January: 'Jan',
  February: 'Feb',
  March: 'Mar',
  April: 'Apr',
  May: 'May',
  June: 'Jun',
  July: 'Jul',
  August: 'Aug',
  September: 'Sep',
  October: 'Oct',
  November: 'Nov',
  December: 'Dec',
}

export const MONTHS_ARR_DEFAULT = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const DateInputContext = createContext<ContextProps>({
  showMonthYearPicker: false,
  disabled: false,
  setValue: () => null,
  monthToShow: 1,
  yearToShow: 2000,
  setMonthToShow: () => null,
  setYearToShow: () => null,
  excludeDates: [],
  MONTHS: MONTHS_DEFAULT,
  DAYS: DAYS_DEFAULT,
  MONTHS_ARR: MONTHS_ARR_DEFAULT,
  selectsRange: false,
})
