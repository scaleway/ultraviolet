'use client'

import styled from '@emotion/styled'
import type { MouseEvent as MouseEventReact } from 'react'
import { useContext, useState } from 'react'
import { Button } from '../../Button'
import { Row } from '../../Row'
import { DateInputContext } from '../Context'
import { formatValue, isSameMonth } from '../helpers'

const Month = styled(Button)`
  height: ${({ theme }) => theme.sizing['312']};
  width: 100%;
  padding: 0;
  text-transform: capitalize;

  &[aria-label="in-range"] {
    color:  ${({ theme }) => theme.colors.primary.textHover};
    background-color: ${({ theme }) => theme.colors.primary.background};
  }

  &[aria-label="in-range"]:hover {
    color: ${({ theme }) => theme.colors.neutral.textStronger};
    background-color: ${({ theme }) => theme.colors.primary.backgroundStrongHover};
  }

  &[aria-label="not-current"] {
    color: ${({ theme }) => theme.colors.neutral.textDisabled};
  }

  &[aria-label="selected"] {
    color: ${({ theme }) => theme.colors.neutral.textStronger};
  }
`

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
    <Row templateColumns="1fr 1fr 1fr" gap={1}>
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
              setRange?.({ start: range.start, end: newDate })
              onChange?.([range.start, newDate], event)
              setInputValue(
                formatValue(
                  null,
                  { start: range.start, end: newDate },
                  true,
                  true,
                  format,
                ),
              )
              setVisible(false)
              // If we click on another date, it will reset the range
              setRangeState('start')
            } else if (rangeState === 'end' && !isAfterStartDate && range) {
              setRange?.({ start: newDate, end: range.start })
              onChange?.([newDate, range.start], event)
              setInputValue(
                formatValue(
                  null,
                  { start: newDate, end: range.start },
                  true,
                  true,
                  format,
                ),
              )
              setVisible(false)
              // If we click on another date, it will reset the range
              setRangeState('start')
            } else {
              setRange?.({ start: newDate, end: null })
              onChange?.([newDate, null], event)
              setInputValue(
                formatValue(
                  null,
                  { start: newDate, end: null },
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
          if (isSelected) return 'selected'
          if (isInHoveredRange) return 'in-range'

          return 'neutral'
        }

        return (
          <Month
            variant={isSelected || isInHoveredRange ? 'filled' : 'ghost'}
            sentiment={isSelected || isInHoveredRange ? 'primary' : 'neutral'}
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
            aria-label={monthState()}
          >
            {month[1]}
          </Month>
        )
      })}
    </Row>
  )
}
