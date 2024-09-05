import { Global } from '@emotion/react'
import styled from '@emotion/styled'
import { Icon } from '@ultraviolet/icons/legacy'
import type { FocusEvent, ReactNode } from 'react'
import { useId } from 'react'
import type { ReactDatePickerProps } from 'react-datepicker'
import DatePicker, { registerLocale } from 'react-datepicker'
import { Button } from '../Button'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { TextInputV2 } from '../TextInputV2'
import style from './datepicker.css?inline'

const PREFIX = '.react-datepicker'

const StyledWrapper = styled.div`
  width: 100%;

  div${PREFIX}-wrapper {
    display: block;
  }
  div${PREFIX}__input-container {
    display: block;
  }
  div${PREFIX}__triangle {
    display: none;
  }

  div${PREFIX}__month-container {
    padding: 16px;
    width: 264px;
  }

  ${PREFIX}-popper {
    z-index: 1000;
  }
  .calendar {
    font-family: ${({ theme }) => theme.typography.body.fontFamily};
    border-color: ${({ theme }) => theme.colors.neutral.borderWeak};
    background-color: ${({ theme }) =>
      theme.colors.other.elevation.background.raised};
    box-shadows: ${({ theme }) => theme.shadows.raised};


    ${PREFIX}__header {
      color: ${({ theme }) => theme.colors.neutral.text};
      background-color: ${({ theme }) =>
        theme.colors.other.elevation.background.raised};
      border-bottom: none;
      text-align: inherit;
      display: block;
      padding-top: 0;
      position: inherit;
    }

    ${PREFIX}__triangle {
      border-bottom-color: ${({ theme }) => theme.colors.neutral.backgroundWeak};
    }
    ${PREFIX}__month {
      margin: 0;
    }

    ${PREFIX}__day-names {
      margin-top: 8px;
    }

    ${PREFIX}__day-name {
      font-family: ${({ theme }) => theme.typography.bodySmallStrong.fontFamily};
      color: ${({ theme }) => theme.colors.neutral.text};
      font-weight: ${({ theme }) => theme.typography.bodySmallStrong.weight};
      font-size: ${({ theme }) => theme.typography.bodySmallStrong.fontSize};
      line-height: ${({ theme }) => theme.typography.bodySmallStrong.lineHeight};
      text-align: center;
      margin: 3px;
      text-transform: capitalize;
    }

    ${PREFIX}__day, ${PREFIX}__month {
      color: ${({ theme }) => theme.colors.neutral.textWeak};
      font-weight: ${({ theme }) => theme.typography.bodyStrong.weight};
      font-size: ${({ theme }) => theme.typography.bodyStrong.fontSize};
      margin-left: 3px;
      margin-right: 3px;
    }

    ${PREFIX}__day {
      width: 26px;
      height: 26px;
    }

    ${PREFIX}__month-text {
      height: 26px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
    }

    ${PREFIX}__day--outside-month {
      color: ${({ theme }) => theme.colors.neutral.textDisabled};
      font-weight: ${({ theme }) => theme.typography.bodyStrong.weight};
      font-size: ${({ theme }) => theme.typography.bodyStrong.fontSize};
    }

    ${PREFIX}__day--selected, ${PREFIX}__month-text--selected {
      color: ${({ theme }) => theme.colors.primary.textStrong};
      background-color: ${({ theme }) => theme.colors.primary.backgroundStrong};

      &[aria-disabled="true"],
      &:disabled {
        color: ${({ theme }) => theme.colors.primary.textStrongDisabled};
        background-color: ${({ theme }) =>
          theme.colors.primary.backgroundStrongDisabled};
      }
    }

    ${PREFIX}__day--in-selecting-range,  ${PREFIX}__month-text--in-selecting-range {
      color: ${({ theme }) => theme.colors.primary.text};
      background-color: ${({ theme }) => theme.colors.primary.background};

      &[aria-disabled="true"],
      &:disabled {
        color: ${({ theme }) => theme.colors.primary.textDisabled};
        background-color: ${({ theme }) =>
          theme.colors.primary.backgroundDisabled};
      }
    }

    ${PREFIX}__day--in-range, ${PREFIX}__month-text--in-range {
      color: ${({ theme }) => theme.colors.primary.text};
      background-color: ${({ theme }) => theme.colors.primary.background};

      &[aria-disabled="true"],
      &:disabled {
        color: ${({ theme }) => theme.colors.primary.textDisabled};
        background-color: ${({ theme }) =>
          theme.colors.primary.backgroundDisabled};
      }
    }

    ${PREFIX}__day--range-start, ${PREFIX}__month-text--range-start {
      color: ${({ theme }) => theme.colors.primary.textStrong};
      background-color: ${({ theme }) => theme.colors.primary.backgroundStrong};

      &[aria-disabled="true"],
      &:disabled {
        color: ${({ theme }) => theme.colors.primary.textStrongDisabled};
        background-color: ${({ theme }) =>
          theme.colors.primary.backgroundStrongDisabled};
      }
    }

    ${PREFIX}__day--range-end, ${PREFIX}__month-text--range-end {
      color: ${({ theme }) => theme.colors.primary.textStrong};
      background-color: ${({ theme }) => theme.colors.primary.backgroundStrong};

      &[aria-disabled="true"],
      &:disabled {
        color: ${({ theme }) => theme.colors.primary.textStrongDisabled};
        background-color: ${({ theme }) =>
          theme.colors.primary.backgroundStrongDisabled};
      }
    }

    ${PREFIX}__day--keyboard-selected, ${PREFIX}__month-text--keyboard-selected {
      color: ${({ theme }) => theme.colors.primary.textStrong};
      background-color: ${({ theme }) => theme.colors.primary.backgroundStrong};
    }

    ${PREFIX}__day:hover, ${PREFIX}__month-text:hover {
      color: ${({ theme }) => theme.colors.neutral.textHover};
      background-color: ${({ theme }) => theme.colors.neutral.backgroundHover};
    }

    ${PREFIX}__day--disabled, ${PREFIX}__month-text--disabled {
      color: ${({ theme }) => theme.colors.neutral.textDisabled};
    }

    ${PREFIX}__day--disabled:hover, ${PREFIX}__month-text--disabled:hover {
      color: ${({ theme }) => theme.colors.neutral.textDisabled};
      background-color: transparent;
    }
  }
`

