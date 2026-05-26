'use client'

import { parsePhoneNumber, getPhoneCountryFlag, getPhoneExample } from '@scaleway/phonenumber'
import { cn } from '@ultraviolet/utils'
import { useImperativeHandle, useId, useRef, useState, useEffect, forwardRef, useCallback } from 'react'
import type { ChangeEvent, ComponentType, InputHTMLAttributes, ForwardedRef, Ref } from 'react'
import { hasHelperText } from '../../helpers/hasHelperText'
import { Description } from '../Description'
import type { DescriptionProps } from '../Description'
import { Label } from '../Label'
import { Stack } from '../Stack'
import { Tooltip } from '../Tooltip'
import { phoneInputStyle } from './styles.css'

type PhoneInputLabelProps = {
  disabled?: boolean
  error?: string
  ref?: Ref<HTMLInputElement>
}

type InputProps = Partial<
  Pick<
    InputHTMLAttributes<HTMLInputElement>,
    | 'aria-label'
    | 'aria-labelledby'
    | 'aria-live'
    | 'aria-describedby'
    | 'disabled'
    | 'id'
    | 'name'
    | 'onBlur'
    | 'onFocus'
    | 'placeholder'
    | 'readOnly'
  >
> &
  Partial<DescriptionProps>

type PhoneInputProps = PhoneInputLabelProps & {
  'data-testid'?: string | null
  value?: string
  label?: string
  required?: boolean
  tooltip?: string
  className?: string
  defaultCountry?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  error?: string
  onParsingError?: ({ error, inputValue }: { error: Error; inputValue: string }) => void
  disableAutoFormat?: boolean
  onValueChange?: (value: {
    inputValue: string
    formatted: string
    country: string | null
    valid: boolean
    e164: string | null
    international: string | null
  }) => void
} & InputProps

type PhoneInputType = ComponentType<PhoneInputProps>

export const PhoneInput: PhoneInputType = forwardRef(
  (
    {
      'data-testid': dataTestId,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      'aria-label': ariaLabel,
      className,
      defaultCountry = 'FR',
      disableAutoFormat = false,
      disabled = false,
      error: customError,
      id,
      label,
      success,
      error,
      helper,
      tooltip,
      name,
      size = 'large',
      onBlur,
      onChange,
      onFocus,
      onParsingError,
      onValueChange,
      placeholder,
      readOnly,
      required,
      value,
    },
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const localRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(ref, () => localRef.current!)
    const [countryFlag, setCountryFlag] = useState(defaultCountry)

    const formatPhoneNumber = useCallback(
      ({ inputValue }: { inputValue: string }) => {
        if (disableAutoFormat) {
          return inputValue
        }

        try {
          const parsed = parsePhoneNumber(inputValue)
          const { regionCode = defaultCountry } = parsed
          const { valid, number } = parsePhoneNumber(inputValue, { regionCode })

          const isValid = inputValue.length > 4 && valid

          const formattedNumber = isValid ? number?.international : inputValue

          const result = {
            inputValue,
            formatted: isValid ? number?.international : inputValue,
            country: regionCode,
            valid: isValid,
            e164: isValid ? number?.e164 : null,
            international: formattedNumber ?? null,
          }
          onValueChange?.(result)
          setCountryFlag(regionCode)

          return formattedNumber
          // oxlint-disable-next-line eslint/no-shadow
        } catch (error: unknown) {
          if (error instanceof Error) {
            onParsingError?.({
              error,
              inputValue,
            })
          }

          return inputValue
        }
      },
      [onParsingError, disableAutoFormat, onValueChange, defaultCountry],
    )

    const handleOnChangeCallback = useCallback(
      (inputValue: string) => {
        if (localRef.current) {
          localRef.current.value =
            formatPhoneNumber({
              inputValue,
            }) ?? ''
        }
      },
      [formatPhoneNumber],
    )

    useEffect(() => {
      if (value) {
        handleOnChangeCallback(value)
      }
    }, [handleOnChangeCallback, value])

    const uniqueId = useId()
    const helperId = useId()
    const localId = id || `phone-${uniqueId}`

    return (
      <Stack className={className} gap={0.5}>
        {label ? (
          <Label htmlFor={localId} required={required} size={size}>
            {label}
          </Label>
        ) : null}
        <Tooltip text={tooltip}>
          <div
            className={cn(className, phoneInputStyle.inputWrapper, phoneInputStyle.inputWrapperSizes[size])}
            data-disabled={disabled}
            data-readonly={readOnly}
            data-success={readOnly}
            data-error={!!customError}
          >
            <Stack alignItems="center" className={phoneInputStyle.flag} data-disabled={disabled}>
              {getPhoneCountryFlag(countryFlag)}
            </Stack>
            <input
              aria-invalid={!!error}
              aria-label={label ? undefined : ariaLabel}
              aria-describedby={ariaDescribedBy || (hasHelperText(helper, error, success) ? helperId : undefined)}
              aria-labelledby={ariaLabelledBy}
              className={phoneInputStyle.input}
              data-testid={dataTestId}
              data-size={size}
              disabled={disabled}
              required={required}
              readOnly={readOnly}
              id={localId}
              maxLength={20}
              name={name}
              onBlur={onBlur}
              onChange={event => {
                if (localRef.current) {
                  handleOnChangeCallback(localRef.current.value)
                }
                onChange?.(event)
              }}
              onFocus={onFocus}
              placeholder={placeholder ?? getPhoneExample(countryFlag, 'mobile').number?.international}
              ref={localRef}
              type="tel"
              value={localRef.current?.value}
            />
          </div>
        </Tooltip>
        <Description
          helper={helper}
          error={error}
          success={success}
          size={size}
          disabled={disabled}
          id={ariaDescribedBy ?? helperId}
        />
      </Stack>
    )
  },
)
