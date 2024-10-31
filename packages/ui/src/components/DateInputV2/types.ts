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
        event: React.SyntheticEvent<any> | undefined,
      ) => void
    }
  | {
      selectsRange: false
      onChange?: (
        date: Date | null,
        event: React.SyntheticEvent<any> | undefined,
      ) => void
    }
)
