import styled from '@emotion/styled'
import type {
  Dispatch,
  MouseEvent as MouseEventReact,
  ReactNode,
  RefObject,
  SetStateAction,
} from 'react'
import { useContext, useEffect, useRef, useState } from 'react'
import { Button } from '../Button'
import { Popup } from '../Popup'
import { Row } from '../Row'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { DateInputContext } from './Context'
import {
  CALENDAR_WEEKS,
  POPUP_WIDTH,
  getMonthDays,
  getMonthFirstDay,
  getNextMonth,
  getPreviousMonth,
  isSameDay,
  isSameMonth,
} from './helpers'

type PopupProps = {
  children: ReactNode
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
  refInput: RefObject<HTMLInputElement>
}

const ButtonSelectDayMonth = styled(Button)`
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

const StyledPopup = styled(Popup)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.other.elevation.background.raised};
  color: ${({ theme }) => theme.colors.neutral.text};
  box-shadow: ${({ theme }) => `${theme.shadows.raised[0]}, ${theme.shadows.raised[1]}`};
  padding: ${({ theme }) => theme.space[2]};
  border-radius: ${({ theme }) => theme.radii.default};
`

const handleClickOutside = (
  event: MouseEvent,
  ref: RefObject<HTMLDivElement>,
  setVisible: Dispatch<SetStateAction<boolean>>,
  refInput: RefObject<HTMLInputElement>,
) => {
  if (
    ref.current &&
    !ref.current.contains(event.target as Node) &&
    !refInput.current?.contains(event.target as Node)
  ) {
    setVisible(false)
  }
}

const Monthly = ({ disabled }: { disabled: boolean }) => {
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

        return (
          <ButtonSelectDayMonth
            variant={isSelected || isInHoveredRange ? 'filled' : 'ghost'}
            sentiment={isSelected || isInHoveredRange ? 'primary' : 'neutral'}
            className={isInHoveredRange ? 'rangeButton' : undefined}
            disabled={disabled}
            key={month[0]}
            onClick={event => {
              if (!isExcluded && !isOutsideRange) {
                if (selectsRange) {
                  onClickRange(event, constructedDate)
                } else {
                  setMonthToShow(index + 1)
                  setValue(constructedDate)
                  onChange?.(constructedDate, event)
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
            >
              {month[1]}
            </Text>
          </ButtonSelectDayMonth>
        )
      })}
    </Row>
  )
}

const Daily = ({ disabled }: { disabled: boolean }) => {
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
  ) // Used when selectsRange is True. It is used to know the current state of the range: none when start date not selected, start when start date is selected, done when start & end date selected

  const [hoveredDate, setHoveredDate] = useState<Date | null>(null)

  const monthDays = getMonthDays(monthToShow, yearToShow) // Number of days in the month
  const monthFirstDay = getMonthFirstDay(monthToShow, yearToShow) // First day of the month

  const daysFromPreviousMonth = (monthFirstDay - 1 + 6) % 7 //  Number of days from the previous month to show. Shift to align Monday start
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

        return (
          <ButtonSelectDayMonth
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
            >
              {data.day}
            </Text>
          </ButtonSelectDayMonth>
        )
      })}
    </Row>
  )
}

const PopupContent = () => {
  const {
    showMonthYearPicker,
    disabled,
    monthToShow,
    yearToShow,
    setMonthToShow,
    setYearToShow,
    maxDate,
    minDate,
    MONTHS_ARR,
  } = useContext(DateInputContext)

  return (
    <Stack gap={2}>
      <Stack direction="row" width="100%" justifyContent="space-between">
        <Button
          icon="arrow-left"
          variant="ghost"
          sentiment="neutral"
          size="xsmall"
          onClick={() => {
            if (
              !minDate ||
              minDate <= new Date(yearToShow, monthToShow - 1, 0)
            ) {
              const [prevMonth, year] = getPreviousMonth(
                monthToShow,
                yearToShow,
              )
              setMonthToShow(prevMonth)
              setYearToShow(year)
            }
          }}
          disabled={
            !!(minDate && minDate > new Date(yearToShow, monthToShow - 1, 0))
          }
        />
        <Text as="p" variant="bodyStrong" sentiment="neutral">
          {MONTHS_ARR[monthToShow - 1]} {yearToShow}
        </Text>
        <Button
          icon="arrow-right"
          variant="ghost"
          sentiment="neutral"
          size="xsmall"
          onClick={() => {
            if (
              !maxDate ||
              maxDate >= new Date(yearToShow, monthToShow + 1, 1)
            ) {
              const [monthNext, year] = getNextMonth(monthToShow, yearToShow)
              setMonthToShow(monthNext)
              setYearToShow(year)
            }
          }}
          disabled={
            !!(maxDate && maxDate < new Date(yearToShow, monthToShow + 1, 1))
          }
        />
      </Stack>
      {showMonthYearPicker ? (
        <Monthly disabled={disabled} />
      ) : (
        <Daily disabled={disabled} />
      )}
    </Stack>
  )
}

export const CalendarPopup = ({
  children,
  visible,
  setVisible,
  refInput,
}: PopupProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.addEventListener('mousedown', event =>
      handleClickOutside(event, ref, setVisible, refInput),
    )

    return () =>
      document.removeEventListener('mousedown', event =>
        handleClickOutside(event, ref, setVisible, refInput),
      )
  }, [ref, setVisible, refInput])

  return (
    <StyledPopup
      visible={visible}
      text={<PopupContent />}
      placement="bottom"
      ref={ref}
      hasArrow={false}
      tabIndex={0}
      role="dialog"
      debounceDelay={0}
      maxWidth={POPUP_WIDTH}
      disableAnimation
    >
      {children}
    </StyledPopup>
  )
}
