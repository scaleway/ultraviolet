'use client'

import type { MouseEvent as MouseEventReact } from 'react'
import { useContext, useState } from 'react'
import { Button } from '../../Button'
import { Row } from '../../Row'
import { Text } from '../../Text'
import { DateInputContext } from '../Context'
import { CALENDAR_WEEKS } from '../constants'
import {
  formatValue,
  getMonthFirstDay,
  getNextMonth,
  getPreviousMonth,
  isSameDay,
} from '../helpers'
import { capitalizedTextDay, dayMonth as dayStyle } from './styles.css'

export const Daily = () => {
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
    setInputValue,
    format,
    setVisible,
    readOnly,
    disabled,
    hoveredDate,
    setHoveredDate,
  } = useContext(DateInputContext)

  const [rangeState, setRangeState] = useState<'start' | 'end'>(
    range?.start && !range?.end ? 'end' : 'start',
  ) // Used when selectsRange is True. The current state of the range: "start" when one must select the start-date of the range, "end" when start date is selected and one must select the end-date

  const monthDays = new Date(yearToShow, monthToShow, 0).getDate() // Number of days in the month

  const daysFromPreviousMonth = getMonthFirstDay(monthToShow, yearToShow) //  Number of days from the previous month to show.

  const daysFromNextMonth =
    CALENDAR_WEEKS * 7 - (daysFromPreviousMonth + monthDays) // We want to display 6 CALENDAR_WEEKS lines, so we show days from the next month

  const [previousMonth, prevMonthYear] = getPreviousMonth(
    monthToShow,
    yearToShow,
  )

  const [nextMonth, nextMonthYear] = getNextMonth(monthToShow, yearToShow)
  const previousMonthDays = new Date(prevMonthYear, previousMonth, 0).getDate() // Number of days in the previous month

  // Get the dates to be displayed from the previous month
  const prevMonthDates = Array.from(
    { length: daysFromPreviousMonth },
    (_, index) => ({
      day: index + 1 + (previousMonthDays - daysFromPreviousMonth),
      month: -1,
    }),
  )

  // Get the dates to be displayed from the current month
  const currentMonthDates = Array.from({ length: monthDays }, (_, index) => ({
    day: index + 1,
    month: 0,
  }))

  // Get the dates to be displayed from the next month
  const nextMonthDates = Array.from(
    { length: daysFromNextMonth },
    (_, index) => ({ day: index + 1, month: 1 }),
  )

  const allDaysToShow = [
    ...prevMonthDates,
    ...currentMonthDates,
    ...nextMonthDates,
  ] // Array of the days to display { day : day n°, isCurrentMonth: if it is the current day}

  return (
    <Row gap={1} templateColumns="repeat(7, 1fr)">
      {Object.entries(DAYS).map(day => (
        <Text
          as="p"
          className={capitalizedTextDay}
          disabled={disabled}
          key={day[0]}
          sentiment="neutral"
          variant="bodyStrong"
        >
          {day[1]}
        </Text>
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
            // Selecting the end date
            if (rangeState === 'end' && isAfterStartDate) {
              setRange?.({ end: newDate, start: range.start })
              onChange?.([range.start, newDate], event)
              setInputValue(
                formatValue(
                  null,
                  { end: newDate, start: range.start },
                  false,
                  true,
                  format,
                ),
              )
              // If we click on another date, it will reset the range
              setRangeState('start')
              setVisible(false)
            }
            // The newDate is before, we swap end & start date
            else if (
              rangeState === 'end' &&
              !isAfterStartDate &&
              range?.start
            ) {
              setRange?.({ end: range.start, start: newDate })
              onChange?.([newDate, range.start], event)
              setInputValue(
                formatValue(
                  null,
                  { end: range.start, start: newDate },
                  false,
                  true,
                  format,
                ),
              )
              setRangeState('start')
              setVisible(false)
            }
            // Selecting the start date
            else {
              setRange?.({ end: null, start: newDate })
              onChange?.([newDate, null], event)
              setInputValue(
                formatValue(
                  null,
                  { end: null, start: newDate },
                  false,
                  true,
                  format,
                ),
              )
              setRangeState('end')
            }
          }
        }

        const createTestId = () => {
          if (isInHoveredRange) {
            return 'rangeButton'
          }
          if (data.month === -1) {
            return 'dayLastMonth'
          }
          if (data.month === 1) {
            return 'dayNextMonth'
          }

          return undefined
        }

        const dayState = () => {
          if (isSelected) {
            return 'selected'
          }
          if (isInHoveredRange) {
            return 'in-range'
          }
          if (data.month !== 0) {
            return 'not-current'
          }

          return 'neutral'
        }

        return (
          <Button
            aria-label={dayState()}
            className={dayStyle}
            data-testid={createTestId()}
            disabled={disabled || isExcluded || isOutsideRange}
            key={`${data.month}-${data.day}`}
            onClick={event => {
              if (!(isExcluded || isOutsideRange || readOnly)) {
                const newDate = getNewDate()

                if (selectsRange) {
                  onClickRange(event, newDate)
                } else {
                  setValue(newDate)
                  onChange?.(newDate, event)
                  setInputValue(
                    formatValue(newDate, null, false, false, format),
                  )
                  setVisible(false)
                }
              }
            }}
            onMouseEnter={() => {
              if (selectsRange && range?.start) {
                setHoveredDate(constructedDate)
              }
            }}
            sentiment={isSelected || isInHoveredRange ? 'primary' : 'neutral'}
            variant={isSelected || isInHoveredRange ? 'filled' : 'ghost'}
          >
            {data.day}
          </Button>
        )
      })}
    </Row>
  )
}
