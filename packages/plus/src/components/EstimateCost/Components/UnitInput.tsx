import styled from '@emotion/styled'
import { SelectInput, Stack, TextInput } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'

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
      border-color: ${({ theme }) => theme.colors.primary.borderWeak};
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
    border-color: ${({ theme }) => theme.colors.primary.borderWeak};
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
  onChangeUnitValue: (value: UnitInputValue['unit']) => void
  options: SelectOption[]
  placeholder?: string
  selectInputWidth?: number
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
  onChangeUnitValue,
  value,
  unitValue,
  textBoxWidth = 100,
  selectInputWidth = 200,
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
  <Stack direction="row" data-testid={dataTestId}>
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
        const numericValue = input ? parseInt(input, 10) : minValue
        onChange(numericValue)
      }}
      className={className}
      disabled={disabled}
      notice={notice}
      label={label}
      error={valueError}
    />
    <CustomSelectInput
      width={selectInputWidth}
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
  </Stack>
)
