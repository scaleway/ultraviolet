'use client'

import styled from '@emotion/styled'
import { Row, SelectInput, TextInput } from '@ultraviolet/ui'
import type { ComponentProps, FocusEvent } from 'react'

type SelectOption = Exclude<
  NonNullable<ComponentProps<typeof SelectInput>['value']>,
  string
>

export const sizesHeight: Record<string, number> = {
  large: 48,
  medium: 40,
  small: 32,
}

const CustomTextInput = styled(TextInput)`
  input {
    border-radius: ${({ theme }) => theme.radii.default} 0 0
      ${({ theme }) => theme.radii.default};
    min-width: 60px;
    border-right: 0;

    &:hover,
    &:focus {
      text-decoration: none;
      border-right-width: 1px;
      border-right-style: solid;
      border-color: ${({ theme }) => theme.colors.primary.border};
    }
  }

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */

  input[type='number'] {
    -moz-appearance: textfield;
  }
`

const CustomSelectInput = styled(SelectInput)<{
  width?: number
  height?: number
}>`
  ${({ width }) => width && `width: ${width}px;`}
  ${({ height }) => height && `height: ${height}px;`}
  &:hover,
  &:focus {
    text-decoration: none;
    border-color: ${({ theme }) => theme.colors.primary.border};
    box-shadow: none;
  }
`

const customSelectStyle = (height: number) => () => ({
  control: {
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    boxShadow: 'none',
    height,
    minHeight: height,
  },
  singleValue: {
    marginTop: 0,
  },
})

type UnitInputValue = { inputValue: number; unit: SelectOption['value'] }

type UnitInputProps = {
  className?: string
  name: string
  disabled?: boolean
  maxValue?: number
  minValue?: number
  value?: UnitInputValue['inputValue']
  unitValue?: UnitInputValue['unit']
  onChange: (value: UnitInputValue['inputValue']) => void
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void
  onChangeUnitValue: (value: UnitInputValue['unit']) => void
  options: SelectOption[]
  placeholder?: string
  size?: string
  textBoxWidth?: string | number
  'data-testid'?: string
  notice?: ComponentProps<typeof TextInput>['notice']
  label?: ComponentProps<typeof TextInput>['label']
  required?: boolean
  valueError?: string
  unitError?: string
  type?: ComponentProps<typeof TextInput>['type']
}

export const UnitInput = ({
  name = '',
  maxValue = 99999,
  minValue = 1,
  size = 'medium',
  placeholder = '0',
  onChange,
  onBlur,
  onChangeUnitValue,
  value,
  unitValue,
  textBoxWidth = 100,
  disabled = false,
  options,
  className,
  notice,
  label,
  required,
  valueError,
  unitError,
  type = 'number',
  'data-testid': dataTestId,
}: UnitInputProps) => (
  <Row templateColumns="1fr auto" data-testid={dataTestId}>
    <CustomTextInput
      height={sizesHeight[size]}
      width={textBoxWidth}
      type={type}
      name={`${name}-value`}
      max={maxValue}
      min={minValue}
      required={required}
      value={value}
      placeholder={placeholder}
      onChange={input => {
        const numericValue = Number.parseInt(input, 10)
        onChange(numericValue)
      }}
      onBlur={(event: FocusEvent<HTMLInputElement>) => {
        const numericValue = Number.parseInt(event.target.value, 10)
        if (Number.isNaN(numericValue) || numericValue < minValue) {
          onChange(minValue)
        }

        if (numericValue > maxValue) {
          onChange(maxValue)
        }

        onBlur?.(event)
      }}
      className={className}
      disabled={disabled}
      notice={notice}
      label={label}
      error={valueError}
    />
    <CustomSelectInput
      noTopLabel
      height={sizesHeight[size]}
      id={`${name}-unit`}
      name={`${name}-unit`}
      onChange={newValue => {
        onChangeUnitValue((newValue as SelectOption).value)
      }}
      error={unitError}
      value={options.find(option => option.value === unitValue) || options[0]}
      options={options}
      customStyle={customSelectStyle(sizesHeight[size])}
      disabled={disabled || options.length === 1}
    />
  </Row>
)
