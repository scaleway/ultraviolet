import styled from '@emotion/styled'
import type { MouseEvent as MouseEventReact } from 'react'
import { useContext, useState } from 'react'
import { Button } from '../Button'
import { Row } from '../Row'
import { Text } from '../Text'
import { DateInputContext } from './Context'
import {
  CALENDAR_WEEKS,
  getMonthDays,
  getMonthFirstDay,
  getNextMonth,
  getPreviousMonth,
  isSameDay,
} from './helpers'

const Day = styled(Button)`
height: 26px;
width: 100%;
padding: 0;

&.rangeButton {
  background-color:${({ theme }) => theme.colors.primary.background};
}
`
const DayName = styled(Text)`
height: 26px;
width: 100%;
`

export const Daily = ({ disabled }: { disabled: boolean }) => {
  const {
    value,
    yearToShow,
    monthToShow,
    setValue,
    setMonthToShow,
    onChange,
    setYearToShow,
    excludeDates,
    minDate,
    maxDate,
    DAYS,
    selectsRange,
    range,
    setRange,
  } = useContext(DateInputContext)

  const [rangeState, setRangeState] = useState<'start' | 'none' | 'done'>(
    range?.start ? 'start' : 'none',
  ) // Used when selectsRange is True. Kow the current state of the range: none when start date not selected, start when start date is selected, done when start & end date selected

  const [hoveredDate, setHoveredDate] = useState<Date | null>(null)

  const monthDays = getMonthDays(monthToShow, yearToShow) // Number of days in the month

  const daysFromPreviousMonth =
    (getMonthFirstDay(monthToShow, yearToShow) - 1 + 6) % 7 //  Number of days from the previous month to show. Shift to align Monday start
  const daysFromNextMonth =
    CALENDAR_WEEKS * 7 - (daysFromPreviousMonth + monthDays) // We want to display 6 CALENDAR_WEEKS lines, so we show days from the next month

  const [previousMonth, prevMonthYear] = getPreviousMonth(
    monthToShow,
    yearToShow,
  )

  const [nextMonth, nextMonthYear] = getNextMonth(monthToShow, yearToShow)
  const previousMonthDays = getMonthDays(previousMonth, prevMonthYear)

  // Get the dates to be displayed from the previous month
  const prevMonthDates = Array(daysFromPreviousMonth)
    .keys()
    .map((_, index) => ({
      day: index + 1 + (previousMonthDays - daysFromPreviousMonth),
      month: -1,
    }))

  // Get the dates to be displayed from the current month
  const currentMonthDates = Array(monthDays)
    .keys()
    .map((_, index) => ({ day: index + 1, month: 0 }))

  // Get the dates to be displayed from the next month
  const nextMonthDates = Array(daysFromNextMonth)
    .keys()
    .map((_, index) => ({ day: index + 1, month: 1 }))

  const allDaysToShow = [
    ...prevMonthDates,
    ...currentMonthDates,
    ...nextMonthDates,
  ] // Array of the days to display { day : day n°, isCurrentMonth: if it is the current day}

  return (
    <Row templateColumns="repeat(7, 1fr)" gap={1}>
      {Object.entries(DAYS).map(day => (
        <DayName as="p" variant="bodyStrong" sentiment="neutral" key={day[0]}>
          {day[1]}
        </DayName>
      ))}
      {allDaysToShow.map(data => {
        const constructedDate = new Date(
          yearToShow,
          monthToShow - 1 + data.month,
          data.day,
        )
        const isExcluded = excludeDates
          ? excludeDates
              .map(date => isSameDay(constructedDate, date))
              .includes(true)
          : false

        // Whether the date < minDate or date > maxDate
        const isOutsideRange =
          !!(minDate && constructedDate < minDate) ||
          !!(maxDate && constructedDate > maxDate)

        // Whether the date is selected
        const isSelected =
          (value && isSameDay(constructedDate, new Date(value))) ||
          (range?.end && isSameDay(constructedDate, range.end)) ||
          (range?.start && isSameDay(constructedDate, range.start))

        // Whether the date is after the start date - useful when selectsRange is set to true
        const isAfterStartDate =
          selectsRange && range?.start && constructedDate > range.start

        const isInHoveredRange =
          (selectsRange &&
            range?.start &&
            constructedDate > range.start &&
            hoveredDate &&
            constructedDate < hoveredDate) ||
          (range?.start &&
            range.end &&
            constructedDate < range.end &&
            constructedDate > range.start)

        const getNewDate = () => {
          // Clicked on a day from the previous month
          if (data.month !== 0 && data.day > 15) {
            setMonthToShow(previousMonth)
            setYearToShow(prevMonthYear)

            return new Date(prevMonthYear, previousMonth - 1, data.day)
          }

          // Clicked on a day from the next month
          if (data.month !== 0 && data.day < 15) {
            setMonthToShow(nextMonth)
            setYearToShow(nextMonthYear)

            return new Date(nextMonthYear, nextMonth - 1, data.day)
          }

          return new Date(yearToShow, monthToShow - 1, data.day)
        }

        const onClickRange = (event: MouseEventReact, newDate: Date) => {
          if (selectsRange) {
            // Selecting start date
            if (rangeState === 'none') {
              setRange?.({ start: newDate, end: null })
              onChange?.([newDate, null], event)
              setRangeState('start')
            }

            // Selecting end date
            else if (isAfterStartDate) {
              setRange?.({ start: range.start, end: newDate })
              onChange?.([range.start, newDate], event)
              setRangeState('done')
            } else {
              // End date before start
              setRange?.({ start: newDate, end: null })
              onChange?.([newDate, null], event)
            }
          }
        }
        const createTestId = () => {
          if (isInHoveredRange) return 'rangeButton'
          if (data.month === -1) return 'dayLastMonth'
          if (data.month === 1) return 'dayNextMonth'

          return undefined
        }

        return (
          <Day
            variant={isSelected || isInHoveredRange ? 'filled' : 'ghost'}
            sentiment={isSelected || isInHoveredRange ? 'primary' : 'neutral'}
            disabled={disabled || isExcluded || isOutsideRange}
            className={isInHoveredRange ? 'rangeButton' : undefined}
            key={data.month === 0 ? data.day : data.day + 100}
            onClick={event => {
              if (!isExcluded && !isOutsideRange) {
                const newDate = getNewDate()

                if (selectsRange) {
                  onClickRange(event, newDate)
                } else {
                  setValue(newDate)
                  onChange?.(newDate, event)
                }
              }
            }}
            onMouseEnter={() => setHoveredDate(constructedDate)}
            onMouseLeave={() => setHoveredDate(null)}
          >
            <Text
              as="p"
              variant="bodyStrong"
              prominence={isSelected && !isInHoveredRange ? 'strong' : 'weak'}
              sentiment={isSelected || isInHoveredRange ? 'primary' : 'neutral'}
              disabled={
                disabled || data.month !== 0 || isExcluded || isOutsideRange
              }
              data-testid={createTestId()}
            >
              {data.day}
            </Text>
          </Day>
        )
      })}
    </Row>
  )
}
