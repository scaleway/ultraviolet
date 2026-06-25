'use client'

import { isNullOrUndefined } from '@ultraviolet/utils'
import { forwardRef, useId, useImperativeHandle, useMemo, useRef } from 'react'
import type { ForwardedRef, InputHTMLAttributes, ReactNode } from 'react'
import { hasHelperText } from '../../helpers/hasHelperText'
import { Description } from '../Description'
import { Label } from '../Label'
import { Row } from '../Row'
import { Stack } from '../Stack'
import { Tooltip } from '../Tooltip'
import { Controls } from './components/Controls'
import { Unit } from './components/Unit'
import type { SIZES } from './constant'
import { numberInputStyle } from './styles.css'

type Sizes = keyof typeof SIZES

export type NumberInputProps = {
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
  error?: string | boolean
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
  | 'aria-describedby'
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
      'aria-describedby': ariaDescribedBy,
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
                    if (valueAsNumber) {
                      if (!isNullOrUndefined(max) && valueAsNumber > max) {
                        onChange?.(max)
                      }
                      if (!isNullOrUndefined(min) && valueAsNumber < min) {
                        onChange?.(min)
                      }
                    }
                    onBlur?.(event)
                  }}
                  onChange={
                    // onChange is not triggered with a string when type=number, so you can't validate "string" value.
                    //
                    // ⚠️  LIMITATION: Scientific notation (e.g., "1e2") cannot be typed character-by-character
                    // because browsers block the 'e' character in number inputs. When a user tries to type "1e2":
                    // - Typing "1" works fine
                    // - Typing "e" is blocked by the browser and the value stays at "1"
                    // - The user can never complete "1e2" by typing
                    //
                    // Workarounds:
                    // - Pasting "1e2" works correctly (Number.parseFloat handles scientific notation)
                    // - Programmatic value setting works (e.g., form.setValue('field', 1e2))
                    //
                    onChange
                      ? event => {
                          const { target } = event
                          const isNan = Number.isNaN(target.valueAsNumber)
                          if (isNan) {
                            onChange(null)
                          } else {
                            onChange(target.valueAsNumber)
                          }
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
                  value={value?.toString()}
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
