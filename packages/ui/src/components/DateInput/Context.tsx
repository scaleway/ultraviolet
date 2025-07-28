'use client'

import type { Dispatch, SetStateAction } from 'react'
import { createContext } from 'react'

export type ContextProps = {
  showMonthYearPicker?: boolean
  disabled: boolean
  readOnly: boolean
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
  setVisible: Dispatch<SetStateAction<boolean>>
  setYearToShow: Dispatch<SetStateAction<number>>
  minDate?: Date | null
  maxDate?: Date | null
  // Calendar months names and short names
  MONTHS: Record<string, string>
  // Week days names and shortnames
  DAYS: Record<string, string>
  MONTHS_ARR: string[]
  setValue: Dispatch<SetStateAction<Date | null>>
  setInputValue: Dispatch<SetStateAction<string | undefined>>
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
  format?: (value?: Date) => string | undefined
  hoveredDate?: Date | null
  setHoveredDate: Dispatch<SetStateAction<Date | null>>
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
export const DateInputContext = createContext<ContextProps>({
  DAYS: {},
  disabled: false,
  excludeDates: [],
  MONTHS: {},
  MONTHS_ARR: [],
  monthToShow: 1,
  readOnly: false,
  selectsRange: false,
  setHoveredDate: () => null,
  setInputValue: () => null,
  setMonthToShow: () => null,
  setValue: () => null,
  setVisible: () => null,
  setYearToShow: () => null,
  showMonthYearPicker: false,
  yearToShow: 2000,
})