const StyledText = styled(Text)`
  text-transform: capitalize;
`

type DateInputProps = Pick<
  ReactDatePickerProps<boolean | undefined, boolean>,
  'locale' | 'onChange'
> & {
  autoFocus?: boolean
  disabled?: boolean
  maxDate?: Date | null
  minDate?: Date | null
  name?: string
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void
  error?: string
  required?: boolean
  format?: (value?: Date | string) => string | undefined
  /**
   * Label of the field
   */
  label?: string
  value?: Date | string | [Date | null, Date | null]
  className?: string
  'data-testid'?: string
  selectsRange?: boolean
  startDate?: Date | null
  endDate?: Date | null
  excludeDates?: Date[]
  id?: string
  labelDescription?: ReactNode
  success?: string | boolean
  helper?: string
  size?: 'small' | 'medium' | 'large'
  readOnly?: boolean
  tooltip?: string
  showMonthYearPicker?: boolean
}

const DEFAULT_FORMAT: DateInputProps['format'] = value =>
  value instanceof Date ? value.toISOString() : value

/**
 * DateInput is a wrapper around react-datepicker that provides a consistent look and feel with the rest of the Ultraviolet UI.
 * See https://reactdatepicker.com/ for more information.
 */
export const DateInput = ({
  autoFocus = false,
  disabled = false,
  error,
  format = DEFAULT_FORMAT,
  label,
  labelDescription,
  locale,
  maxDate,
  minDate,
  startDate,
  endDate,
  name,
  onBlur,
  onChange,
  onFocus,
  required = false,
  excludeDates,
  value,
  selectsRange,
  className,
  id,
  success,
  helper,
  size = 'large',
  readOnly = false,
  tooltip,
  showMonthYearPicker,
  'data-testid': dataTestId,
}: DateInputProps) => {
  const uniqueId = useId()
  const localId = id ?? uniqueId

  // Linked to: https://github.com/Hacker0x01/react-datepicker/issues/3834
  const ReactDatePicker =
    (DatePicker as unknown as { default: typeof DatePicker }).default ??
    DatePicker

  const localeCode =
    (typeof locale === 'string' ? locale : locale?.code) ?? 'en-GB'

  if (typeof locale === 'object') {
    registerLocale(localeCode, locale)
  }

  const valueStart = `${
    startDate !== undefined && startDate !== null
      ? `${format(startDate)} -`
      : ''
  }`
  const valueEnd = `${
    endDate !== undefined && endDate !== null ? format(endDate) : ''
  }`

  const valueFormat = selectsRange
    ? `${valueStart} ${valueEnd}`
    : format(value as Date)

  return (
    <>
      <Global styles={style} />
      <StyledWrapper>
        <ReactDatePicker
          required={required}
          data-testid={dataTestId}
          className={className}
          autoFocus={autoFocus}
          fixedHeight
          name={name}
          locale={localeCode}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          selected={
            value && !selectsRange ? new Date(value as Date) : undefined
          }
          selectsRange={selectsRange}
          excludeDates={excludeDates}
          showPopperArrow={false}
          popperPlacement="bottom-start"
          customInput={
            <TextInputV2
              error={error}
              success={success}
              helper={helper}
              id={localId}
              label={label}
              labelDescription={labelDescription}
              value={valueFormat}
              disabled={disabled}
              size={size}
              suffix={
                <Icon
                  name="calendar-range"
                  color="neutral"
                  disabled={disabled}
                />
              }
              readOnly={readOnly}
              tooltip={tooltip}
            />
          }
          disabled={disabled}
          calendarClassName="calendar"
          minDate={minDate}
          maxDate={maxDate}
          startDate={startDate}
          endDate={endDate}
          showMonthYearPicker={showMonthYearPicker}
          dateFormat={showMonthYearPicker ? 'MM/yyyy' : undefined}
          renderCustomHeader={({
            date,
            /* eslint-disable-next-line @typescript-eslint/unbound-method */
            decreaseMonth,
            /* eslint-disable-next-line @typescript-eslint/unbound-method */
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Button
                size="small"
                icon="arrow-left"
                sentiment="neutral"
                variant="ghost"
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
              />
              <StyledText variant="bodyStrong" as="p">
                {new Date(date).toLocaleString(localeCode, {
                  month: 'long',
                  year: 'numeric',
                })}
              </StyledText>
              <Button
                size="small"
                icon="arrow-right"
                sentiment="neutral"
                variant="ghost"
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
              />
            </Stack>
          )}
        />
      </StyledWrapper>
    </>
  )
}
