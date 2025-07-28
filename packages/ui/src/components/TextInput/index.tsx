'use client'

import styled from '@emotion/styled'
import {
  AlertCircleIcon,
  AutoFixIcon,
  CheckCircleIcon,
  CloseIcon,
  EyeIcon,
  EyeOffIcon,
} from '@ultraviolet/icons'
import type {
  ChangeEvent,
  ChangeEventHandler,
  InputHTMLAttributes,
  ReactNode,
} from 'react'
import {
  forwardRef,
  useCallback,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Button } from '../Button'
import { Label } from '../Label'
import { Loader } from '../Loader'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'

// SIZE
export const TEXTINPUT_SIZE_HEIGHT = {
  large: '600',
  medium: '500',
  small: '400', // sizing theme tokens key
} as const
type TextInputSize = keyof typeof TEXTINPUT_SIZE_HEIGHT

export const BasicPrefixStack = styled(Stack)`
  padding: ${({ theme }) => theme.space['2']};

  &[data-size="small"] {
    padding: ${({ theme }) => theme.space['1']};
  }
  border-right: 1px solid;
  border-color: inherit;
`

const StateStack = styled(Stack)`
  padding: ${({ theme }) => `0 ${theme.space['2']}`};
`

export const BasicSuffixStack = styled(Stack)`
  padding: ${({ theme }) => `0 ${theme.space['2']}`};
  border-left: 1px solid;
  border-color: inherit;
`

const CTASuffixStack = styled(Stack)`
  padding: ${({ theme }) => `0 ${theme.space['1']}`};
  border-left: 1px solid;
  border-color: inherit;
`

