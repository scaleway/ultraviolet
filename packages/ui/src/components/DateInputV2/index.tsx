import styled from '@emotion/styled'
import { CalendarRangeIcon } from '@ultraviolet/icons'
import type { Locale } from 'date-fns'
import type { FocusEvent } from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { TextInputV2 } from '../TextInputV2'
import { type ContextProps, DateInputContext } from './Context'
import { CalendarPopup } from './Popup'
import { CURRENT_MONTH, CURRENT_YEAR, addZero } from './helpers'
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
  value?: Date | null
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
export const DateInputV2 = <IsRange extends undefined | boolean>({
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
  showMonthYearPicker,
  'data-testid': dataTestId,
}: DateInputProps<IsRange>) => {
  const defaultMonthToShow = useMemo(() => {
    if (value) return value.getMonth() + 1
    if (startDate && selectsRange) return startDate.getMonth() + 1
    if (endDate && selectsRange) return endDate.getMonth() + 1

    return CURRENT_MONTH
  }, [endDate, selectsRange, startDate, value])

  const defaultYearToShow = useMemo(() => {
    if (value) return value.getFullYear()
    if (startDate && selectsRange) return startDate.getFullYear()
    if (endDate && selectsRange) return endDate.getFullYear()

    return CURRENT_YEAR
  }, [endDate, selectsRange, startDate, value])

  const [computedValue, setValue] = useState(
    value && !selectsRange ? value : null,
  )
  const [computedRange, setRange] = useState({
    start: startDate ?? null,
    end: endDate ?? null,
  })
  const [isPopupVisible, setVisible] = useState(false)
  const [monthToShow, setMonthToShow] = useState(defaultMonthToShow)
  const [yearToShow, setYearToShow] = useState(defaultYearToShow)
  const refInput = useRef<HTMLInputElement>(null)
  const MONTHS = getMonths(locale)
  const DAYS = getDays(locale)
  const MONTHS_ARR = getLocalizedMonths(locale)

  // Default format if none is provided
  const getDateISO = useCallback(
    (date?: Date) => {
      if (date) {
        if (showMonthYearPicker) {
          return [date.getFullYear(), addZero(date.getMonth() + 1)].join('/')
        }

        return [
          date.getFullYear(),
          addZero(date.getMonth() + 1),
          addZero(date.getDate()),
        ].join('/')
      }

      return ''
    },
    [showMonthYearPicker],
  )

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
    ],
  )

  useEffect(() => {
    if (value && !selectsRange) {
      setValue(value)
    }
    if (selectsRange) {
      setRange({
        start: startDate ?? computedRange.start,
        end: endDate ?? computedRange.end,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endDate, startDate, value])

  const formattedValue = useMemo(() => {
    if (selectsRange) {
      return format
        ? `${format(computedRange.start ?? undefined)} – ${format(computedRange.end ?? undefined)}`
        : `${getDateISO(computedRange.start ?? undefined)} – ${getDateISO(computedRange.end ?? undefined)}`
    }

    if (computedValue && format) {
      return format(computedValue)
    }
    if (computedValue) {
      return getDateISO(computedValue)
    }

    return undefined
  }, [
    selectsRange,
    computedValue,
    format,
    computedRange.start,
    computedRange.end,
    getDateISO,
  ])

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
            value={formattedValue}
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
          />
        </CalendarPopup>
      </Container>
    </DateInputContext.Provider>
  )
}
