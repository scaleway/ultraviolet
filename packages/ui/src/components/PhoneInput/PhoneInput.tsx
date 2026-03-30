'use client'

import { cn, phoneUtils } from '@ultraviolet/utils'
import { useImperativeHandle, useId, useRef, useState } from 'react'
import type { ChangeEvent, ComponentType, InputHTMLAttributes, Ref } from 'react'
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
    | 'aria-atomic'
    | 'aria-label'
    | 'aria-labelledby'
    | 'aria-describedby'
    | 'aria-live'
    | 'disabled'
    | 'id'
    | 'onBlur'
    | 'onFocus'
    | 'placeholder'
    | 'role'
    | 'name'
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

export const PhoneInput: PhoneInputType = ({
  'data-testid': dataTestId,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  'aria-label': ariaLabel,
  'aria-live': ariaLive,
  'aria-atomic': ariaAtomic,
  className,
  defaultCountry = 'FR',
  disableAutoFormat = false,
  disabled = false,
  error: customError,
  id,
  label = 'Phone',
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
  ref,
  role,
  required,
  value,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => inputRef.current!, [inputRef])

  const [countryFlag, setCountryFlag] = useState(defaultCountry)

  const formatNumber = ({ inputValue }: { inputValue: string }) => {
    try {
      const parsed = phoneUtils.parsePhoneNumber(inputValue)
      const country = parsed.regionCode
      let phoneNumber = inputValue

      if (country) {
        setCountryFlag(country)
      } else {
        setCountryFlag(defaultCountry)
        if (phoneNumber.length === 10) {
          phoneNumber = `+33${phoneNumber}`
        }
      }

      const isValid =
        phoneNumber.length > 4 && phoneUtils.parsePhoneNumber(phoneNumber, { regionCode: countryFlag }).valid

      const formattedNumber = isValid
        ? phoneUtils.parsePhoneNumber(phoneNumber, { regionCode: countryFlag }).number?.international
        : phoneNumber

      const e164 = isValid ? phoneUtils.parsePhoneNumber(phoneNumber, { regionCode: countryFlag }).number?.e164 : null

      const result = {
        inputValue,
        formatted: formattedNumber ?? inputValue,
        country: country ?? countryFlag,
        valid: isValid,
        e164: e164 ?? null,
        international: formattedNumber ?? null,
      }

      onValueChange?.(result)

      if (disableAutoFormat) {
        return inputValue
      }

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
  }

  const localId = id || `phone-${name}`
  const helperId = useId()

  return (
    <Stack aria-atomic={ariaAtomic} aria-live={ariaLive} className={className} gap={0.5} role={role}>
      {label ? (
        <Label htmlFor={id ?? localId} id={ariaLabelledBy} required={required} size={size}>
          {label}
        </Label>
      ) : null}
      <Tooltip text={tooltip}>
        <div
          aria-disabled={disabled}
          className={cn(className, phoneInputStyle.inputWrapper, phoneInputStyle.inputWrapperSizes[size])}
          data-disabled={disabled}
          data-error={!!customError}
        >
          <Stack alignItems="center" className={phoneInputStyle.flag}>
            {phoneUtils.getPhoneCountryFlag(countryFlag)}
          </Stack>
          <input
            aria-invalid={!!error}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedBy || (hasHelperText(helper, error, success) ? helperId : undefined)}
            aria-labelledby={ariaLabelledBy}
            className={phoneInputStyle.input}
            data-testid={dataTestId}
            data-size={size}
            disabled={disabled}
            id={localId}
            maxLength={20}
            name={name}
            onBlur={onBlur}
            onChange={event => {
              if (inputRef.current) {
                inputRef.current.value =
                  formatNumber({
                    inputValue: inputRef.current.value,
                  }) ?? ''
              }
              onChange?.(event)
            }}
            onFocus={onFocus}
            placeholder={placeholder ?? phoneUtils.getPhoneExample(countryFlag, 'mobile').number?.international}
            ref={inputRef}
            type="tel"
            value={value}
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
}