export const StyledInput = styled.input<{
  'data-size': TextInputSize
}>`
  flex: 1;
  border: none;
  outline: none;
  height: 100%;
  width: 100%;
  padding-left: ${({ theme }) => theme.space['2']};
  background: transparent;
  font-size: ${({ theme }) => theme.typography.bodySmall.fontSize};

  &[data-size='large'] {
    font-size: ${({ theme }) => theme.typography.body.fontSize};
  }

  &[data-size='small'] {
    padding-left: ${({ theme }) => theme.space['1']};
  }
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
  height: ${({ size, theme }) => theme.sizing[TEXTINPUT_SIZE_HEIGHT[size]]};

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

  &[data-readonly='true'] {
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

  &:not([data-disabled='true']):not([data-readonly]):hover {
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
  prefix?: ReactNode
  size?: TextInputSize
  success?: string | boolean
  suffix?: ReactNode
  tooltip?: string
  type?: 'text' | 'password' | 'url' | 'email'
  value?: string
  defaultValue?: string
  onChangeValue?: (value: string) => void
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
  | 'autoComplete'
  | 'onKeyDown'
  | 'onKeyUp'
  | 'role'
  | 'aria-live'
  | 'aria-atomic'
  | 'onChange'
>

/**
 * This component offers an extended input HTML. The component can be controlled or uncontrolled.
 * To control the component, you need to pass the value and the `onChange` function.
 * If you don't pass the `onChange` function, the component will be uncontrolled and you can set the default value using `defaultValue`
 */
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      id,
      className,
      tabIndex,
      value,
      onChange,
      onChangeValue,
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
      autoComplete,
      onKeyDown,
      onKeyUp,
      role,
      'aria-live': ariaLive,
      'aria-atomic': ariaAtomic,
      defaultValue,
    },
    ref,
  ) => {
    const localId = useId()
    const [hasFocus, setHasFocus] = useState(false)
    const [localValue, setLocalValue] = useState(defaultValue)
    const inputRef = useRef<HTMLInputElement>(null)
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

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

    const onChangeCallback: ChangeEventHandler<HTMLInputElement> = useCallback(
      event => {
        onChange?.(event)
        onChangeValue?.(event.target.value)
        setLocalValue(event.target.value)
      },
      [onChange, onChangeValue],
    )

    const computedValue = value !== undefined ? value : localValue

    const computedClearable = clearable && !!computedValue

    return (
      <Stack
        aria-atomic={ariaAtomic}
        aria-live={ariaLive}
        className={className}
        gap={0.5}
        role={role}
      >
        {label || labelDescription ? (
          <Label
            htmlFor={id ?? localId}
            id={ariaLabelledBy}
            labelDescription={labelDescription}
            required={required}
            size={size}
          >
            {label}
          </Label>
        ) : null}
        <div>
          <Tooltip text={tooltip}>
            <StyledInputWrapper
              data-disabled={disabled}
              data-error={!!error}
              data-readonly={readOnly}
              data-success={!!success}
              hasFocus={hasFocus}
              size={size}
            >
              {prefix ? (
                <BasicPrefixStack
                  alignItems="center"
                  data-size={size}
                  direction="row"
                >
                  {typeof prefix === 'string' ? (
                    <Text
                      as="span"
                      disabled={disabled}
                      sentiment="neutral"
                      variant="bodySmall"
                    >
                      {prefix}
                    </Text>
                  ) : (
                    prefix
                  )}
                </BasicPrefixStack>
              ) : null}
              <StyledInput
                aria-invalid={!!error}
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledBy}
                autoComplete={autoComplete}
                
                data-size={size}
                data-testid={dataTestId}
                defaultValue={defaultValue}
                disabled={disabled}
                id={id ?? localId}
                maxLength={maxLength}
                minLength={minLength}
                name={name}
                onBlur={event => {
                  setHasFocus(false)
                  onBlur?.(event)
                }}
                onChange={onChangeCallback}
                onFocus={event => {
                  setHasFocus(true)
                  onFocus?.(event)
                }}
                onKeyDown={onKeyDown}
                onKeyUp={onKeyUp}
                placeholder={placeholder}
                readOnly={readOnly}
                ref={inputRef}
                required={required}
                tabIndex={tabIndex}
                type={computedType}
                value={value}
              />
              {success || error || loading || computedClearable ? (
                <StateStack alignItems="center" direction="row" gap={1}>
                  {computedClearable ? (
                    <Button
                      aria-label="clear value"
                      disabled={disabled || !computedValue}
                      onClick={() => {
                        if (inputRef?.current) {
                          inputRef.current.value = ''
                          setLocalValue('')
                          onChangeCallback({
                            currentTarget: { value: '' },
                            target: { value: '' },
                          } as ChangeEvent<HTMLInputElement>)
                        }
                      }}
                      sentiment="neutral"
                      size={size === 'small' ? 'xsmall' : 'small'}
                      variant="ghost"
                    >
                      <CloseIcon size="small" />
                    </Button>
                  ) : null}
                  {success ? (
                    <CheckCircleIcon
                      disabled={disabled}
                      sentiment="success"
                      size="small"
                    />
                  ) : null}
                  {error ? (
                    <AlertCircleIcon
                      disabled={disabled}
                      sentiment="danger"
                      size="small"
                    />
                  ) : null}
                  {loading && !disabled ? <Loader active size="small" /> : null}
                </StateStack>
              ) : null}
              {suffix ? (
                <BasicSuffixStack alignItems="center" direction="row">
                  {typeof suffix === 'string' ? (
                    <Text
                      as="span"
                      disabled={disabled}
                      sentiment="neutral"
                      variant="bodySmall"
                    >
                      {suffix}
                    </Text>
                  ) : (
                    suffix
                  )}
                </BasicSuffixStack>
              ) : null}
              {type === 'password' ? (
                <CTASuffixStack alignItems="center" direction="row">
                  <Button
                    aria-label={isPasswordVisible ? 'hide' : 'show'}
                    data-testid={
                      dataTestId ? `${dataTestId}-visibility-button` : undefined
                    }
                    disabled={disabled}
                    onClick={() => {
                      setIsPasswordVisible(!isPasswordVisible)
                    }}
                    sentiment="neutral"
                    size={size === 'small' ? 'xsmall' : 'small'}
                    variant="ghost"
                  >
                    {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                  </Button>
                </CTASuffixStack>
              ) : null}
              {onRandomize ? (
                <CTASuffixStack alignItems="center" direction="row">
                  <Button
                    disabled={disabled}
                    onClick={onRandomize}
                    sentiment="neutral"
                    size={size === 'small' ? 'xsmall' : 'small'}
                    variant="ghost"
                  >
                    <AutoFixIcon />
                  </Button>
                </CTASuffixStack>
              ) : null}
            </StyledInputWrapper>
          </Tooltip>
        </div>
        {error || typeof success === 'string' || typeof helper === 'string' ? (
          <Text
            as="p"
            disabled={disabled}
            prominence={!error && !success ? 'weak' : 'default'}
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
  },
)
