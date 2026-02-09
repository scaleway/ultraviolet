'use client'

import { CalendarRangeIcon } from '@ultraviolet/icons/CalendarRangeIcon'
import { cn } from '@ultraviolet/utils'
import type { Locale } from 'date-fns'
import type { ChangeEvent, CSSProperties, FocusEvent } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Card } from '../Card'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { TextInput } from '../TextInput'
import type { ContextProps } from './Context'
import { DateInputContext } from './Context'
import { CalendarContent } from './components/CalendarContent'
import { CalendarPopup } from './components/Popup'
import { createDate, createDateRange, formatValue } from './helpers'
import { getDays, getLocalizedMonths, getMonths } from './helpersLocale'
import { calendarContentWrapper, dateinputContainer } from './styles.css'

type DateInputProps<IsRange extends undefined | boolean = false> = {
  autoFocus?: boolean
  locale?: string | Locale
  disabled?: boolean
  maxDate?: Date
  minDate?: Date
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
  style?: CSSProperties
  excludeDates?: Date[]
  id?: string
  labelDescription?: string
  success?: string | boolean
  helper?: string
  size?: 'small' | 'medium' | 'large'
  readOnly?: boolean
  tooltip?: string
  clearable?: boolean
  showMonthYearPicker?: boolean
  placeholder?: string
  startDate?: Date | null
  endDate?: Date | null
  /**
   * Display the component as an input + a calendar popup ("text") or only as a calendar ("calendar")
   */
  input?: 'calendar' | 'text'
  selectsRange?: IsRange
  onChange?: IsRange extends true
    ? (
        date: Date[] | [Date | null, Date | null],
        event?: React.SyntheticEvent,
      ) => void
    : (date: Date | null, event?: React.SyntheticEvent) => void
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
  clearable,
  selectsRange = false,
  showMonthYearPicker = false,
  input = 'text',
  'data-testid': dataTestId,
  style,
}: DateInputProps<IsRange>) => {
  const defaultMonthToShow = useMemo(() => {
    if (value) {
      return new Date(value).getMonth() + 1
    }
    if (startDate && selectsRange) {
      return startDate.getMonth() + 1
    }
    if (endDate && selectsRange) {
      return endDate.getMonth() + 1
    }

    return new Date().getMonth() + 1
  }, [endDate, selectsRange, startDate, value])

  const defaultYearToShow = useMemo(() => {
    if (value) {
      return new Date(value).getFullYear()
    }
    if (startDate && selectsRange) {
      return startDate.getFullYear()
    }
    if (endDate && selectsRange) {
      return endDate.getFullYear()
    }

    return new Date().getFullYear()
  }, [endDate, selectsRange, startDate, value])

  const [computedValue, setValue] = useState(
    value && !selectsRange ? new Date(value) : null,
  )
  const [computedRange, setRange] = useState({
    end: endDate ?? null,
    start: startDate ?? null,
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
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null)
  const refInput = useRef<HTMLInputElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)
  const MONTHS = getMonths(locale)
  const DAYS = getDays(locale)
  const MONTHS_ARR = getLocalizedMonths(locale)

  const valueContext = useMemo(
    () =>
      ({
        DAYS,
        disabled,
        excludeDates,
        format,
        hoveredDate,
        MONTHS,
        MONTHS_ARR,
        maxDate,
        minDate,
        monthToShow,
        onChange,
        range: computedRange,
        readOnly,
        selectsRange,
        setHoveredDate,
        setInputValue,
        setMonthToShow,
        setRange,
        setValue,
        setVisible,
        setYearToShow,
        showMonthYearPicker,
        value: computedValue,
        yearToShow,
      }) as ContextProps,
    [
      showMonthYearPicker,
      disabled,
      readOnly,
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
      setVisible,
      hoveredDate,
      setHoveredDate,
    ],
  )

  useEffect(() => {
    if (!selectsRange) {
      setValue(value ?? null)
      setInputValue(
        formatValue(
          value ? new Date(value) : null,
          null,
          showMonthYearPicker,
          selectsRange,
          format,
        ) ?? '', // Text Input which will use this value, won't update value if value is undefined, so we need force empty string is there is no date
      )
    }
    if (selectsRange) {
      setRange({
        end: endDate ?? null,
        start: startDate ?? null,
      })
      setInputValue(
        formatValue(
          null,
          { start: startDate ?? null, end: endDate ?? null },
          showMonthYearPicker,
          true,
          format,
        ),
      )
    }
  }, [endDate, startDate, value, selectsRange, format, showMonthYearPicker])

  const manageOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value

    if (!newValue) {
      onChange?.(
        (selectsRange ? [null, null] : null) as
          | (Date[] & Date)
          | ([Date | null, Date | null] & Date),
      )
    }

    if (selectsRange) {
      const computedNewRange = createDateRange(newValue, showMonthYearPicker)

      setRange({ end: computedNewRange[1], start: computedNewRange[0] })
      setInputValue(newValue)

      if (computedNewRange[0]) {
        setMonthToShow(computedNewRange[0].getMonth() + 1)
        setYearToShow(computedNewRange[0].getFullYear())
      }
    } else {
      const computedDate = createDate(newValue, showMonthYearPicker)

      if (computedDate) {
        setMonthToShow(computedDate.getMonth() + 1)
        setYearToShow(computedDate.getFullYear())
        setValue(computedDate)
      }
    }
    setInputValue(newValue)
  }

  const onBlurInput = () => {
    // Only call onChange when there is a date typed in the input and the user did not click on the calendar (which triggers onChange itself)
    if (inputValue) {
      if (selectsRange) {
        const computedNewRange = createDateRange(
          inputValue,
          showMonthYearPicker,
        )
        ;(
          onChange as (
            date: Date[] | [Date | null, Date | null],
            event: React.SyntheticEvent | undefined,
          ) => void
        )?.(computedNewRange, undefined)
      } else {
        const computedDate = createDate(inputValue, showMonthYearPicker)
        ;(
          onChange as (date: Date | null, event?: React.SyntheticEvent) => void
        )?.(computedDate, undefined)
      }
    }
  }

  return (
    <DateInputContext.Provider value={valueContext}>
      <div
        className={cn(className, dateinputContainer)}
        data-testid={dataTestId}
        id={id}
        onBlur={onBlur}
        onClick={() => {
          if (!isPopupVisible) {
            setVisible(true)
          }
        }}
        onFocus={onFocus}
        onKeyDown={event => {
          if ([' ', 'Enter'].includes(event.key) && !isPopupVisible) {
            setVisible(true)
          }
        }}
        ref={popupRef}
        style={style}
      >
        {input === 'text' ? (
          <CalendarPopup
            content={<CalendarContent />}
            refInput={refInput}
            setVisible={setVisible}
            visible={isPopupVisible}
          >
            <TextInput
              autoComplete="false"
              autoFocus={autoFocus} // oxlint-disable-line jsx_a11y/no-autofocus
              clearable={clearable}
              disabled={disabled}
              error={error}
              helper={helper}
              label={label}
              labelDescription={labelDescription}
              name={name}
              onBlur={event => {
                if (!popupRef.current?.contains(event.relatedTarget)) {
                  onBlurInput()
                }
              }}
              onChange={manageOnChange}
              onKeyDown={event => {
                if (event.key === 'Enter') {
                  setVisible(!isPopupVisible)
                  onBlurInput()
                }
              }}
              placeholder={placeholder}
              readOnly={readOnly}
              ref={refInput}
              required={required}
              size={size}
              success={success}
              suffix={
                <CalendarRangeIcon
                  disabled={disabled}
                  sentiment="neutral"
                  size="medium"
                />
              }
              tooltip={tooltip}
              value={inputValue}
            />
          </CalendarPopup>
        ) : (
          <Stack gap={0.5}>
            {labelDescription ? (
              <Stack direction="row" gap="1">
                <Text
                  as="label"
                  prominence="strong"
                  sentiment="neutral"
                  variant="bodyStrong"
                >
                  {label}
                </Text>
                {labelDescription}
              </Stack>
            ) : (
              <Text
                as="label"
                prominence="strong"
                sentiment="neutral"
                variant="bodyStrong"
              >
                {label}
              </Text>
            )}
            <Card
              className={calendarContentWrapper({ disabled })}
              disabled={disabled}
            >
              <CalendarContent />
            </Card>
          </Stack>
        )}
      </div>
    </DateInputContext.Provider>
  )
}
