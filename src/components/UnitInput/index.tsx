import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { FunctionComponent, useEffect, useState } from 'react'
import RichSelect, {
  RichSelectProps,
  SelectOption,
  WithSelectProps,
} from '../RichSelect'
import TextBox from '../TextBox'

export const sizesHeight: Record<string, string> = {
  large: '48px',
  medium: '40px',
  small: '32px',
}

const CustomTextBox = styled(TextBox)`
  input {
    border-radius: 4px 0 0 4px;
    border-right: 0;

    &:hover,
    &:focus {
      text-decoration: none;
      border-color: ${({ theme }) => theme.colors.primary};
      border-right: 1px solid ${({ theme }) => theme.colors.primary};
      z-index: 1;
      padding-right: 7px; // so it doesn't move rich select
    }
  }
`

const CustomRichSelect = styled(RichSelect)`
  &:hover,
  &:focus {
    text-decoration: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: none;
  }
`

const customSelectStyle = (state: WithSelectProps) => ({
  control: {
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    boxShadow: 'none',
    height: state?.selectProps?.height,
    minHeight: state?.selectProps?.height,
  },
  singleValue: {
    marginTop: 0,
  },
})

const defaultOptionValues: SelectOption[] = [
  {
    label: 'Hours',
    value: 'hours',
  },
  {
    label: 'Weeks',
    value: 'weeks',
  },
  {
    label: 'Months',
    value: 'months',
  },
  {
    label: 'Years',
    value: 'years',
  },
]

type UnitInputValue = {
  unit: string
  value: number
}

export type UnitInputProps = Omit<Partial<RichSelectProps>, 'defaultValue'> & {
  name?: string
  defaultValue?: number
  disabled?: boolean
  maxValue?: number
  minValue?: number
  onChange?: (value: UnitInputValue) => void
  options?: SelectOption[]
  placeholder?: string
  richSelectWidth?: number
  size?: string
  textBoxWidth?: number
  defaultOption?: SelectOption
}

const UnitInput: FunctionComponent<UnitInputProps> = ({
  name = '',
  maxValue = 99999,
  minValue = 1,
  defaultValue = 1,
  size = 'medium',
  placeholder = '0',
  onChange,
  textBoxWidth = 100,
  richSelectWidth = 200,
  disabled = false,
  options = defaultOptionValues,
  defaultOption,
}) => {
  const [value, setValue] = useState({
    unit: defaultOption?.value || options?.[0]?.value,
    value: defaultValue,
  })
  useEffect(() => onChange?.(value), [onChange, value])

  return (
    <div style={{ display: 'flex' }}>
      <CustomTextBox
        height={sizesHeight[size]}
        width={textBoxWidth}
        type="number"
        name={`${name}-value`}
        value={value.value < maxValue ? value.value : maxValue}
        placeholder={placeholder}
        onChange={(event: string) => {
          const numericValue = Number(event)
          setValue(current => ({
            ...current,
            value: numericValue < minValue ? minValue : numericValue,
          }))
        }}
        disabled={disabled}
      />
      <CustomRichSelect
        width={richSelectWidth}
        noTopLabel
        height={sizesHeight[size]}
        id={`${name}-unit`}
        name={`${name}-unit`}
        onChange={unitValue => {
          setValue(current => ({
            ...current,
            unit: (unitValue as SelectOption).value,
          }))
        }}
        value={options.find(option => option.value === value.unit)}
        options={options}
        customStyle={customSelectStyle}
        disabled={disabled}
      />
    </div>
  )
}

UnitInput.propTypes = {
  /**
   * The default selected option in the RichSelect
   */
  defaultOption: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }),
  /**
   * The default value in the TextInput
   */
  defaultValue: PropTypes.number,
  disabled: PropTypes.bool,
  maxValue: PropTypes.number,
  minValue: PropTypes.number,
  name: PropTypes.string.isRequired,
  /**
   * @param {{value, unit}} currentValue The value containing the unit select and the value in the TextInput
   */
  onChange: PropTypes.func,
  /**
   * Possible RichSelect options
   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
  ),
  placeholder: PropTypes.string,
  richSelectWidth: PropTypes.number,
  size: PropTypes.oneOf(Object.keys(sizesHeight)),
  textBoxWidth: PropTypes.number,
}

export default UnitInput
