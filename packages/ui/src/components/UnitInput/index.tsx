'use client'

import { AlertCircleIcon, CheckCircleIcon } from '@ultraviolet/icons'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import type {
  ComponentProps,
  CSSProperties,
  InputHTMLAttributes,
  ReactNode,
} from 'react'
import { useEffect, useId, useMemo, useState } from 'react'
import { cn } from '../../utils'
import { Label } from '../Label'
import { Row } from '../Row'
import { SelectInput } from '../SelectInput'
import type { OptionType } from '../SelectInput/types'
import { Stack } from '../Stack'
import { Text } from '../Text'
import {
  unitInputNumber,
  unitInputNumberWrapper,
  unitInputSize,
  unitInputState,
  unitInputUnit,
  unitInputUnitWidth,
  widthSelectInput,
} from './styles.css'

type UnitInputValue = { inputValue: number; unit: string }

type UnitInputProps = {
  className?: string
  max?: number
  min?: number
  value?: UnitInputValue['inputValue']
  unitValue?: UnitInputValue['unit']
  onChange?: (value: UnitInputValue['inputValue']) => void
  onChangeUnitValue?: (values: string) => void
  options: OptionType[]
  selectInputWidth?: number | string
  size?: 'small' | 'medium' | 'large'
  'data-testid'?: string
  helper?: string
  unitError?: string
  width?: CSSProperties['width']
  maxWidth?: CSSProperties['maxWidth']
  placeholderUnit?: string
  error?: boolean | string
  success?: boolean | string
  label?: string
  labelInformation?: ReactNode
  step?: number | string
  dropdownAlign?: ComponentProps<typeof SelectInput>['dropdownAlign']
  templateColumns?: ComponentProps<typeof Row>['templateColumns']
} & Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | 'onFocus'
  | 'onBlur'
  | 'name'
  | 'id'
  | 'placeholder'
  | 'disabled'
  | 'readOnly'
  | 'required'
  | 'autoFocus'
  | 'onKeyDown'
  | 'style'
>

export const UnitInput = ({
  id,
  name = '',
  max = Number.MAX_SAFE_INTEGER,
  min = 0,
  autoFocus = false,
  size = 'large',
  placeholder = '0',
  placeholderUnit = 'Select item',
  onChange,
  onChangeUnitValue,
  value,
  unitValue,
  selectInputWidth = '12.6rem',
  disabled = false,
  options,
  className,
  label,
  step = 1,
  error,
  required,
  helper,
  unitError,
  success,
  'data-testid': dataTestId,
  width,
  maxWidth,
  labelInformation,
  readOnly,
  onFocus,
  onBlur,
  onKeyDown,
  dropdownAlign,
  templateColumns,
  style,
}: UnitInputProps) => {
  const [val, setVal] = useState(value)
  const localId = useId()
  const sentiment = useMemo(() => {
    if (error) {
      return 'danger'
    }
    if (success) {
      return 'success'
    }

    return 'neutral'
  }, [error, success])
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
  }, [disabled, readOnly, success, error])

  useEffect(() => {
    if (value !== undefined) {
      setVal(value)
    }
  }, [value])

  return (
    <Stack
      gap={0.5}
      maxWidth={maxWidth}
      onBlur={onBlur}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      width={width}
    >
      {label || labelInformation ? (
        <Label
          htmlFor={id ?? localId}
          labelDescription={labelInformation}
          required={required}
          size={size}
        >
          {label}
        </Label>
      ) : null}
      <Row
        className={`${unitInputSize[size]} ${unitInputState[computedState]}`}
        data-disabled={!!disabled}
        data-testid={dataTestId}
        templateColumns={templateColumns ?? '1fr auto'}
      >
        <div className={unitInputNumberWrapper} id="input-field">
          <input
            aria-invalid={!!error}
            autoFocus={autoFocus}
            className={cn(className, unitInputNumber[size])}
            data-testid="unit-input"
            disabled={disabled}
            id={id ?? localId}
            max={max}
            min={min}
            name={`${name}-value`}
            onChange={event => {
              const numericValue = Number.parseInt(event.target.value, 10)
              if (numericValue > max) {
                setVal(max)
                onChange?.(max)
              } else if (numericValue < min) {
                setVal(min)
                onChange?.(min)
              } else {
                setVal(numericValue)
                onChange?.(numericValue)
              }
            }}
            placeholder={placeholder}
            readOnly={readOnly}
            required={required}
            step={step}
            style={style}
            type="number"
            value={val}
          />
          {error ? <AlertCircleIcon sentiment="danger" /> : null}
          {success && !error ? <CheckCircleIcon sentiment="success" /> : null}
        </div>
        <SelectInput
          className={`${unitInputUnit} ${unitInputUnitWidth}`}
          clearable={false}
          data-disabled={disabled}
          disabled={disabled}
          dropdownAlign={dropdownAlign}
          error={unitError}
          id="unit"
          multiselect={false}
          name={`${name}-unit`}
          onChange={(newValue: string) => {
            onChangeUnitValue?.(newValue)
          }}
          options={options}
          placeholder={placeholderUnit}
          readOnly={readOnly}
          searchable={false}
          size={size}
          style={assignInlineVars({
            [widthSelectInput]: selectInputWidth.toString(),
          })}
          value={unitValue}
        />
      </Row>
      {error || typeof success === 'string' || typeof helper === 'string' ? (
        <Text
          as="p"
          disabled={disabled}
          prominence={sentiment === 'neutral' ? 'weak' : 'default'}
          sentiment={sentiment}
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
}
