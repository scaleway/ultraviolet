'use client'

import { cn } from '@ultraviolet/utils'
import type { MouseEvent as MouseEventReact } from 'react'
import { useContext, useState } from 'react'
import { Button } from '../../Button'
import { Row } from '../../Row'
import { DateInputContext } from '../Context'
import { formatValue, isSameMonth } from '../helpers'
import { capitalizedText, dayMonth as monthStyle } from './styles.css'

export const Monthly = () => {
  const {
    yearToShow,
    setValue,
    setMonthToShow,
    MONTHS,
    onChange,
    selectsRange,
    setRange,
    range,
    minDate,
    maxDate,
    excludeDates,
    value,
    setInputValue,
    format,
    setVisible,
    readOnly,
    disabled,
    setHoveredDate,
    hoveredDate,
  } = useContext(DateInputContext)
  const [rangeState, setRangeState] = useState<'start' | 'end'>(
    range?.start && !range.end ? 'end' : 'start',
  ) // Used when selectsRange is True. It is used to know the current state of the range: none when start date not selected, start when start date is selected, done when start & end date selected

  return (
    <Row gap={1} templateColumns="1fr 1fr 1fr">
      {Object.entries(MONTHS).map((month, index) => {
        const constructedDate = new Date(yearToShow, index, 1)

        const isExcluded = excludeDates
          ? excludeDates
              .map(date => isSameMonth(constructedDate, date))
              .includes(true)
          : false

        const isOutsideRange =
          !!(minDate && constructedDate < minDate) ||
          !!(maxDate && constructedDate > maxDate)

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

        const isSelected =
          (value && isSameMonth(constructedDate, value)) ||
          (range?.start && isSameMonth(constructedDate, range.start)) ||
          (range?.end && isSameMonth(constructedDate, range.end))

        const onClickRange = (event: MouseEventReact, newDate: Date) => {
          // Must wrap inside this if otherwise TypeScript doesn't get the right type for onChange
          if (selectsRange) {
            // Selecting end date
            if (rangeState === 'end' && isAfterStartDate) {
              setRange?.({ end: newDate, start: range.start })
              onChange?.([range.start, newDate], event)
              setInputValue(
                formatValue(
                  null,
                  { end: newDate, start: range.start },
                  true,
                  true,
                  format,
                ),
              )
              setVisible(false)
              // If we click on another date, it will reset the range
              setRangeState('start')
            } else if (rangeState === 'end' && !isAfterStartDate && range) {
              setRange?.({ end: range.start, start: newDate })
              onChange?.([newDate, range.start], event)
              setInputValue(
                formatValue(
                  null,
                  { end: range.start, start: newDate },
                  true,
                  true,
                  format,
                ),
              )
              setVisible(false)
              // If we click on another date, it will reset the range
              setRangeState('start')
            } else {
              setRange?.({ end: null, start: newDate })
              onChange?.([newDate, null], event)
              setInputValue(
                formatValue(
                  null,
                  { end: null, start: newDate },
                  true,
                  true,
                  format,
                ),
              )
              setRangeState('end')
            }
          }
        }

        const monthState = () => {
          if (isSelected) {
            return 'selected'
          }
          if (isInHoveredRange) {
            return 'in-range'
          }

          return 'neutral'
        }

        return (
          <Button
            aria-label={monthState()}
            className={cn(monthStyle, capitalizedText)}
            disabled={disabled || isExcluded || isOutsideRange}
            key={month[0]}
            onClick={event => {
              if (!isExcluded && !isOutsideRange && !readOnly) {
                if (selectsRange) {
                  onClickRange(event, constructedDate)
                } else {
                  setMonthToShow(index + 1)
                  setValue(constructedDate)
                  onChange?.(constructedDate, event)
                  setInputValue(
                    formatValue(constructedDate, null, true, false, format),
                  )
                  setVisible(false)
                }
              }
            }}
            onMouseEnter={() => setHoveredDate(constructedDate)}
            sentiment={isSelected || isInHoveredRange ? 'primary' : 'neutral'}
            variant={isSelected || isInHoveredRange ? 'filled' : 'ghost'}
          >
            {month[1]}
          </Button>
        )
      })}
    </Row>
  )
}
