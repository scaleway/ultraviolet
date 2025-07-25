'use client'

import styled from '@emotion/styled'
import { AlertCircleIcon, CheckCircleIcon } from '@ultraviolet/icons'
import type {
  CSSProperties,
  ComponentProps,
  InputHTMLAttributes,
  ReactNode,
} from 'react'
import { useEffect, useId, useMemo, useState } from 'react'
import { Label } from '../Label'
import { Row } from '../Row'
import { SelectInput } from '../SelectInput'
import type { OptionType } from '../SelectInput/types'
import { Stack } from '../Stack'
import { Text } from '../Text'

const INPUT_SIZE_HEIGHT = {
  small: '400', // sizing theme tokens key
  medium: '500',
  large: '600',
} as const

const StyledNumberInputWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding-right: ${({ theme }) => theme.space['2']};
  border-right: 1px solid ${({ theme }) => theme.colors.neutral.border};
  width: 100%;
  height: 100%;
`

const StyledInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  height: 100%;
  width: 100%;
  padding-left: ${({ theme }) => theme.space['2']};
  background: transparent;
  color: ${({ theme }) => theme.colors.neutral.text};
  &[data-size="small"] {
    padding-left: ${({ theme }) => theme.space['1']};
  }

  &[data-size="large"] {
    font-size: ${({ theme }) => theme.typography.body.fontSize};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral.textWeak};
  }

  &:disabled {
    cursor: not-allowed;

    &::placeholder {
      color: ${({ theme }) => theme.colors.neutral.textWeakDisabled};
    }
  }
`

const UnitInputWrapper = styled(Row)<{
  'data-size': 'small' | 'medium' | 'large'
  'data-success': boolean
  'data-error': boolean
  'data-disabled': boolean
  'data-readonly': boolean
}>`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  border-radius: ${({ theme }) => theme.radii.default};

  &:not([data-disabled='true']):not([data-readonly='true']):not(
      [data-success='true']
    ):not([data-error='true']):focus,
  :not([data-disabled='true']):not([data-readonly='true']):not(
      [data-success='true']
    ):not([data-error='true']):active {
    box-shadow: ${({ theme }) => theme.shadows.focusPrimary};
    border-color: ${({ theme }) => theme.colors.primary.borderHover};

    & > ${StyledNumberInputWrapper} {
      border-right-color: ${({ theme }) => theme.colors.primary.border};
    }
  }

  &:not([data-disabled='true']):not([data-readonly='true']):not(
      [data-success='true']
    ):not([data-error='true']):focus-within  {
      border-color: ${({ theme }) => theme.colors.primary.borderHover};
      & > ${StyledNumberInputWrapper} {
      border-right-color: ${({ theme }) => theme.colors.primary.border};
    }
    }

  &:not([data-disabled='true']):not([data-error='true']):not(
      [data-success='true']
    ):not([data-readonly='true']):hover,
  :not([data-disabled='true']):not([data-error='true']):not(
      [data-success='true']
    ):focus {
    text-decoration: none;
    border-color: ${({ theme }) => theme.colors.primary.border};
    & > ${StyledNumberInputWrapper} {
      border-right-color: ${({ theme }) => theme.colors.primary.border};
    }
  }

  &[data-readonly='true'] {
    background: ${({ theme }) => theme.colors.neutral.backgroundWeak};
    border-color: ${({ theme }) => theme.colors.neutral.border};
    cursor: default;
  }

  &[data-readonly='true']:active {
    border-color: ${({ theme }) => theme.colors.neutral.border};
  }

  &[data-size='small'] {
    height: ${({ theme }) => theme.sizing[INPUT_SIZE_HEIGHT.small]};
  }
  &[data-size='medium'] {
    height: ${({ theme }) => theme.sizing[INPUT_SIZE_HEIGHT.medium]};
  }
  &[data-size='large'] {
    height: ${({ theme }) => theme.sizing[INPUT_SIZE_HEIGHT.large]};
  }

  &[data-success='true'] {
    border: 1px solid ${({ theme }) => theme.colors.success.border};
    & > ${StyledNumberInputWrapper} {
      border-right-color: ${({ theme }) => theme.colors.success.border};
    }
  }
  &[data-success='true']:active {
    border: 1px solid ${({ theme }) => theme.colors.success.border};
    box-shadow: ${({ theme }) => theme.shadows.focusSuccess};

    & > ${StyledNumberInputWrapper} {
      border-right-color: ${({ theme }) => theme.colors.success.border};
    }
  }

  &[data-error='true'] {
    border: 1px solid ${({ theme }) => theme.colors.danger.border};

    & > ${StyledNumberInputWrapper} {
      border-right-color: ${({ theme }) => theme.colors.danger.border};
    }

    & > ${StyledNumberInputWrapper}:hover {
      border-right-color: ${({ theme }) => theme.colors.danger.border};
    }
  }

  &[data-error='true']:active {
    border: 1px solid ${({ theme }) => theme.colors.danger.border};
    box-shadow: ${({ theme }) => theme.shadows.focusDanger};

    & > ${StyledNumberInputWrapper} {
      border-right-color: ${({ theme }) => theme.colors.danger.border};
    }
    & > ${StyledNumberInputWrapper}:hover {
      border-right-color: ${({ theme }) => theme.colors.danger.border};
    }
  }

  &[data-disabled='true'] {
    background: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
    border-color: ${({ theme }) => theme.colors.neutral.borderDisabled};
    cursor: not-allowed;

    & > ${StyledNumberInputWrapper} {
      border-right-color: ${({ theme }) => theme.colors.neutral.borderDisabled};
    }
  }
`

