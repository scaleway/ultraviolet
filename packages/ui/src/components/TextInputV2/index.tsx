import styled from '@emotion/styled'
import { Icon } from '@ultraviolet/icons'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { forwardRef, useId, useMemo, useState } from 'react'
import { Button } from '../Button'
import { Loader } from '../Loader'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'

// SIZE
export const TEXTINPUT_SIZE_HEIGHT = {
  large: 48,
  medium: 40,
  small: 32,
} as const
type TextInputSize = keyof typeof TEXTINPUT_SIZE_HEIGHT

const BasicPrefixStack = styled(Stack)`
  padding: ${({ theme }) => theme.space['2']};
  border-right: 1px solid;
  border-color: inherit;
`

const StateStack = styled(Stack)`
  padding: ${({ theme }) => `0 ${theme.space['2']}`};
`

const BasicSuffixStack = styled(Stack)`
  padding: ${({ theme }) => `0 ${theme.space['2']}`};
  border-left: 1px solid;
  border-color: inherit;
`

const CTASuffixStack = styled(Stack)`
  padding: ${({ theme }) => `0 ${theme.space['1']}`};
  border-left: 1px solid;
  border-color: inherit;
`

type StyledInputProps = {
  isSuccess: boolean
  isError: boolean
  isClearable: boolean
}
const StyledInput = styled('input', {
  shouldForwardProp: prop =>
    !['isSuccess', 'isError', 'isClearable'].includes(prop),
})<StyledInputProps>`
  flex: 1;
  border: none;
  outline: none;
  height: 100%;
  padding-left: ${({ theme }) => theme.space['2']};
  background: transparent;
`

type StyledInputWrapperProps = {
  hasFocus: boolean
  size: TextInputSize
}
const StyledInputWrapper = styled('div', {
  shouldForwardProp: prop => !['hasFocus', 'size'].includes(prop),
})<StyledInputWrapperProps>`
  display: flex;
  flex-direction: row;
  height: ${({ size }) => TEXTINPUT_SIZE_HEIGHT[size]}px;

  background: ${({ theme }) => theme.colors.neutral.background};
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  border-radius: ${({ theme }) => theme.radii.default};

  & > ${StyledInput} {
    color: ${({ theme }) => theme.colors.neutral.text};

    &::placeholder {
      color: ${({ theme }) => theme.colors.neutral.textWeak};
    }
  }

  &[data-success='true'] {
    border-color: ${({ theme }) => theme.colors.success.border};
  }

  &[data-error='true'] {
    border-color: ${({ theme }) => theme.colors.danger.border};
  }

  &[data-readOnly='true'] {
    background: ${({ theme }) => theme.colors.neutral.backgroundWeak};
    border-color: ${({ theme }) => theme.colors.neutral.border};
  }

  &[data-disabled='true'] {
    background: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
    border-color: ${({ theme }) => theme.colors.neutral.borderDisabled};

    & > ${StyledInput} {
      color: ${({ theme }) => theme.colors.neutral.textDisabled};

      &::placeholder {
        color: ${({ theme }) => theme.colors.neutral.textWeakDisabled};
      }
    }
  }

  &:not([data-disabled='true']):not([data-readOnly]):hover {
    border-color: ${({ theme }) => theme.colors.primary.border};
  }

  ${({ theme, hasFocus }) =>
    hasFocus
      ? `
  box-shadow: ${theme.shadows.focusPrimary};
  border: 1px solid ${theme.colors.primary.border};
`
      : null};
`

type TextInputProps = {
  className?: string
  clearable?: boolean
  'data-testid'?: string
  error?: string
  helper?: ReactNode
  label?: string
  labelDescription?: ReactNode
  loading?: boolean
  minLength?: number
  maxLength?: number
  onRandomize?: () => void
  onChange?: (newValue: string) => void
  prefix?: ReactNode
  size?: TextInputSize
  success?: string | boolean
  suffix?: ReactNode
  tooltip?: string
  type?: 'text' | 'password' | 'url' | 'email'
  value?: string
} & Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | 'onFocus'
  | 'onBlur'
  | 'name'
  | 'id'
  | 'placeholder'
  | 'aria-label'
  | 'aria-labelledby'
  | 'disabled'
  | 'readOnly'
  | 'required'
  | 'autoFocus'
  | 'tabIndex'
>

/**
 * This component offers an extended input HTML
 */
