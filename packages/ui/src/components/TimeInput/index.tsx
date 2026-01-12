'use client'

import { AlertCircleIcon, CloseIcon } from '@ultraviolet/icons'
import type { CSSProperties, FocusEvent, ReactNode } from 'react'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { Button } from '../Button'
import { Label } from '../Label'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { DEFAULT_DATE, DEFAULT_PLACEHOLDER, TIME_KEYS } from './constants'
import {
  canConcat,
  format,
  getLastTypedChar,
  getValueByType,
  isAOrP,
  isCompleteHour,
  isNumber,
  setValueByType,
} from './helpers'
import { timeinput, timeinputWrapper, timeSeparator } from './styles.css'

export type Time = {
  h: string
  m: string
  s: string
  period?: string
}

type TimeInputProps = {
  placeholder?: Time
  value?: Date | null
  clearable?: boolean
  required?: boolean
  labelDescription?: ReactNode
  helper?: ReactNode
  disabled?: boolean
  readOnly?: boolean
  error?: boolean | string
  'data-testid'?: string
  onChange?: (value: Date | undefined, valuePeriod?: string) => void
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void
  className?: string
  id?: string
  size?: 'small' | 'medium' | 'large'
  timeFormat?: 12 | 24
  /**
   * Automatically focus on the element on render. Autofocus is applied to the hour input
   */
  autoFocus?: boolean
  style?: CSSProperties
} & (
  | {
      label?: string
      'aria-label'?: never
    }
  | {
      label?: never
      'aria-label': string
    }
)

/**
 * A time input component that allows users to type a time in a 24 or 12-hour format.
 * @experimental This component is experimental and may be subject to breaking changes in the future.
 */
