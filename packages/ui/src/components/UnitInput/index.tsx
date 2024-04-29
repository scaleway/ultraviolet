import styled from '@emotion/styled'
import { Icon } from '@ultraviolet/icons'
import type { ComponentProps, ReactNode } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { Notice } from '../Notice'
import { SelectInputV2 } from '../SelectInputV2'
import type { OptionType } from '../SelectInputV2/types'
import { Stack } from '../Stack'
import { Text } from '../Text'

export const INPUT_SIZE_HEIGHT: Record<string, number> = {
  large: 48,
  medium: 40,
  small: 32,
}

const StyledInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  height: 100%;
  padding-left: ${({ theme }) => theme.space['2']};
  background: transparent;
  color: ${({ theme }) => theme.colors.neutral.text};
  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral.textWeak};
  }

  &:disabled {
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.neutral.textWeakDisabled};
  }
`
const StyledInputWrapper = styled.div<{ 'data-hovered': boolean }>`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding-right: ${({ theme }) => theme.space['2']};
  border-right: 1px solid ${({ theme }) => theme.colors.neutral.border};
  width: 100%;

  &[data-hovered='true'] {
    border-right: 1px solid ${({ theme }) => theme.colors.primary.border};
  }

  height: 100%;
`

const CustomSelectInput = styled(SelectInputV2)<{
  width?: number
}>`
  ${({ width }) => width && `width: ${width}px;`}
  &:active {
    outline: none;
    box-shadow: none;
  }
  &:hover {
    & > ${StyledInputWrapper} {
      background: red;
      border-right-color: ${({ theme }) => theme.colors.primary.border};
    }
  }
`

const UnitInputWrapper = styled(Stack)<{
  'data-size': 'small' | 'medium' | 'large'
  'data-focus': boolean
  'data-success': boolean
  'data-error': boolean
  'data-disabled': boolean
  'data-readonly': boolean
}>`
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  border-radius: ${({ theme }) => theme.radii.default};

  &:hover,
  &:focus {
    text-decoration: none;
    border-color: ${({ theme }) => theme.colors.primary.border};
    box-shadow: none;
  }

  &[data-readonly='true'] {
    background: ${({ theme }) => theme.colors.neutral.backgroundWeak};
    border-color: ${({ theme }) => theme.colors.neutral.border};
    cursor: default;
  }
  &[data-disabled='true'] {
    background: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
    border-color: ${({ theme }) => theme.colors.neutral.borderDisabled};
    cursor: not-allowed;
  }

  &[data-size='small'] {
    height: ${INPUT_SIZE_HEIGHT['small']}px;
  }
  &[data-size='medium'] {
    height: ${INPUT_SIZE_HEIGHT['medium']}px;
  }
  &[data-size='large'] {
    height: ${INPUT_SIZE_HEIGHT['large']}px;
  }
  &[data-focus='true'] {
    box-shadow: ${({ theme }) => theme.shadows.focusPrimary};
    border-color: ${({ theme }) => theme.colors.primary.borderHover};
    & > ${StyledInputWrapper} {
      border-right-color: ${({ theme }) => theme.colors.primary.border};
    }
  }
  &[data-success='true'] {
    border: 1px solid ${({ theme }) => theme.colors.success.border};
    & > ${StyledInputWrapper} {
      border-right-color: ${({ theme }) => theme.colors.success.border};
    }
  }
  &[data-error='true'] {
    border: 1px solid ${({ theme }) => theme.colors.danger.border};
    & > ${StyledInputWrapper} {
      border-right-color: ${({ theme }) => theme.colors.danger.border};
    }
    & > ${StyledInputWrapper}:hover {
      border-right-color: ${({ theme }) => theme.colors.danger.border};
    }
  }
  &[data-error='true'] {
    border: 1px solid ${({ theme }) => theme.colors.danger.border};
    & > ${StyledInputWrapper} {
      border-right-color: ${({ theme }) => theme.colors.danger.border};
    }
  }
