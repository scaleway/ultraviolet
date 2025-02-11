import styled from '@emotion/styled'
import { useContext } from 'react'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { DateInputContext } from '../Context'
import { getNextMonth, getPreviousMonth } from '../helpers'
import { Daily } from './CalendarDaily'
import { Monthly } from './CalendarMonthly'

const CapitalizedText = styled(Text)`
  text-transform: capitalize;
`
export const CalendarContent = () => {
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
    readOnly,
  } = useContext(DateInputContext)

  return (
    <Stack gap={2}>
      <Stack direction="row" width="100%" justifyContent="space-between">
        <Button
          icon="arrow-left"
          data-testid="previous-month"
          variant="ghost"
          sentiment="neutral"
          size="xsmall"
          onClick={() => {
            if (
              (!minDate ||
                minDate <= new Date(yearToShow, monthToShow - 1, 0)) &&
              !readOnly
            ) {
              if (!showMonthYearPicker) {
                const [prevMonth, year] = getPreviousMonth(
                  monthToShow,
                  yearToShow,
                )
                setMonthToShow(prevMonth)
                setYearToShow(year)
              } else {
                setYearToShow(yearToShow - 1)
              }
            }
          }}
          disabled={
            !!(minDate && minDate > new Date(yearToShow, monthToShow - 1, 0)) ||
            disabled
          }
        />
        <CapitalizedText
          as="span"
          variant="bodyStrong"
          sentiment="neutral"
          disabled={disabled}
        >
          {!showMonthYearPicker ? MONTHS_ARR[monthToShow - 1] : null}&nbsp;
          {yearToShow}
        </CapitalizedText>
        <Button
          icon="arrow-right"
          data-testid="next-month"
          variant="ghost"
          sentiment="neutral"
          size="xsmall"
          onClick={() => {
            if (
              (!maxDate || maxDate >= new Date(yearToShow, monthToShow, 1)) &&
              !readOnly
            ) {
              if (!showMonthYearPicker) {
                const [monthNext, year] = getNextMonth(monthToShow, yearToShow)
                setMonthToShow(monthNext)
                setYearToShow(year)
              } else {
                setYearToShow(yearToShow + 1)
              }
            }
          }}
          disabled={
            !!(maxDate && maxDate < new Date(yearToShow, monthToShow, 1)) ||
            disabled
          }
        />
      </Stack>
      {showMonthYearPicker ? <Monthly /> : <Daily />}
    </Stack>
  )
}