export const TimeInput = ({
  label,
  timeFormat = 24,
  value,
  clearable,
  required,
  labelDescription,
  helper,
  size = 'large',
  disabled = false,
  readOnly = false,
  error = false,
  onChange,
  onBlur,
  onFocus,
  className,
  id,
  autoFocus,
  style,
  'data-testid': dataTestId,
  placeholder = DEFAULT_PLACEHOLDER,
  'aria-label': ariaLabel,
}: TimeInputProps) => {
  const localId = useId()
  const defaultPeriod = useMemo(() => {
    if (value) {
      return value.getHours() >= 12 ? 'pm' : 'am'
    }

    return undefined
  }, [value])

  const [time, setTime] = useState(value)
  const [period, setPeriod] = useState<'pm' | 'am' | undefined>(defaultPeriod)
  const [filled, setFilled] = useState(
    value ? { h: true, m: true, s: true } : { h: false, m: false, s: false },
  ) // to not show 00 when there should be a placeholder

  const refHours = useRef<HTMLInputElement>(null)
  const refSeconds = useRef<HTMLInputElement>(null)
  const refMinutes = useRef<HTMLInputElement>(null)
  const refPeriod = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (value) {
      setTime(value)

      // without this condition, every time an input value changes, the other ones will be set to 0 if they used to be undefined
      // instead of leaving them empty (and showing the placeholder)
      if (value.getTime() !== time?.getTime()) {
        setFilled({ h: true, m: true, s: true })
      }
    }
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const handleChangePeriod = (key: 'a' | 'p') => {
    if (!time) {
      setPeriod(`${key}m`)
    } else if (key.toLowerCase() === 'a') {
      if (time.getHours() >= 12) {
        const newTime = new Date(time)
        newTime.setHours(newTime.getHours() - 12)
        setTime(newTime)
        onChange?.(newTime)
      }
      setPeriod('am')
    } else {
      if (time.getHours() < 12) {
        const newTime = new Date(time)
        newTime.setHours(newTime.getHours() + 12)
        setTime(newTime)
        onChange?.(newTime)
      }
      setPeriod('pm')
    }
  }
  const handleChange = (type: 'h' | 'm' | 's', key: number) => {
    const newTime = time ? new Date(time) : DEFAULT_DATE
    const valueToChange = getValueByType(type, time)

    if (canConcat(valueToChange, type, key, timeFormat)) {
      const newValue = (valueToChange % 10) * 10 + key

      setValueByType(type, newTime, newValue)
    } else {
      setValueByType(type, newTime, key)
    }

    const newValue = getValueByType(type, newTime)
    // Focus to next input if the current input has a valid time
    if (type === 's' && newTime && newValue >= 7 && timeFormat === 12) {
      refPeriod.current?.focus()
    } else if (type === 'm' && newTime && newValue >= 6) {
      refSeconds.current?.focus()
    }

    if (type === 'h' && isCompleteHour(timeFormat, newValue)) {
      refMinutes.current?.focus()
    }

    const newFilled = {
      ...filled,
      [type]: true,
    }

    setTime(newTime)
    onChange?.(newTime)

    setFilled(newFilled)
  }

  // Increase time with arrow up
  const handleIncrease = (type: 'h' | 'm' | 's') => {
    const newTime = time ? new Date(time) : DEFAULT_DATE
    const currentValue = getValueByType(type, newTime)
    if (type === 'h' && timeFormat === 24) {
      setValueByType(type, newTime, currentValue === 23 ? 0 : currentValue + 1)
    } else if (type === 'h' && timeFormat === 12) {
      setValueByType(type, newTime, currentValue === 12 ? 1 : currentValue + 1)
    } else {
      setValueByType(type, newTime, currentValue === 59 ? 0 : currentValue + 1)
    }
    const newFilled = {
      ...filled,
      [type]: true,
    }

    setTime(newTime)
    onChange?.(newTime)
    setFilled(newFilled)
  }

  // Decrease time with arrow down
  const handleDecrease = (type: 'h' | 'm' | 's') => {
    const newTime = time ? new Date(time) : DEFAULT_DATE
    const currentValue = getValueByType(type, newTime)

    if (type === 'h' && timeFormat === 24) {
      setValueByType(type, newTime, currentValue === 0 ? 23 : currentValue - 1)
    } else if (type === 'h' && timeFormat === 12) {
      setValueByType(type, newTime, currentValue === 1 ? 12 : currentValue - 1)
    } else {
      setValueByType(type, newTime, currentValue === 0 ? 59 : currentValue - 1)
    }
    const newFilled = {
      ...filled,
      [type]: true,
    }

    setTime(newTime)
    onChange?.(newTime)
    setFilled(newFilled)
  }

  // Go to next input
  const handleNext = (type: 'h' | 'm' | 's') => {
    if (type === 'h') {
      refMinutes.current?.focus()
    }
    if (type === 'm') {
      refSeconds.current?.focus()
    }
    if (type === 's' && timeFormat === 12) {
      refPeriod.current?.focus()
    }
  }

  // Go to previous input
  const handlePrevious = (type: 'h' | 'm' | 's') => {
    if (type === 'm') {
      refHours.current?.focus()
    }
    if (type === 's') {
      refMinutes.current?.focus()
    }
  }

  return (
    <Stack className={className} gap={0.5} style={style}>
      {label || labelDescription ? (
        <Label
          htmlFor={id ?? localId}
          labelDescription={labelDescription}
          required={required}
          size={size}
        >
          {label}
        </Label>
      ) : null}
      <Stack
        alignItems="center"
        aria-label={ariaLabel}
        aria-required={required}
        className={timeinputWrapper({
          disabled,
          error: !!error,
          readOnly,
          size,
        })}
        data-testid={dataTestId}
        direction="row"
        id={id}
        justifyContent="space-between"
        onBlur={onBlur}
        onClick={() => refHours.current?.focus()}
        onFocus={onFocus}
      >
        <Stack direction="row">
          {TIME_KEYS.map(type => {
            const computedRef = () => {
              if (type === 'h') {
                return refHours
              }
              if (type === 'm') {
                return refMinutes
              }

              return refSeconds
            }
            const fullName = () => {
              if (type === 'h') {
                return 'hours'
              }
              if (type === 'm') {
                return 'minutes'
              }

              return 'seconds'
            }

            const computeMaxValue = () => {
              if (type === 'h' && timeFormat === 12) {
                return 12
              }
              if (type === 'h' && timeFormat === 24) {
                return 23
              }

              return 59
            }

            return (
              <Stack direction="row" key={type}>
                <input
                  aria-label={ariaLabel}
                  aria-valuemax={computeMaxValue()}
                  aria-valuemin={type === 'h' && timeFormat === 12 ? 1 : 0}
                  aria-valuenow={
                    filled[type]
                      ? Number.parseInt(
                          format(getValueByType(type, time), type, timeFormat),
                          10,
                        )
                      : undefined
                  }
                  autoComplete="off"
                  // oxlint-disable-next-line jsx_a11y/no-autofocus
                  autoFocus={autoFocus && type === 'h'}
                  className={timeinput()}
                  data-size={size}
                  data-testid={`${fullName()}-input`}
                  disabled={disabled}
                  onChange={event => {
                    if (!(readOnly || disabled)) {
                      const key = getLastTypedChar(
                        event.target.value,
                        getValueByType(type, time),
                      )
                      if (isNumber(key)) {
                        handleChange(type, Number.parseInt(key, 10))
                      }
                    }
                  }}
                  onClick={event => {
                    event.stopPropagation()
                  }}
                  onKeyDown={event => {
                    if (!(readOnly || disabled)) {
                      if (event.key === 'ArrowUp') {
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
                  placeholder={placeholder[type]}
                  readOnly={readOnly}
                  ref={computedRef()}
                  role="spinbutton"
                  value={
                    filled[type]
                      ? format(getValueByType(type, time), type, timeFormat)
                      : ''
                  }
                />
                {type === 's' ? null : (
                  <Text
                    as="span"
                    className={timeSeparator}
                    prominence="default"
                    sentiment="neutral"
                    variant="body"
                  >
                    :
                  </Text>
                )}
              </Stack>
            )
          })}
          {timeFormat === 12 ? (
            <input
              aria-label={ariaLabel}
              aria-valuemax={12}
              aria-valuemin={0}
              aria-valuenow={period === 'am' ? 0 : 12}
              aria-valuetext={period}
              autoComplete="off"
              className={timeinput({ period: true })}
              data-size={size}
              data-testid="am-pm-input"
              disabled={disabled}
              onChange={event => {
                if (!(readOnly || disabled)) {
                  const key = event.target.value.slice(-1)
                  if (isAOrP(key)) {
                    handleChangePeriod(key as 'a' | 'p')
                  }
                }
              }}
              onClick={event => event.stopPropagation()}
              onKeyDown={event => {
                if (!(readOnly || disabled)) {
                  if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                    event.preventDefault()
                    handleChangePeriod(period === 'am' ? 'p' : 'a')
                  } else if (event.key === 'ArrowLeft') {
                    event.preventDefault()
                    refSeconds.current?.focus()
                  }
                }
              }}
              placeholder={placeholder.period ?? 'AM'}
              readOnly={readOnly}
              ref={refPeriod}
              role="spinbutton"
              value={period?.toUpperCase()}
            />
          ) : null}
        </Stack>
        {error || clearable ? (
          <Stack alignItems="center" direction="row" gap="1">
            {error ? <AlertCircleIcon sentiment="danger" /> : null}
            {clearable ? (
              <Button
                aria-label="clear value"
                data-testid="clear"
                disabled={disabled || readOnly}
                onClick={event => {
                  event.stopPropagation()
                  setTime(undefined)
                  onChange?.(undefined)
                }}
                sentiment="neutral"
                size="small"
                variant="ghost"
              >
                <CloseIcon />
              </Button>
            ) : null}
          </Stack>
        ) : null}
      </Stack>
      {helper || error ? (
        <Text
          as="p"
          disabled={disabled}
          prominence={error ? 'default' : 'weak'}
          sentiment={error ? 'danger' : 'neutral'}
          variant="caption"
        >
          {error || helper}
        </Text>
      ) : null}
    </Stack>
  )
}
