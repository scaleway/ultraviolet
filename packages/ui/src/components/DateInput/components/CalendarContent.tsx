'use client'

import styled from '@emotion/styled'
import { ArrowLeftIcon, ArrowRightIcon } from '@ultraviolet/icons'
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
      <Stack direction="row" justifyContent="space-between" width="100%">
        <Button
          data-testid="previous-month"
          disabled={
            !!(minDate && minDate > new Date(yearToShow, monthToShow - 1, 0)) ||
            disabled
          }
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
          sentiment="neutral"
          size="xsmall"
          variant="ghost"
        >
          <ArrowLeftIcon />
        </Button>
        <CapitalizedText
          as="span"
          disabled={disabled}
          sentiment="neutral"
          variant="bodyStrong"
        >
          {!showMonthYearPicker ? MONTHS_ARR[monthToShow - 1] : null}&nbsp;
          {yearToShow}
        </CapitalizedText>
        <Button
          data-testid="next-month"
          disabled={
            !!(maxDate && maxDate < new Date(yearToShow, monthToShow, 1)) ||
            disabled
          }
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
          sentiment="neutral"
          size="xsmall"
          variant="ghost"
        >
          <ArrowRightIcon />
        </Button>
      </Stack>
      {showMonthYearPicker ? <Monthly /> : <Daily />}
    </Stack>
  )
}
