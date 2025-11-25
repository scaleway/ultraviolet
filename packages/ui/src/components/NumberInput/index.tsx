'use client'

import { MinusIcon, PlusIcon } from '@ultraviolet/icons'
import type { ForwardedRef, InputHTMLAttributes, ReactNode } from 'react'
import {
  forwardRef,
  useCallback,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react'
import { Button } from '../Button'
import { Label } from '../Label'
import { Row } from '../Row'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'
import type { SIZES } from './constant'
import {
  inputContainer,
  numberinput,
  numberinputContainer,
  numberinputSideContainer,
  unit as unitStyle,
} from './styles.css'

type Sizes = keyof typeof SIZES

type NumberInputProps = {
  size?: Sizes
  /**
   * Text displayed into component at the right of number value.
   */
  unit?: string
  tooltip?: string
  className?: string
  'data-testid'?: string
  label?: string
  /**
   * Label description displayed right next to the label. It allows you to customize the label content.
   */
  labelDescription?: ReactNode
  /**
   * Whether to show controls
   */
  controls?: boolean
  error?: string
  success?: string | boolean
  helper?: ReactNode
  value?: number | null
  onChange?: (newValue: number | null) => void
  min?: number
  max?: number
} & Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | 'onFocus'
  | 'onBlur'
  | 'name'
  | 'id'
  | 'placeholder'
  | 'aria-label'
  | 'disabled'
  | 'step'
  | 'readOnly'
  | 'required'
  | 'autoFocus'
  | 'style'
>

/**
 * NumberInput component is used to increment / decrement a number value by clicking on + / - buttons or
 * by typing into input. If the value is out of the min / max range, the input will automatically be the min / max value on blur.
 */
export const NumberInput = forwardRef(
  (
    {
      disabled = false,
      max = Number.MAX_SAFE_INTEGER,
      min = 0,
      name,
      onChange,
      onFocus,
      onBlur,
      size = 'large',
      step,
      unit,
      value,
      tooltip,
      className,
      label,
      labelDescription,
      id,
      controls = true,
      placeholder = '',
      error,
      success,
      helper,
      'aria-label': ariaLabel,
      'data-testid': dataTestId,
      required,
      autoFocus,
      readOnly,
      style,
    }: NumberInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const localRef = useRef<HTMLInputElement>(null)
    useImperativeHandle(ref, () => localRef.current as HTMLInputElement)

    const uniqueId = useId()
    const localId = id ?? uniqueId

    const computedState = useMemo(() => {
      if (disabled) {
        return 'disabled'
      }
      if (readOnly) {
        return 'readOnly'
      }
      if (error) {
        return 'error'
      }
      if (success) {
        return 'success'
      }

      return 'default'
    }, [error, success, disabled, readOnly])
    const onClickSideButton = useCallback(
      (direction: 'up' | 'down') => () => {
        if (direction === 'up') {
          localRef.current?.stepUp()
        } else if (direction === 'down') {
          localRef.current?.stepDown()
        }
        onChange?.(Number.parseFloat(localRef.current?.value ?? '') ?? min)
      },
      [localRef, min, onChange],
    )

    const isMinusDisabled = useCallback(() => {
      if (!localRef?.current?.value || localRef?.current?.value === '') {
        return false
      }

      const numericValue = Number(localRef?.current?.value)
      if (Number.isNaN(numericValue)) {
        return false
      }

      const minValue = typeof min === 'number' ? min : Number(min)

      return Number.isNaN(numericValue) || numericValue <= minValue
    }, [localRef?.current?.value, min])

    const isPlusDisabled = useCallback(() => {
      if (!localRef?.current?.value || localRef?.current?.value === '') {
        return false
      }

      const numericValue = Number(localRef?.current?.value)
      if (Number.isNaN(numericValue)) {
        return false
      }

      const maxValue = typeof max === 'number' ? max : Number(max)

      return numericValue >= maxValue
    }, [localRef?.current?.value, max])

    const helperSentiment = useMemo(() => {
      if (error) {
        return 'danger'
      }

      if (success) {
        return 'success'
      }

      return 'neutral'
    }, [error, success])

    let inputValue: string | undefined
    if (value !== undefined) {
      inputValue =
        value !== null && typeof value === 'number' ? value.toString() : ''

      if (localRef.current) {
        localRef.current.value = inputValue
      }
    }

    return (
      <Stack className={className} gap="0.5">
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
        <div>
          <Tooltip text={tooltip}>
            <div
              className={numberinputContainer({ size, state: computedState })}
              data-controls={controls}
              data-disabled={disabled}
              data-error={!!error}
              data-readonly={readOnly}
              data-size={size}
              data-success={!!success}
              data-unit={!!unit}
            >
              {controls ? (
                <Stack
                  alignItems="center"
                  className={numberinputSideContainer[size]}
                  data-size={size}
                  justifyContent="center"
                >
                  <Button
                    aria-label="minus"
                    disabled={disabled || readOnly || isMinusDisabled()}
                    onClick={onClickSideButton('down')}
                    sentiment="neutral"
                    size={size === 'small' ? 'xsmall' : 'small'}
                    variant="ghost"
                  >
                    <MinusIcon size={size === 'large' ? 'small' : 'small'} />
                  </Button>
                </Stack>
              ) : null}
              <Row
                alignItems="center"
                className={inputContainer({ controls })}
                justifyContent="space-between"
                templateColumns="1fr auto"
              >
                <input
                  aria-label={ariaLabel}
                  autoFocus={autoFocus}
                  className={numberinput({ controls, hasUnit: !!unit, size })}
                  data-testid={dataTestId}
                  disabled={disabled}
                  id={localId}
                  max={max}
                  min={min}
                  name={name}
                  onBlur={event => {
                    if (value && value > max) {
                      onChange?.(max)
                    } else if (value && value < min) {
                      onChange?.(min)
                    }
                    onBlur?.(event)
                  }}
                  onChange={
                    onChange
                      ? event => {
                          const newNumber = Number.parseFloat(
                            event.target.value,
                          )
                          onChange(Number.isNaN(newNumber) ? null : newNumber)
                        }
                      : undefined
                  }
                  onFocus={onFocus}
                  placeholder={placeholder}
                  readOnly={readOnly}
                  ref={localRef}
                  required={required}
                  step={step}
                  style={style}
                  type="number"
                  value={inputValue}
                />
                {unit ? (
                  <Text
                    as="span"
                    className={unitStyle({ disabled, readOnly, size })}
                    disabled={disabled}
                    sentiment="neutral"
                    variant="body"
                  >
                    {unit}
                  </Text>
                ) : null}
              </Row>
              {controls ? (
                <Stack
                  alignItems="center"
                  className={numberinputSideContainer[size]}
                  data-size={size}
                  justifyContent="center"
                >
                  <Button
                    aria-label="plus"
                    disabled={disabled || readOnly || isPlusDisabled()}
                    onClick={onClickSideButton('up')}
                    sentiment="neutral"
                    size={size === 'small' ? 'xsmall' : 'small'}
                    variant="ghost"
                  >
                    <PlusIcon size={size === 'large' ? 'small' : 'small'} />
                  </Button>
                </Stack>
              ) : null}
            </div>
          </Tooltip>
        </div>
        {error || typeof success === 'string' || typeof helper === 'string' ? (
          <Text
            as="span"
            disabled={disabled || readOnly}
            prominence={!error && !success ? 'weak' : 'default'}
            sentiment={helperSentiment}
            variant="caption"
          >
            {error || success || helper}
          </Text>
        ) : null}
        {!error && !success && typeof helper !== 'string' && helper
          ? helper
          : null}
      </Stack>
    )
  },
)
