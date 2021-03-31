import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { RichSelect } from '../RichSelect'
import { TextBox } from '../TextBox'

export const sizesHeight = {
  small: '32px',
  medium: '40px',
  large: '48px',
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

const customSelectStyle = state => ({
  control: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    minHeight: state?.selectProps?.height,
    height: state?.selectProps?.height,
    boxShadow: 'none',
  },
  singleValue: {
    marginTop: 0,
  },
})

const UnitInput = ({
  name,
  maxValue,
  minValue,
  defaultValue,
  size,
  placeholder,
  onChange,
  textBoxWidth,
  richSelectWidth,
  disabled,
  options,
  defaultOption,
}) => {
  const [value, setValue] = useState({
    unit: defaultOption?.value || options?.[0]?.value,
    value: defaultValue.toString(),
  })
  useEffect(() => onChange(value), [onChange, value])

  return (
    <div style={{ display: 'flex' }}>
      <CustomTextBox
        height={sizesHeight[size]}
        width={textBoxWidth}
        type="number"
        name={`${name}-value`}
        value={value?.value < maxValue ? value.value : maxValue}
        placeholder={placeholder}
        onChange={textValue => {
          setValue(current => ({
            ...current,
            value: textValue < minValue ? minValue.toString() : textValue,
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
          setValue(current => ({ ...current, unit: unitValue.value }))
        }}
        value={options.find(option => option.value === value.unit)}
        options={options}
        customStyle={customSelectStyle}
        disabled={disabled}
      />
    </div>
  )
}

const defaultOptionValues = [
  {
    value: 'hours',
    label: 'Hours',
  },
  {
    value: 'weeks',
    label: 'Weeks',
  },
  {
    value: 'months',
    label: 'Months',
  },
  {
    value: 'years',
    label: 'Years',
  },
]

UnitInput.propTypes = {
  name: PropTypes.string.isRequired,
  maxValue: PropTypes.number,
  minValue: PropTypes.number,
  defaultValue: PropTypes.number,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
  defaultOption: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  }),
  richSelectWidth: PropTypes.number,
  textBoxWidth: PropTypes.number,
  size: PropTypes.oneOf(Object.keys(sizesHeight)),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
}

UnitInput.defaultProps = {
  maxValue: 99999,
  minValue: 1,
  defaultValue: 1,
  options: defaultOptionValues,
  defaultOption: undefined,
  size: 'medium',
  placeholder: '0',
  textBoxWidth: 100,
  richSelectWidth: 200,
  onChange: () => null,
  disabled: false,
}

export default UnitInput
