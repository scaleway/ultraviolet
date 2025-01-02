import styled from '@emotion/styled'
import { AlertCircleIcon, AsteriskIcon } from '@ultraviolet/icons'
import type { FocusEvent, ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '../Button'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { EMPTY_TIME, INPUT_SIZE_HEIGHT } from './constants'
import {
  canConcat,
  formatValue,
  isAOrP,
  isCompleteHour,
  isNumber,
} from './helpers'

export type Time = {
  h: string
  m: string
  s: string
  period?: string
}

const timeKeys: ('h' | 'm' | 's')[] = ['h', 'm', 's']

const TimeInputWrapper = styled(Stack)<{
  'data-readonly': boolean
  'data-disabled': boolean
  'data-size': 'small' | 'medium' | 'large'
  'data-error': boolean
}>`
  display: flex;
  cursor: text;
  padding: ${({ theme }) => theme.space[1]};
  box-shadow: none;
  background: ${({ theme }) => theme.colors.neutral.background};
  border-radius: ${({ theme }) => theme.radii.default};
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};

  &:not([data-disabled="true"]):not([data-readonly="true"]):active {
    border-color: ${({ theme }) => theme.colors.primary.borderHover};
    box-shadow: ${({ theme }) => theme.shadows.focusPrimary};
  }
  
  &[data-disabled="false"]:hover,
  [data-disabled="false"]:focus {
    border-color: ${({ theme }) => theme.colors.primary.borderHover};
    outline: none;
  }

  &[data-size='small'] {
    height: ${({ theme }) => theme.sizing[INPUT_SIZE_HEIGHT.small]};
    padding-left: ${({ theme }) => theme.space[1]};
  }

  &[data-size='medium'] {
    height: ${({ theme }) => theme.sizing[INPUT_SIZE_HEIGHT.medium]};
  }

  &[data-size='large'] {
    height: ${({ theme }) => theme.sizing[INPUT_SIZE_HEIGHT.large]};
  }

  &[data-readonly='true'] {
    background: ${({ theme }) => theme.colors.neutral.backgroundWeak};
    border-color: ${({ theme }) => theme.colors.neutral.border};
    cursor: default;
  }

  &[data-disabled='true'] {
    background: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
    border-color: ${({ theme }) => theme.colors.neutral.borderDisabled};
    cursor: not-allowed;
    user-select: none;
  }

  &[data-error='true'] {
    border: 1px solid ${({ theme }) => theme.colors.danger.border};

    &:not([data-disabled="true"]):not([data-readonly="true"]):active {
      border-color: ${({ theme }) => theme.colors.danger.borderHover};
      box-shadow: ${({ theme }) => theme.shadows.focusDanger};
    }

    &:not([data-disabled="true"]):not([data-readonly="true"]):hover {
      border-color: ${({ theme }) => theme.colors.danger.borderHover};
    }
  }
`

export const Input = styled.input<{
  'data-size': 'small' | 'medium' | 'large'
  'data-readonly': boolean
  'data-disabled': boolean
  'data-period'?: boolean
}>`
  border: none;
  outline: none;
  background: transparent;
  font-size: ${({ theme }) => theme.typography.bodySmall.fontSize};
  width: ${({ theme }) => theme.sizing[312]};
  height: ${({ theme }) => theme.sizing[300]};
  text-align: center;
  border-radius: ${({ theme }) => theme.radii.default};
  color: ${({ theme }) => theme.colors.neutral.text};

  &[data-size='large'] {
    font-size: ${({ theme }) => theme.typography.body.fontSize};
  }

  &:not([data-disabled="true"]):not([data-readonly="true"]):hover {
    background-color: ${({ theme }) => theme.colors.neutral.backgroundHover};
    color: ${({ theme }) => theme.colors.neutral.textWeak};
  }

  &:not([data-disabled="true"]):not([data-readonly="true"]):active, 
  :not([data-disabled="true"]):not([data-readonly="true"]):focus{
    background-color: ${({ theme }) => theme.colors.neutral.backgroundStrong};
    color:  ${({ theme }) => theme.colors.neutral.text};
  }

  &[data-readonly='true'] {
    cursor: default;
  }

  &[data-disabled='true'] {
    cursor: not-allowed;
    user-select: none;
  }

  &[data-period="true"] {
    color: ${({ theme }) => theme.colors.neutral.textWeak};
  }

  ::-moz-selection {
    background: none;
  }

  ::selection {
    background: none;
  }
`

const CustomText = styled(Text)`
padding-inline: ${({ theme }) => theme.space['0.25']};
`

type TimeInputProps = {
  label?: ReactNode
  placeholder?: Time
  value?: Time
  clearable?: boolean
  required?: boolean
  labelDescription?: ReactNode
  helper?: string
  disabled?: boolean
  readOnly?: boolean
  error?: boolean | string
  'data-testid'?: string
  onChange?: (time: Time, timePeriod?: string) => void
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void
  className?: string
  id?: string
  size?: 'small' | 'medium' | 'large'
  timeFormat?: 12 | 24
}

const DEFAULT_PLACEHOLDER = { h: '00', m: '00', s: '00' } as const
/**
 * A time input component that allows users to type a time in a 24 or 12-hour format.
 * @experimental This component is experimental and may be subject to breaking changes in the future.
 */
export const TimeInputV2 = ({
  label,
  timeFormat = 24,
  value,
  clearable,
  required,
  labelDescription,
  helper,
  size = 'medium',
  disabled = false,
  readOnly = false,
  error = false,
  onChange,
  onBlur,
  onFocus,
  className,
  id,
  'data-testid': dataTestId,
  placeholder = DEFAULT_PLACEHOLDER,
}: TimeInputProps) => {
  const [time, setTime] = useState<Time>(
    value ? formatValue(value, timeFormat) : EMPTY_TIME,
  )

  const refHours = useRef<HTMLInputElement>(null)
  const refSeconds = useRef<HTMLInputElement>(null)
  const refMinutes = useRef<HTMLInputElement>(null)
  const refPeriod = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (value) {
      setTime(formatValue(value, timeFormat))
    }
  }, [timeFormat, value])

  const handleChange = (type: keyof Time, key: string) => {
    const newValue = { ...time }

    if (type === 'period') {
      if (key.toLowerCase() === 'a') newValue.period = 'am'
      else newValue.period = 'pm'
    } else {
      // Create new time
      if (canConcat(time[type], type, key, timeFormat)) {
        newValue[type] = newValue[type].slice(-1) + key
      } else newValue[type] = key.padStart(2, '0')

      // Focus to next input if the current input has a valid time
      if (
        type === 's' &&
        newValue.s &&
        Number.parseInt(newValue.s, 10) >= 7 &&
        timeFormat === 12
      ) {
        refPeriod.current?.focus()
      } else if (
        type === 'm' &&
        newValue.m &&
        Number.parseInt(newValue.m, 10) >= 10
      ) {
        refSeconds.current?.focus()
      }

      if (type === 'h') {
        if (isCompleteHour(timeFormat, newValue.h)) {
          refMinutes.current?.focus()
        }
      }
    }

    setTime(newValue)
    onChange?.(newValue)
  }

  // Increase time with arrow up
  const handleIncrease = (type: 'h' | 'm' | 's') => {
    const newTime = { ...time }
    const currentValue = Number.parseInt(
      time[type] && time[type].length > 0 ? time[type] : '0',
      10,
    )

    if (type === 'h' && timeFormat === 24) {
      newTime[type] = (currentValue === 23 ? 0 : currentValue + 1)
        .toString()
        .padStart(2, '0')
    } else if (type === 'h' && timeFormat === 12) {
      newTime[type] = (currentValue === 12 ? 1 : currentValue + 1)
        .toString()
        .padStart(2, '0')
    } else {
      newTime[type] = (currentValue === 59 ? 0 : currentValue + 1)
        .toString()
        .padStart(2, '0')
    }
    setTime(newTime)
    onChange?.(newTime)
  }

  // Decrease time with arrow down
  const handleDecrease = (type: 'h' | 'm' | 's') => {
    const newTime = { ...time }
    const currentValue = Number.parseInt(
      time[type] && time[type].length > 0 ? time[type] : '0',
      10,
    )

    if (type === 'h' && timeFormat === 24) {
      newTime[type] = (currentValue === 0 ? 23 : currentValue - 1)
        .toString()
        .padStart(2, '0')
    } else if (type === 'h' && timeFormat === 12) {
      newTime[type] = (currentValue === 1 ? 12 : currentValue - 1)
        .toString()
        .padStart(2, '0')
    } else {
      newTime[type] = (currentValue === 0 ? 59 : currentValue - 1)
        .toString()
        .padStart(2, '0')
    }
    setTime(newTime)
    onChange?.(newTime)
  }

  // Go to next input
  const handleNext = (type: 'h' | 'm' | 's') => {
    if (type === 'h') refMinutes.current?.focus()
    if (type === 'm') refSeconds.current?.focus()
    if (type === 's' && timeFormat === 12) refPeriod.current?.focus()
  }

  // Go to previous input
  const handlePrevious = (type: 'h' | 'm' | 's') => {
    if (type === 'm') refHours.current?.focus()
    if (type === 's') refMinutes.current?.focus()
  }

  return (
    <Stack gap={0.5} className={className} id={id} data-testid={dataTestId}>
      <Stack direction="row" gap={1} alignItems="center">
        <Text as="label" prominence="strong" sentiment="neutral" variant="body">
          {label}
        </Text>
        {required ? <AsteriskIcon size={8} sentiment="danger" /> : null}
        {labelDescription ? (
          <Text as="label" variant="bodySmall">
            {labelDescription}
          </Text>
        ) : null}
        {labelDescription && typeof labelDescription !== 'string'
          ? labelDescription
          : null}
      </Stack>
      <TimeInputWrapper
        data-readonly={readOnly}
        data-disabled={disabled}
        data-size={size}
        data-error={!!error}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        onBlur={onBlur}
        onFocus={onFocus}
        aria-required={required}
      >
        <Stack direction="row">
          {timeKeys.map(type => {
            const computedRef = () => {
              if (type === 'h') return refHours
              if (type === 'm') return refMinutes

              return refSeconds
            }
            const fullName = () => {
              if (type === 'h') return 'hours'
              if (type === 'm') return 'minutes'

              return 'seconds'
            }

            return (
              <Stack key={type} gap={0} direction="row">
                <Input
                  value={time[type]}
                  placeholder={placeholder[type]}
                  data-size={size}
                  data-disabled={disabled}
                  data-readonly={readOnly}
                  readOnly
                  disabled={disabled}
                  aria-label={`${fullName()}-input`}
                  data-testid={`${fullName()}-input`}
                  onKeyDown={event => {
                    if (!readOnly && !disabled) {
                      if (isNumber(event.key)) handleChange(type, event.key)
                      else if (event.key === 'ArrowUp') {
                        event.preventDefault()
                        handleIncrease(type)
                      } else if (event.key === 'ArrowDown') {
                        event.preventDefault()
                        handleDecrease(type)
                      } else if (event.key === 'ArrowLeft') {
                        event.preventDefault()
                        handlePrevious(type)
                      } else if (event.key === 'ArrowRight') {
                        event.preventDefault()
                        handleNext(type)
                      }
                    }
                  }}
                  ref={computedRef()}
                />
                {type === 's' ? null : (
                  <CustomText
                    as="span"
                    variant="body"
                    prominence="default"
                    sentiment="neutral"
                  >
                    :
                  </CustomText>
                )}
              </Stack>
            )
          })}
          {timeFormat === 12 ? (
            <Input
              value={time.period?.toUpperCase()}
              placeholder={placeholder.period ?? '-M'}
              data-size={size}
              data-disabled={disabled}
              data-readonly={readOnly}
              data-period
              readOnly
              disabled={disabled}
              aria-label="am-pm-input"
              data-testid="am-pm-input"
              onKeyDown={event => {
                if (!readOnly && !disabled) {
                  if (isAOrP(event.key)) handleChange('period', event.key)
                  else if (
                    event.key === 'ArrowUp' ||
                    event.key === 'ArrowDown'
                  ) {
                    event.preventDefault()
                    const newTime = {
                      ...time,
                      period:
                        time.period === 'am' ? 'pm' : ('am' as 'am' | 'pm'),
                    }
                    setTime(newTime)
                    onChange?.(newTime)
                  } else if (event.key === 'ArrowLeft') {
                    event.preventDefault()
                    refSeconds.current?.focus()
                  }
                }
              }}
              ref={refPeriod}
            />
          ) : null}
        </Stack>
        <Stack direction="row" alignItems="center" gap="1">
          {error ? <AlertCircleIcon sentiment="danger" /> : null}
          {clearable ? (
            <Button
              aria-label="clear value"
              disabled={disabled || readOnly}
              variant="ghost"
              size="small"
              icon="close"
              onClick={event => {
                event.stopPropagation()
                setTime(EMPTY_TIME)
                onChange?.(EMPTY_TIME)
              }}
              sentiment="neutral"
              data-testid="clear"
            />
          ) : null}
        </Stack>
      </TimeInputWrapper>
      {helper || error ? (
        <Text
          as="p"
          variant="caption"
          sentiment={error ? 'danger' : 'neutral'}
          prominence={error ? 'default' : 'weak'}
          disabled={disabled}
        >
          {error || helper}
        </Text>
      ) : null}
    </Stack>
  )
}
