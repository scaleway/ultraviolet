'use client'

import { AutoFixIcon } from '@ultraviolet/icons/AutoFixIcon'
import { cn } from '@ultraviolet/utils'
import {
  forwardRef,
  useCallback,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import { hasHelperText } from '../../helpers/hasHelperText'
import { Button } from '../Button'
import { Helper } from '../Helper'
import { Label } from '../Label'
import { Stack } from '../Stack'
import { Tooltip } from '../Tooltip'

import { PrefixSuffix } from './PrefixSuffix'
import { RightIcon } from './RightIcon'
import { ShowHidePassword } from './ShowHidePassword'
import { textInputStyle } from './styles.css'

import type { TextInputProps } from './type'
import type { ChangeEventHandler } from 'react'

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
      'aria-describedby': ariaDescribedBy,
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
    const helperId = useId()
    const [hasFocus, setHasFocus] = useState(false)
    const [localValue, setLocalValue] = useState(defaultValue)
    const inputRef = useRef<HTMLInputElement>(null)
    useImperativeHandle(ref, () => inputRef.current!)

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const computedType =
      type === 'password' && isPasswordVisible ? 'text' : type

    const onChangeCallback: ChangeEventHandler<HTMLInputElement> = useCallback(
      event => {
        onChange?.(event)
        onChangeValue?.(event.target.value)
        setLocalValue(event.target.value)
      },
      [onChange, onChangeValue],
    )

    const computedValue = value ?? localValue
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
        <Tooltip text={tooltip}>
          <div
            className={cn(
              textInputStyle.inputWrapper,
              textInputStyle.inputWrapperSizes[size],
            )}
            data-disabled={disabled}
            data-error={!!error}
            data-has-focus={hasFocus}
            data-readonly={readOnly}
            data-success={!!success}
          >
            <PrefixSuffix
              content={prefix}
              disabled={disabled}
              size={size}
              type="prefix"
            />
            <input
              aria-invalid={!!error}
              aria-label={ariaLabel}
              aria-describedby={
                !ariaDescribedBy && hasHelperText(helper, error, success)
                  ? helperId
                  : ariaDescribedBy
              }
              aria-labelledby={ariaLabelledBy}
              autoComplete={autoComplete}
              // oxlint-disable-next-line jsx_a11y/no-autofocus
              autoFocus={autoFocus}
              className={textInputStyle.input}
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
            <RightIcon
              computedClearable={computedClearable}
              computedValue={computedValue}
              disabled={disabled}
              error={error}
              inputRef={inputRef}
              loading={loading}
              onChangeCallback={onChangeCallback}
              setLocalValue={setLocalValue}
              size={size}
              success={success}
            />
            <PrefixSuffix
              content={suffix}
              disabled={disabled}
              size={size}
              type="suffix"
            />
            {type === 'password' ? (
              <ShowHidePassword
                data-testid={dataTestId}
                disabled={disabled}
                isPasswordVisible={isPasswordVisible}
                setIsPasswordVisible={setIsPasswordVisible}
                size={size}
              />
            ) : null}
            {onRandomize ? (
              <Stack
                alignItems="center"
                className={textInputStyle.ctaSuffix}
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
        <Helper
          helper={helper}
          error={error}
          success={success}
          size={size}
          disabled={disabled}
          id={ariaDescribedBy ?? helperId}
        />
      </Stack>
    )
  },
)
