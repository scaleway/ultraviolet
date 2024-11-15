import styled from '@emotion/styled'
import { CalendarRangeIcon } from '@ultraviolet/icons'
import type { Locale } from 'date-fns'
import type { ChangeEvent, FocusEvent } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { TextInputV2 } from '../TextInputV2'
import { type ContextProps, DateInputContext } from './Context'
import { CalendarPopup } from './components/Popup'
import { CURRENT_MONTH, CURRENT_YEAR } from './constants'
import { formatValue } from './helpers'
import { getDays, getLocalizedMonths, getMonths } from './helpersLocale'

const Container = styled.div`
width: 100%;`

type DateInputProps<IsRange extends undefined | boolean = false> = {
  autoFocus?: boolean
  locale?: string | Locale
  disabled?: boolean
  maxDate?: Date | null
  minDate?: Date | null
  name?: string
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void
  error?: string
  required?: boolean
  format?: (value?: Date) => string | undefined
  /**
   * Label of the field
   */
  label?: string
  value?: Date | string | null
  className?: string
  'data-testid'?: string
  excludeDates?: Date[]
  id?: string
  labelDescription?: string
  success?: string | boolean
  helper?: string
  size?: 'small' | 'medium' | 'large'
  readOnly?: boolean
  tooltip?: string
  showMonthYearPicker?: boolean
  placeholder?: string
  startDate?: Date | null
  endDate?: Date | null
  selectsRange?: IsRange
  onChange?: IsRange extends true
    ? (
        date: Date[] | [Date | null, Date | null],
        event: React.SyntheticEvent | undefined,
      ) => void
    : (date: Date | null, event: React.SyntheticEvent | undefined) => void
}

/**
 * DateInput can be used to select a specific date
 */