`

type UnitInputValue = { inputValue: number; unit: OptionType }

type UnitInputProps = {
  id?: string
  className?: string
  name: string
  disabled?: boolean
  maxValue?: number
  minValue?: number
  value?: UnitInputValue['inputValue']
  unitValue?: UnitInputValue['unit']
  onChange: (value: UnitInputValue['inputValue']) => void
  onChangeUnitValue: (values: string[]) => void
  options: OptionType[]
  placeholder?: string
  selectInputWidth?: number
  size?: 'small' | 'medium' | 'large'
  'data-testid'?: string
  notice?: string
  required?: boolean
  helper?: string
  unitError?: string
  width?: ComponentProps<typeof Stack>['width']
  placeholderUnit?: string
  autoFocus?: boolean
  error?: boolean
  success?: boolean
  label?: string
  labelInformation?: ReactNode
  step?: number | string
  readOnly?: boolean
}

export const UnitInput = ({
  id,
  name = '',
  maxValue = 99999,
  minValue = 1,
  autoFocus = false,
  size = 'large',
  placeholder = '0',
  placeholderUnit = 'Select item',
  onChange,
  onChangeUnitValue,
  value,
  unitValue,
  selectInputWidth = 200,
  disabled = false,
  options,
  className,
  label,
  step = 1,
  error,
  notice,
  required,
  helper,
  unitError,
  success,
  'data-testid': dataTestId,
  width,
  labelInformation,
  readOnly,
}: UnitInputProps) => {
  const [hasFocus, setHasFocus] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [val, setVal] = useState(value)
  const sentiment = useMemo(() => {
    if (error) {
      return 'danger'
    }
    if (success) {
      return 'success'
    }

    return 'neutral'
  }, [error, success])

  useEffect(() => {
    const selectBar = document.getElementById('select-bar')

    if (selectBar) {
      selectBar.style.backgroundColor = 'transparent'
      selectBar.style.border = 'none'
      selectBar.style.borderRadius = '0px'
    }
  }, [])

  return (
    <Stack gap={0.5}>
      {label ? (
        <Stack direction="row" gap={0.5} alignItems="center">
          {label ? (
            <Text
              as="label"
              variant={size === 'large' ? 'bodyStrong' : 'bodySmallStrong'}
              disabled={disabled}
            >
              {label}
            </Text>
          ) : null}
          {required && label ? (
            <Icon name="asterisk" sentiment="danger" size={8} />
          ) : null}
          {labelInformation && label ? labelInformation : null}
        </Stack>
      ) : null}
      <UnitInputWrapper
        direction="row"
        data-testid={dataTestId}
        data-size={size}
        data-focus={hasFocus}
        width={width}
        id={id}
        data-success={!!success}
        data-error={!!error}
        onMouseEnter={() =>
          !disabled && !readOnly ? setHovered(true) : undefined
        }
        onMouseLeave={() => setHovered(false)}
        data-disabled={!!disabled}
        data-readonly={!!readOnly}
      >
        <StyledInputWrapper id="input-field" data-hovered={hovered}>
          <StyledInput
            type="number"
            aria-invalid={!!error}
            autoFocus={autoFocus}
            disabled={disabled}
            data-readOnly={readOnly}
            name={`${name}-value`}
            value={val}
            onChange={event => {
              const numericValue = Number.parseInt(event.target.value, 10)
              if (numericValue > maxValue) {
                setVal(maxValue)
                onChange?.(maxValue)
              } else if (numericValue < minValue) {
                setVal(minValue)
                onChange?.(minValue)
              } else {
                setVal(numericValue)
                onChange?.(numericValue)
              }
            }}
            placeholder={placeholder}
            max={maxValue}
            readOnly={readOnly}
            min={minValue}
            step={step}
            data-success={success}
            data-error={error}
            data-testid="unit-input"
            required={required}
            className={className}
            onFocus={() =>
              !disabled && !readOnly ? setHasFocus(true) : undefined
            }
          />
          {error ? <Icon name="alert" sentiment="danger" /> : null}
          {success && !error ? (
            <Icon name="checkbox-circle-outline" sentiment="success" />
          ) : null}
        </StyledInputWrapper>
        <CustomSelectInput
          width={selectInputWidth}
          id={`${name}-unit`}
          name={`${name}-unit`}
          onChange={newValue => {
            onChangeUnitValue(newValue)
            setHasFocus(false)
            setHovered(false)
          }}
          error={unitError}
          value={unitValue}
          options={options}
          searchable={false}
          clearable={false}
          placeholder={placeholderUnit}
          disabled={disabled || options.length === 1}
          size={size}
          multiselect={false}
          onFocus={() =>
            !disabled && !readOnly ? setHasFocus(true) : undefined
          }
          readOnly={readOnly}
          onBlur={() => setHasFocus(false)}
        />
      </UnitInputWrapper>
      {helper ? (
        <Text as="p" variant="caption" sentiment={sentiment}>
          {helper}
        </Text>
      ) : null}
      {notice ? <Notice>{notice}</Notice> : null}
    </Stack>
  )
}
