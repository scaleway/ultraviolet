import { createContext } from 'react'
import type { Dispatch, SetStateAction } from 'react'

export type ContextProps = {
  showMonthYearPicker?: boolean
  disabled: boolean
  /**
   * month to show on popup - NOT selectedValue
   */
  monthToShow: number
  /**
   * Year to show on popup - NOT selectedValue
   */
  yearToShow: number
  excludeDates?: Date[]
  setMonthToShow: Dispatch<SetStateAction<number>>
  setYearToShow: Dispatch<SetStateAction<number>>
  minDate?: Date | null
  maxDate?: Date | null
  // Calendar months names and short names
  MONTHS: Record<string, string>
  // Week days names and shortnames
  DAYS: Record<string, string>
  MONTHS_ARR: string[]
  setValue: Dispatch<SetStateAction<Date | null>>
  value?: Date | null
  range?: {
    start: Date | null
    end: Date | null
  }
  setRange?: Dispatch<
    SetStateAction<{
      start: Date | null
      end: Date | null
    }>
  >
  startDate?: Date | null
  endDate?: Date | null
} & (
  | {
      selectsRange: true
      onChange?: (
        date: [Date | null, Date | null],
        event: React.SyntheticEvent | undefined,
      ) => void
    }
  | {
      selectsRange: false
      onChange?: (
        date: Date | null,
        event: React.SyntheticEvent | undefined,
      ) => void
    }
)
const DAYS_DEFAULT = {
  Sunday: 'Su',
  Monday: 'Mo',
  Tuesday: 'Tu',
  Wednesday: 'We',
  Thursday: 'Th',
  Friday: 'Fr',
  Saturday: 'Sa',
}

// Calendar months names and short names
const MONTHS_DEFAULT = {
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
