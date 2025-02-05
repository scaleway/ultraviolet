import styled from '@emotion/styled'
import type { MouseEvent as MouseEventReact } from 'react'
import { useContext, useState } from 'react'
import { Button } from '../../Button'
import { Row } from '../../Row'
import { Text } from '../../Text'
import { DateInputContext } from '../Context'
import { formatValue, isSameMonth } from '../helpers'

const ButtonDate = styled(Button)`
  height: ${({ theme }) => theme.sizing['312']};
  width: 100%;
  padding: 0;
`

const RangeButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary.background};
  height: ${({ theme }) => theme.sizing['312']};
  width: 100%;
  padding: 0;
`

const CapitalizedText = styled(Text)`
display: inline-block;
text-transform: lowercase;

&::first-letter {
  text-transform: uppercase;
}
`

export const Monthly = ({ disabled }: { disabled: boolean }) => {
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
  } = useContext(DateInputContext)
  const [rangeState, setRangeState] = useState<'start' | 'none' | 'done'>(
    range?.start ? 'start' : 'none',
  ) // Used when selectsRange is True. It is used to know the current state of the range: none when start date not selected, start when start date is selected, done when start & end date selected
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null)

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
            constructedDate < hoveredDate) ||
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
            // Selecting start date
            if (rangeState === 'none') {
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
              setRangeState('start')
            }

            // Selecting end date
            else if (isAfterStartDate) {
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
              setRangeState('done')
            } else {
              // End date before start
              setRange?.({ start: newDate, end: null })
              setInputValue(
                formatValue(
                  null,
                  { start: newDate, end: null },
                  true,
                  true,
                  format,
                ),
              )
              onChange?.([newDate, null], event)
            }
          }
        }
        const Month = isInHoveredRange ? RangeButton : ButtonDate

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
            onMouseLeave={() => setHoveredDate(null)}
          >
            <CapitalizedText
              as="span"
              variant="bodyStrong"
              prominence={isSelected && !isInHoveredRange ? 'strong' : 'weak'}
              sentiment={isSelected || isInHoveredRange ? 'primary' : 'neutral'}
              disabled={disabled || isExcluded || isOutsideRange}
            >
              {month[1]}
            </CapitalizedText>
          </Month>
        )
      })}
    </Row>
  )
}
