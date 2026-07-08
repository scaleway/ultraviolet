'use client'

import { isNullOrUndefined } from '@ultraviolet/utils'
import { forwardRef, useId, useImperativeHandle, useMemo, useRef } from 'react'
import type { ForwardedRef } from 'react'
import { hasHelperText } from '../../helpers/hasHelperText'
import { Description } from '../Description'
import { Label } from '../Label'
import { Row } from '../Row'
import { Stack } from '../Stack'
import { Tooltip } from '../Tooltip'
import { Controls } from './components/Controls'
import { Unit } from './components/Unit'
import type { NumberInputProps } from './types'
import { numberInputStyle } from './styles.css'

const getValueAsNumber = (input: HTMLInputElement) => {
  const isEmpty = input.value === '' && !input.validity.badInput
  return isEmpty ? null : input.valueAsNumber
}

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
      'aria-describedby': ariaDescribedBy,
      required,
      autoFocus,
      readOnly,
      style,
    }: NumberInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const localRef = useRef<HTMLInputElement>(null)

    /**
     * Expose a custom ref for react-hook-form which reads the `value` prop of the native input when using the `register` function.
     * We return a modified `value` to differentiate empty (null) from invalid (NaN), like we do in the `onChange` callback.
     */
    useImperativeHandle(ref, () => {
      if (!localRef.current) return null!

      return new Proxy(localRef.current, {
        get(target, prop: keyof HTMLInputElement) {
          if (prop === 'value') {
            return getValueAsNumber(target)
          }

          const value = Reflect.get(target, prop)
          return typeof value === 'function' ? value.bind(target) : value
        },
        set(target, prop, newValue) {
          if (prop === 'value' && Number.isNaN(newValue)) {
            // do nothing otherwise the input is emptied when typing an invalid number like "1-"
            return true
          }
          return Reflect.set(target, prop, newValue)
        },
      })
    })
    const uniqueId = useId()
    const helperId = useId()
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

    const isDisabledOrReadOnly = disabled || readOnly

    return (
      <Stack className={className} gap="0.5">
        {label || labelDescription ? (
          <Label htmlFor={localId} labelDescription={labelDescription} required={required} size={size}>
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
                  aria-describedby={ariaDescribedBy || (hasHelperText(helper, error, success) ? helperId : undefined)}
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
                  inputMode={Number.isInteger(step) ? 'numeric' : 'decimal'}
                  onBlur={event => {
                    const { valueAsNumber } = event.target
                    if (valueAsNumber && localRef.current) {
                      if (!isNullOrUndefined(max) && valueAsNumber > max) {
                        localRef.current.valueAsNumber = max
                      }
                      if (!isNullOrUndefined(min) && valueAsNumber < min) {
                        localRef.current.valueAsNumber = min
                      }
                      localRef.current.dispatchEvent(new Event('input', { bubbles: true, cancelable: false }))
                    }

                    onBlur?.(event)
                  }}
                  onChange={
                    onChange
                      ? event => {
                          onChange(getValueAsNumber(event.target))
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
                  value={value === null || Number.isNaN(value) ? '' : value}
                />
                <Unit controls={controls} disabled={disabled} readOnly={readOnly} size={size} unit={unit} />
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
        <Description
          error={error}
          helper={helper}
          disabled={isDisabledOrReadOnly}
          success={success}
          id={ariaDescribedBy ?? helperId}
        />
      </Stack>
    )
  },
)

NumberInput.displayName = 'NumberInput'
