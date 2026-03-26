'use client'

import { cn } from '@ultraviolet/utils'
import { forwardRef, useId } from 'react'

import { Stack } from '../Stack'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'

import { CheckboxIconContainer } from './CheckboxIconContainer'
import { checkboxStyle } from './styles.css'

import type { InputHTMLAttributes, ReactNode } from 'react'

type LabelProp =
  | {
      children: ReactNode
      'aria-label'?: never
    }
  | {
      children?: never
      'aria-label': string
    }

type CheckboxProps = {
  error?: string | ReactNode
  helper?: ReactNode
  disabled?: boolean
  checked?: boolean | 'indeterminate'
  className?: string
  ['data-visibility']?: string
  required?: boolean
  'data-testid'?: string
  tooltip?: string
  size?: 'default' | 'small'
} & Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | 'autoFocus'
  | 'id'
  | 'name'
  | 'onBlur'
  | 'onChange'
  | 'onKeyDown'
  | 'onClick'
  | 'onFocus'
  | 'tabIndex'
  | 'value'
  | 'style'
> &
  LabelProp

/**
 * Checkbox is an input component used to select or deselect an option.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      id,
      checked = false,
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
      error,
      name,
      helper,
      value,
      children,
      disabled = false,
      autoFocus = false,
      className,
      'data-visibility': dataVisibility,
      'aria-label': ariaLabel,
      required,
      'data-testid': dataTestId,
      tooltip,
      tabIndex,
      style,
      size = 'default',
    },
    ref,
  ) => {
    const uniqId = useId()
    const localId = id ?? uniqId

    const styledChildren =
      typeof children === 'string' ? (
        <Text
          as="label"
          className={checkboxStyle.label}
          htmlFor={localId}
          prominence="default"
          sentiment="neutral"
          variant={size === 'small' ? 'bodySmall' : 'body'}
        >
          {children}
        </Text>
      ) : (
        <label className={checkboxStyle.label} htmlFor={localId}>
          {children}
        </label>
      )
    const isCheck = checked === true ? checked : false

    const childStack =
      children || required ? (
        <Stack alignItems="center" direction="row" flex={1} gap={0.5}>
          {children ? styledChildren : null}
          {required ? (
            <Text as="sup" sentiment="danger" variant="body">
              *
            </Text>
          ) : null}
        </Stack>
      ) : null

    return (
      <Tooltip text={tooltip}>
        <div
          aria-disabled={disabled}
          className={cn(className, checkboxStyle.container[size])}
          data-checked={checked}
          data-error={!!error}
          data-testid={dataTestId}
          data-visibility={dataVisibility}
        >
          <input
            aria-checked={checked === 'indeterminate' ? 'mixed' : isCheck}
            aria-describedby={error ? `${localId}-hint` : undefined}
            aria-invalid={!!error}
            aria-label={ariaLabel}
            autoFocus={autoFocus} // oxlint-disable-line jsx_a11y/no-autofocus
            checked={isCheck}
            className={checkboxStyle.input[size]}
            disabled={disabled}
            id={localId}
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
            ref={ref}
            required={required}
            style={style}
            tabIndex={tabIndex}
            type="checkbox"
            value={value}
          />
          <svg
            className={checkboxStyle.icon[size]}
            fill="none"
            viewBox="0 0 24 24"
          >
            <title>{name}</title>
            <CheckboxIconContainer checked={checked} />
          </svg>
          {children || required || helper || error ? (
            <Stack flex={1} gap={0.5}>
              {childStack}
              {helper ? (
                <Text
                  as="span"
                  prominence="weak"
                  sentiment="neutral"
                  variant="caption"
                >
                  {helper}
                </Text>
              ) : null}

              {error && typeof error !== 'boolean' ? (
                <Text
                  as="span"
                  className={checkboxStyle.errorText}
                  sentiment="danger"
                  variant="caption"
                >
                  {error}
                </Text>
              ) : null}
            </Stack>
          ) : null}
        </div>
      </Tooltip>
    )
  },
)