export const DateInput = <IsRange extends undefined | boolean>({
  autoFocus = false,
  disabled = false,
  error,
  format,
  label,
  labelDescription,
  locale = 'en-US',
  maxDate,
  minDate,
  startDate,
  endDate,
  name,
  onBlur,
  onChange,
  placeholder,
  onFocus,
  required = false,
  excludeDates,
  value,
  className,
  id,
  success,
  helper,
  size = 'large',
  readOnly = false,
  tooltip,
  selectsRange = false,
  showMonthYearPicker = false,
  'data-testid': dataTestId,
}: DateInputProps<IsRange>) => {
  const defaultMonthToShow = useMemo(() => {
    if (value) return new Date(value).getMonth() + 1
    if (startDate && selectsRange) return startDate.getMonth() + 1
    if (endDate && selectsRange) return endDate.getMonth() + 1

    return CURRENT_MONTH
  }, [endDate, selectsRange, startDate, value])

  const defaultYearToShow = useMemo(() => {
    if (value) return new Date(value).getFullYear()
    if (startDate && selectsRange) return startDate.getFullYear()
    if (endDate && selectsRange) return endDate.getFullYear()

    return CURRENT_YEAR
  }, [endDate, selectsRange, startDate, value])

  const [computedValue, setValue] = useState(
    value && !selectsRange ? new Date(value) : null,
  )
  const [computedRange, setRange] = useState({
    start: startDate ?? null,
    end: endDate ?? null,
  })
  const [isPopupVisible, setVisible] = useState(false)
  const [monthToShow, setMonthToShow] = useState(defaultMonthToShow)
  const [yearToShow, setYearToShow] = useState(defaultYearToShow)
  const [inputValue, setInputValue] = useState(
    formatValue(
      computedValue,
      computedRange,
      showMonthYearPicker,
      selectsRange,
      format,
    ),
  )
  const refInput = useRef<HTMLInputElement>(null)
  const MONTHS = getMonths(locale)
  const DAYS = getDays(locale)
  const MONTHS_ARR = getLocalizedMonths(locale)

  const valueContext = useMemo(
    () =>
      ({
        showMonthYearPicker,
        disabled,
        value: computedValue,
        range: computedRange,
        setRange,
        setValue,
        monthToShow,
        yearToShow,
        setMonthToShow,
        setYearToShow,
        excludeDates,
        maxDate,
        minDate,
        MONTHS,
        MONTHS_ARR,
        DAYS,
        onChange,
        selectsRange,
        format,
        setInputValue,
      }) as ContextProps,
    [
      showMonthYearPicker,
      disabled,
      selectsRange,
      computedValue,
      computedRange,
      monthToShow,
      yearToShow,
      excludeDates,
      maxDate,
      minDate,
      MONTHS,
      MONTHS_ARR,
      DAYS,
      onChange,
      format,
      setInputValue,
    ],
  )

  useEffect(() => {
    if (value && !selectsRange) {
      setValue(new Date(value))
      setInputValue(
        formatValue(
          new Date(value),
          null,
          showMonthYearPicker,
          selectsRange,
          format,
        ),
      )
    }
    if (selectsRange) {
      setRange({
        start: startDate ?? computedRange.start,
        end: endDate ?? computedRange.end,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endDate, startDate, value])

  const manageOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value

    if (selectsRange) {
      const [startDateInput, endDateInput] = newValue.split(' - ').map(val => {
        if (showMonthYearPicker) {
          // Force YYYY/MM (since MM/YYYY not recognised as a date in typescript)
          const res = val.split(/\D+/).map(aa => parseInt(aa, 10))

          return new Date(Math.max(...res), Math.min(...res) - 1)
        }

        return new Date(val)
      })

      const computedNewRange: [Date | null, Date | null] = [
        startDateInput instanceof Date &&
        !Number.isNaN(startDateInput.getTime())
          ? startDateInput
          : null,
        endDateInput instanceof Date && !Number.isNaN(endDateInput.getTime())
          ? endDateInput
          : null,
      ]

      setRange({ start: computedNewRange[0], end: computedNewRange[1] })
      setInputValue(newValue)

      if (computedNewRange[0]) {
        setMonthToShow(computedNewRange[0].getMonth() + 1)
        setYearToShow(computedNewRange[0].getFullYear())
      }
      // TypeScript fails to automatically get the correct type of onChange here
      ;(
        onChange as (
          date: Date[] | [Date | null, Date | null],
          event: React.SyntheticEvent | undefined,
        ) => void
      )?.(computedNewRange, event)
    } else {
      const computedDate = new Date(newValue)
      setInputValue(newValue)

      if (Date.parse(newValue)) {
        setValue(computedDate)
        setMonthToShow(computedDate.getMonth() + 1)
        setYearToShow(computedDate.getFullYear())

        // TypeScript fails to automatically get the correct type of onChange here
        ;(
          onChange as (date: Date | null, event?: React.SyntheticEvent) => void
        )?.(computedDate, event)
      }
    }
  }

  return (
    <DateInputContext.Provider value={valueContext}>
      <Container
        id={id}
        className={className}
        data-testid={dataTestId}
        onBlur={onBlur}
        onFocus={onFocus}
        onClick={() => {
          if (!isPopupVisible) setVisible(true)
        }}
      >
        <CalendarPopup
          visible={isPopupVisible}
          setVisible={setVisible}
          refInput={refInput}
        >
          <TextInputV2
            label={label}
            placeholder={placeholder}
            value={inputValue}
            required={required}
            error={error}
            success={success}
            readOnly={readOnly}
            disabled={disabled}
            size={size}
            autoFocus={autoFocus}
            helper={helper}
            labelDescription={labelDescription}
            name={name}
            suffix={
              <CalendarRangeIcon
                size="large"
                sentiment="neutral"
                disabled={disabled}
              />
            }
            ref={refInput}
            tooltip={tooltip}
            autoComplete="false"
            onChange={manageOnChange}
          />
        </CalendarPopup>
      </Container>
    </DateInputContext.Provider>
  )
}
