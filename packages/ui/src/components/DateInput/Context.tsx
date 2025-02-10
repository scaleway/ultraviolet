import { createContext } from 'react'
import type { Dispatch, SetStateAction } from 'react'

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
  showMonthYearPicker: false,
  disabled: false,
  setValue: () => null,
  setInputValue: () => null,
  monthToShow: 1,
  yearToShow: 2000,
  setMonthToShow: () => null,
  setYearToShow: () => null,
  excludeDates: [],
  MONTHS: {},
  DAYS: {},
  MONTHS_ARR: [],
  selectsRange: false,
  setVisible: () => null,
  readOnly: false,
  setHoveredDate: () => null,
})