export const TextInputV2 = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      id,
      className,
      tabIndex,
      value,
      onChange,
      placeholder,
      disabled = false,
      readOnly = false,
      success,
      error,
      helper,
      tooltip,
      label,
      autoFocus,
      required = false,
      'data-testid': dataTestId,
      name,
      onFocus,
      onBlur,
      clearable = false,
      labelDescription,
      type = 'text',
      prefix,
      suffix,
      size = 'large',
      loading,
      onRandomize,
      minLength,
      maxLength,
      'aria-labelledby': ariaLabelledBy,
      'aria-label': ariaLabel,
    },
    ref,
  ) => {
    const localId = useId()
    const [hasFocus, setHasFocus] = useState(false)

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const computedType =
      type === 'password' && isPasswordVisible ? 'text' : type

    const sentiment = useMemo(() => {
      if (error) {
        return 'danger'
      }

      if (success) {
        return 'success'
      }

      return 'neutral'
    }, [error, success])

    const computedClearable = clearable && !!value

    return (
      <Stack gap={0.5} className={className}>
        <Stack direction="row" gap="1" alignItems="center">
          <Stack direction="row" gap="0.5" alignItems="start">
            <Text
              as="label"
              variant="bodyStrong"
              sentiment="neutral"
              htmlFor={id ?? localId}
            >
              {label}
            </Text>
            {required ? <Icon name="asterisk" color="danger" size={8} /> : null}
          </Stack>
          {labelDescription ?? null}
        </Stack>
        <div>
          <Tooltip text={tooltip}>
            <StyledInputWrapper
              hasFocus={hasFocus}
              data-disabled={disabled}
              data-readOnly={readOnly}
              data-success={!!success}
              data-error={!!error}
              size={size}
            >
              {prefix ? (
                <BasicPrefixStack direction="row" alignItems="center">
                  {typeof prefix === 'string' ? (
                    <Text
                      as="span"
                      sentiment="neutral"
                      variant="bodySmall"
                      disabled={disabled}
                    >
                      {prefix}
                    </Text>
                  ) : (
                    prefix
                  )}
                </BasicPrefixStack>
              ) : null}
              <StyledInput
                type={computedType}
                aria-invalid={!!error}
                id={id ?? localId}
                tabIndex={tabIndex}
                autoFocus={autoFocus}
                disabled={disabled}
                ref={ref}
                value={value === null || value === undefined ? '' : value}
                onChange={event => {
                  onChange?.(event.currentTarget.value)
                }}
                isSuccess={!!success}
                isError={!!error}
                isClearable={!!computedClearable}
                placeholder={placeholder}
                data-testid={dataTestId}
                name={name}
                onFocus={event => {
                  setHasFocus(true)
                  onFocus?.(event)
                }}
                onBlur={event => {
                  setHasFocus(false)
                  onBlur?.(event)
                }}
                readOnly={readOnly}
                minLength={minLength}
                maxLength={maxLength}
                aria-labelledby={ariaLabelledBy}
                aria-label={ariaLabel}
              />
              {success || error || loading || computedClearable ? (
                <StateStack direction="row" gap={1} alignItems="center">
                  {computedClearable ? (
                    <Button
                      aria-label="clear value"
                      disabled={disabled || !value}
                      variant="ghost"
                      size={size === 'small' ? 'xsmall' : 'small'}
                      icon="close"
                      onClick={() => {
                        onChange?.('')
                      }}
                      sentiment="neutral"
                    />
                  ) : null}
                  {success ? (
                    <Icon
                      name="checkbox-circle-outline"
                      color="success"
                      size={16}
                      disabled={disabled}
                    />
                  ) : null}
                  {error ? (
                    <Icon
                      name="alert"
                      color="danger"
                      size={16}
                      disabled={disabled}
                    />
                  ) : null}
                  {loading && !disabled ? <Loader active size={16} /> : null}
                </StateStack>
              ) : null}
              {suffix ? (
                <BasicSuffixStack direction="row" alignItems="center">
                  {typeof suffix === 'string' ? (
                    <Text
                      as="span"
                      sentiment="neutral"
                      variant="bodySmall"
                      disabled={disabled}
                    >
                      {suffix}
                    </Text>
                  ) : (
                    suffix
                  )}
                </BasicSuffixStack>
              ) : null}
              {type === 'password' ? (
                <CTASuffixStack direction="row" alignItems="center">
                  <Button
                    disabled={disabled}
                    data-testid={
                      dataTestId ? `${dataTestId}-visibility-button` : undefined
                    }
                    aria-label={isPasswordVisible ? 'hide' : 'show'}
                    onClick={() => {
                      setIsPasswordVisible(!isPasswordVisible)
                    }}
                    variant="ghost"
                    sentiment="neutral"
                    icon={isPasswordVisible ? 'eye-off' : 'eye'}
                    size={size === 'small' ? 'xsmall' : 'small'}
                  />
                </CTASuffixStack>
              ) : null}
              {onRandomize ? (
                <CTASuffixStack direction="row" alignItems="center">
                  <Button
                    disabled={disabled}
                    icon="auto-fix"
                    size={size === 'small' ? 'xsmall' : 'small'}
                    variant="ghost"
                    sentiment="neutral"
                    onClick={onRandomize}
                  />
                </CTASuffixStack>
              ) : null}
            </StyledInputWrapper>
          </Tooltip>
        </div>
        {error || success || typeof helper === 'string' ? (
          <Text
            as="p"
            variant="caption"
            sentiment={sentiment}
            prominence={!error && !success ? 'weak' : 'default'}
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
  },
)