const CustomSelectInput = styled(SelectInput)<{
  width?: number | string
  maxWidth?: number | string
  'data-disabled': boolean
}>`
  #unit {
    border: none;
    background: transparent;
  }

  ${({ width }) =>
    width && `width: ${typeof width === 'string' ? width : `${width}px`};`}
  ${({ maxWidth }) =>
    maxWidth &&
    `max-width: ${typeof maxWidth === 'string' ? maxWidth : `${maxWidth}px`};`}

  #unit:focus,
  #unit:active {
    box-shadow: none;
  }
`
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
  labelInformation,
  readOnly,
  onFocus,
  onBlur,
  onKeyDown,
  dropdownAlign,
  templateColumns,
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

  useEffect(() => {
    if (value !== undefined) {
      setVal(value)
    }
  }, [value])

  return (
    <Stack
      gap={0.5}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      width={width}
    >
      {label || labelInformation ? (
        <Label
          labelDescription={labelInformation}
          required={required}
          size={size}
          htmlFor={id ?? localId}
        >
          {label}
        </Label>
      ) : null}
      <UnitInputWrapper
        templateColumns={templateColumns ?? '1fr auto'}
        data-testid={dataTestId}
        data-size={size}
        data-success={!!success}
        data-error={!!error}
        data-disabled={!!disabled}
        data-readonly={!!readOnly}
      >
        <StyledNumberInputWrapper id="input-field">
          <StyledInput
            type="number"
            aria-invalid={!!error}
            autoFocus={autoFocus}
            disabled={disabled}
            name={`${name}-value`}
            id={id ?? localId}
            value={val}
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
            max={max}
            readOnly={readOnly}
            min={min}
            step={step}
            data-success={success}
            data-error={error}
            data-testid="unit-input"
            required={required}
            className={className}
            data-size={size}
          />
          {error ? <AlertCircleIcon sentiment="danger" /> : null}
          {success && !error ? <CheckCircleIcon sentiment="success" /> : null}
        </StyledNumberInputWrapper>
        <CustomSelectInput
          data-disabled={disabled}
          id="unit"
          name={`${name}-unit`}
          onChange={(newValue: string) => {
            onChangeUnitValue?.(newValue)
          }}
          error={unitError}
          value={unitValue}
          options={options}
          width={selectInputWidth}
          searchable={false}
          clearable={false}
          placeholder={placeholderUnit}
          disabled={disabled}
          size={size}
          multiselect={false}
          readOnly={readOnly}
          dropdownAlign={dropdownAlign}
        />
      </UnitInputWrapper>
      {error || typeof success === 'string' || typeof helper === 'string' ? (
        <Text
          as="p"
          variant="caption"
          sentiment={sentiment}
          disabled={disabled}
          prominence={sentiment === 'neutral' ? 'weak' : 'default'}
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
