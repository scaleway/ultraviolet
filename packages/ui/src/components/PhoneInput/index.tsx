'use client'

import { cn } from '@ultraviolet/utils'
import { getExample, parsePhoneNumber } from 'awesome-phonenumber'
import { useImperativeHandle, useRef, useState } from 'react'

import { Expandable } from '../Expandable'
import { Text } from '../Text'

import { getCountryFlag } from './helpers'
import { phoneInputStyle } from './styles.css'

import type {
  ChangeEvent,
  ComponentType,
  InputHTMLAttributes,
  Ref,
} from 'react'

type PhoneInputLabelProps = {
  disabled?: boolean
  error?: string
  ref?: Ref<HTMLInputElement>
}

type InputProps = Partial<
  Pick<
    InputHTMLAttributes<HTMLInputElement>,
    'id' | 'placeholder' | 'onBlur' | 'onFocus'
  >
> & {
  name: string
  'data-testid'?: string | null
}

type PhoneInputProps = PhoneInputLabelProps & {
  value?: string
  label?: string
  required?: boolean
  className?: string
  defaultCountry?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  error?: string
  onParsingError?: ({
    error,
    inputValue,
  }: {
    error: Error
    inputValue: string
  }) => void
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
  disabled = false,
  name,
  id,
  placeholder,
  defaultCountry = 'FR',
  'data-testid': dataTestId,
  onBlur,
  onChange,
  onFocus,
  error: customError,
  required,
  value,
  className,
  label = 'Phone',
  onParsingError,
  ref,
  disableAutoFormat = false,
  onValueChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => inputRef.current!, [inputRef])

  const [countryFlag, setCountryFlag] = useState(defaultCountry)

  const formatNumber = ({ inputValue }: { inputValue: string }) => {
    try {
      const parsed = parsePhoneNumber(inputValue)
      const country = parsed.regionCode
      let phoneNumber = inputValue

      if (!country) {
        setCountryFlag(defaultCountry)
        if (phoneNumber.length === 10) {
          phoneNumber = `+33${phoneNumber}`
        }
      } else {
        setCountryFlag(country)
      }

      const isValid =
        phoneNumber.length > 4 &&
        parsePhoneNumber(phoneNumber, { regionCode: countryFlag }).valid

      const formattedNumber = isValid
        ? parsePhoneNumber(phoneNumber, { regionCode: countryFlag }).number
            ?.international
        : phoneNumber

      const e164 = isValid
        ? parsePhoneNumber(phoneNumber, { regionCode: countryFlag }).number
            ?.e164
        : null

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

  return (
    <div>
      <label
        aria-disabled={disabled}
        className={cn(className, phoneInputStyle.label)}
        data-disabled={disabled}
        data-error={!!customError}
        htmlFor={localId}
      >
        <span className={phoneInputStyle.span}>{label}</span>
        <div className={phoneInputStyle.flag}>
          {getCountryFlag(countryFlag)}
        </div>
        <input
          className={phoneInputStyle.input}
          data-testid={dataTestId}
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
          placeholder={
            placeholder ??
            getExample(countryFlag, 'mobile').number?.international
          }
          ref={inputRef}
          type="tel"
          value={value}
        />
        {required ? (
          <Text
            as="span"
            className={phoneInputStyle.text}
            sentiment="danger"
            variant="bodyStrong"
          >
            *
          </Text>
        ) : null}
      </label>
      <Expandable opened={!!customError}>
        <Text
          as="p"
          className={phoneInputStyle.error}
          sentiment="danger"
          variant="caption"
        >
          {customError}
        </Text>
      </Expandable>
    </div>
  )
}
