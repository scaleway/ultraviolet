import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import RichSelect from '../RichSelect'
import TextBox from '../TextBox'

export const sizesHeight = {
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

const customSelectStyle = state => ({
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

UnitInput.propTypes = {
  defaultOption: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }),
  defaultValue: PropTypes.number,
  disabled: PropTypes.bool,
  maxValue: PropTypes.number,
  minValue: PropTypes.number,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  placeholder: PropTypes.string,
  richSelectWidth: PropTypes.number,
  size: PropTypes.oneOf(Object.keys(sizesHeight)),
  textBoxWidth: PropTypes.number,
}

UnitInput.defaultProps = {
  defaultOption: undefined,
  defaultValue: 1,
  disabled: false,
  maxValue: 99999,
  minValue: 1,
  onChange: () => null,
  options: defaultOptionValues,
  placeholder: '0',
  richSelectWidth: 200,
  size: 'medium',
  textBoxWidth: 100,
}

export default UnitInput
