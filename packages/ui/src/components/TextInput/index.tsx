'use client'

import { AlertCircleIcon } from '@ultraviolet/icons/AlertCircleIcon'
import { AutoFixIcon } from '@ultraviolet/icons/AutoFixIcon'
import { CheckCircleIcon } from '@ultraviolet/icons/CheckCircleIcon'
import { CloseIcon } from '@ultraviolet/icons/CloseIcon'
import { EyeIcon } from '@ultraviolet/icons/EyeIcon'
import { EyeOffIcon } from '@ultraviolet/icons/EyeOffIcon'
import { cn } from '@ultraviolet/utils'
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
import type { TEXTINPUT_SIZE_HEIGHT } from './constants'
import {
  basicPrefix,
  basicSuffix,
  ctaSuffix,
  inputClass,
  inputWrapper,
  inputWrapperSizes,
  stateStack,
} from './styles.css'

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
  size?: keyof typeof TEXTINPUT_SIZE_HEIGHT
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
  | 'style'
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
      style,
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
            <div
              className={cn(inputWrapper, inputWrapperSizes[size])}
              data-disabled={disabled}
              data-error={!!error}
              data-has-focus={hasFocus}
              data-readonly={readOnly}
              data-success={!!success}
            >
              {prefix ? (
                <Stack
                  alignItems="center"
                  className={basicPrefix}
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
                </Stack>
              ) : null}
              <input
                aria-invalid={!!error}
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledBy}
                autoComplete={autoComplete}
                // oxlint-disable-next-line jsx_a11y/no-autofocus
                autoFocus={autoFocus}
                className={inputClass}
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
                style={style}
                tabIndex={tabIndex}
                type={computedType}
                value={value}
              />
              {success || error || loading || computedClearable ? (
                <Stack
                  alignItems="center"
                  className={stateStack}
                  direction="row"
                  gap={1}
                >
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
                </Stack>
              ) : null}
              {suffix ? (
                <Stack
                  alignItems="center"
                  className={basicSuffix}
                  direction="row"
                >
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
                </Stack>
              ) : null}
              {type === 'password' ? (
                <Stack
                  alignItems="center"
                  className={ctaSuffix}
                  direction="row"
                >
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
                </Stack>
              ) : null}
              {onRandomize ? (
                <Stack
                  alignItems="center"
                  className={ctaSuffix}
                  direction="row"
                >
                  <Button
                    disabled={disabled}
                    onClick={onRandomize}
                    sentiment="neutral"
                    size={size === 'small' ? 'xsmall' : 'small'}
                    variant="ghost"
                  >
                    <AutoFixIcon />
                  </Button>
                </Stack>
              ) : null}
            </div>
          </Tooltip>
        </div>
        {error || typeof success === 'string' || typeof helper === 'string' ? (
          <Text
            as="p"
            disabled={disabled}
            prominence={error || success ? 'default' : 'weak'}
            sentiment={sentiment}
            variant="caption"
          >
            {error || success || helper}
          </Text>
        ) : null}
        {!(error || success) && typeof helper !== 'string' && helper
          ? helper
          : null}
      </Stack>
    )
  },
)
