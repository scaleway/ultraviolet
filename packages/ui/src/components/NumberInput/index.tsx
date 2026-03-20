'use client'

import type { ForwardedRef, InputHTMLAttributes, ReactNode } from 'react'
import { forwardRef, useId, useImperativeHandle, useMemo, useRef } from 'react'
import { Label } from '../Label'
import { Row } from '../Row'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'
import { Controls } from './components/Controls'
import { Unit } from './components/Unit'
import type { SIZES } from './constant'
import { numberInputStyle } from './styles.css'

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
    useImperativeHandle(ref, () => localRef.current!)

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
    const isDisabledOrReadOnly = disabled || readOnly

    return (
      <Stack className={className} gap="0.5">
        {label || labelDescription ? (
          <Label
            htmlFor={localId}
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
              className={numberInputStyle.container({
                size,
                state: computedState,
              })}
              data-controls={controls}
              data-disabled={disabled}
              data-error={!!error}
              data-readonly={readOnly}
              data-size={size}
              data-success={!!success}
              data-unit={!!unit}
            >
              <Controls
                controls={controls}
                direction="down"
                isDisabledOrReadOnly={isDisabledOrReadOnly}
                localRef={localRef}
                max={max}
                min={min}
                onChange={onChange}
                size={size}
              />
              <Row
                alignItems="center"
                className={numberInputStyle.inputContainer({ controls })}
                justifyContent="space-between"
                templateColumns="1fr auto"
              >
                <input
                  aria-label={ariaLabel}
                  autoFocus={autoFocus} // oxlint-disable-line jsx_a11y/no-autofocus
                  className={numberInputStyle.numberinput({
                    controls,
                    hasUnit: !!unit,
                    size,
                  })}
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
                <Unit
                  controls={controls}
                  disabled={disabled}
                  readOnly={readOnly}
                  size={size}
                  unit={unit}
                />
              </Row>
              <Controls
                controls={controls}
                direction="up"
                isDisabledOrReadOnly={isDisabledOrReadOnly}
                localRef={localRef}
                max={max}
                min={min}
                onChange={onChange}
                size={size}
              />
            </div>
          </Tooltip>
        </div>
        {error || typeof success === 'string' || typeof helper === 'string' ? (
          <Text
            as="span"
            disabled={isDisabledOrReadOnly}
            prominence={error || success ? 'default' : 'weak'}
            sentiment={helperSentiment}
            variant="caption"
          >
            {error || success || helper}
          </Text>
        ) : null}
        {!(error || success) && typeof helper !== 'string' && helper
          ? helper
          : null}
      </Stack>
    )
  },
)
