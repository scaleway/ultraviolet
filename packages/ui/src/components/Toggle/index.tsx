'use client'

import { cn } from '@ultraviolet/utils'
import type { InputHTMLAttributes, ReactNode, Ref } from 'react'
import { forwardRef, useId } from 'react'
import { Row } from '../Row'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'
import { checkbox, label as labelReceipe, toggle } from './styles.css'

type ToggleProps = {
  checked?: boolean
  tooltip?: string
  size?: 'large' | 'small'
  labelPosition?: 'left' | 'right'
  label?: ReactNode
  'aria-label'?: string
  helper?: ReactNode
  className?: string
  error?: boolean | string
  'data-testid'?: string
} & Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | 'id'
  | 'disabled'
  | 'name'
  | 'tabIndex'
  | 'required'
  | 'onChange'
  | 'onKeyDown'
  | 'onFocus'
  | 'onBlur'
  | 'value'
  | 'checked'
  | 'style'
>

export const Toggle = forwardRef(
  (
    {
      checked,
      disabled = false,
      id,
      name,
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
      size = 'large',
      tooltip,
      labelPosition = 'right',
      label,
      helper,
      tabIndex,
      required,
      className,
      'data-testid': dataTestId,
      value,
      error,
      'aria-label': ariaLabel,
      style,
    }: ToggleProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    const uniqueId = useId()
    const localId = id ?? uniqueId

    return (
      <Tooltip text={tooltip}>
        <label
          aria-disabled={disabled}
          className={cn(
            className,
            labelReceipe({
              disabled,
              labelPosition,
            }),
          )}
          data-testid={dataTestId}
          htmlFor={localId}
        >
          <Stack alignItems="baseline" gap={0.25}>
            {label ? (
              <Row alignItems="center" gap={1} templateColumns="auto 1fr">
                {typeof label === 'string' ? (
                  <Text
                    as="span"
                    htmlFor={localId}
                    prominence="default"
                    sentiment="neutral"
                    variant={size === 'large' ? 'body' : 'bodySmall'}
                  >
                    {label}
                  </Text>
                ) : (
                  label
                )}
                {required ? (
                  <Text as="sup" sentiment="danger" variant="body">
                    *
                  </Text>
                ) : null}
              </Row>
            ) : null}
            {typeof error === 'string' ? (
              <Text
                as="p"
                disabled={disabled}
                prominence="default"
                sentiment="danger"
                variant="bodySmall"
              >
                {error}
              </Text>
            ) : null}
            {helper && !error ? (
              <Text
                as="p"
                prominence="weak"
                sentiment="neutral"
                variant="caption"
              >
                {helper}
              </Text>
            ) : null}
          </Stack>
          <div
            className={toggle({
              disabled,
              error: !!error,
              size,
            })}
          >
            <input
              aria-disabled={disabled}
              aria-invalid={!!error}
              aria-label={ariaLabel}
              checked={checked}
              className={checkbox}
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
          </div>
        </label>
      </Tooltip>
    )
  },
)
