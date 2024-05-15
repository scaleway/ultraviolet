import styled from '@emotion/styled'
import { Icon } from '@ultraviolet/icons'
import type { ComponentProps, InputHTMLAttributes, ReactNode } from 'react'
import { useId, useMemo, useState } from 'react'
import { SelectInputV2 } from '../SelectInputV2'
import type { OptionType } from '../SelectInputV2/types'
import { Stack } from '../Stack'
import { Text } from '../Text'

const INPUT_SIZE_HEIGHT: Record<string, number> = {
  large: 48,
  medium: 40,
  small: 32,
}

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
  padding-left: ${({ theme }) => theme.space['2']};
  background: transparent;
  color: ${({ theme }) => theme.colors.neutral.text};
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

const UnitInputWrapper = styled(Stack)<{
  'data-size': 'small' | 'medium' | 'large'
  'data-success': boolean
  'data-error': boolean
  'data-disabled': boolean
  'data-readonly': boolean
}>`
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  border-radius: ${({ theme }) => theme.radii.default};

  &:not([data-disabled='true']):not([data-readonly='true']):not(
      [data-success='true']
    ):not([data-error='true']):focus,
  :not([data-disabled='true']):not([data-readonly='true']):not(
      [data-success='true']
    ):not([data-error='true'])active {
    box-shadow: ${({ theme }) => theme.shadows.focusPrimary};
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
    height: ${INPUT_SIZE_HEIGHT['small']}px;
  }
  &[data-size='medium'] {
    height: ${INPUT_SIZE_HEIGHT['medium']}px;
  }
  &[data-size='large'] {
    height: ${INPUT_SIZE_HEIGHT['large']}px;
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

const CustomSelectInput = styled(SelectInputV2)<{
  width?: number
  'data-disabled': boolean
}>`
  #unit {
    border: none;
    background: transparent;
  }

  ${({ width }) => width && `width: ${width}px;`}

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
  selectInputWidth?: number
  size?: 'small' | 'medium' | 'large'
  'data-testid'?: string
  helper?: string
  unitError?: string
  width?: ComponentProps<typeof Stack>['width']
  placeholderUnit?: string
  error?: boolean | string
  success?: boolean | string
  label?: string
  labelInformation?: ReactNode
  step?: number | string
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
  selectInputWidth = 200,
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

  return (
    <Stack gap={0.5}>
      {label ? (
        <Stack direction="row" gap={0.5} alignItems="center">
          <Text
            as="label"
            variant={size === 'large' ? 'bodyStrong' : 'bodySmallStrong'}
            disabled={disabled}
            htmlFor={id ?? localId}
          >
            {label}
          </Text>
          {required ? (
            <Icon name="asterisk" sentiment="danger" size={8} />
          ) : null}
          {labelInformation ?? null}
        </Stack>
      ) : null}
      <UnitInputWrapper
        direction="row"
        data-testid={dataTestId}
        data-size={size}
        width={width}
        id={id}
        data-success={!!success}
        data-error={!!error}
        data-disabled={!!disabled}
        data-readonly={!!readOnly}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      >
        <StyledNumberInputWrapper id="input-field">
          <StyledInput
            type="number"
            aria-invalid={!!error}
            autoFocus={autoFocus}
            disabled={disabled}
            data-readOnly={readOnly}
            name={`${name}-value`}
            id={id ? `${id}-value` : undefined}
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
          />
          {error ? <Icon name="alert" sentiment="danger" /> : null}
          {success && !error ? (
            <Icon name="checkbox-circle-outline" sentiment="success" />
          ) : null}
        </StyledNumberInputWrapper>
        <CustomSelectInput
          width={selectInputWidth}
          data-disabled={disabled}
          id="unit"
          name={`${name}-unit`}
          onChange={(newValue: string) => {
            onChangeUnitValue?.(newValue)
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
          readOnly={readOnly}
        />
      </UnitInputWrapper>
      {error || typeof success === 'string' || typeof helper === 'string' ? (
        <Text
          as="p"
          variant="caption"
          sentiment={sentiment}
          disabled={disabled}
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
