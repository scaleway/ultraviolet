'use client'

import type {
  ChangeEventHandler,
  InputHTMLAttributes,
  ReactNode,
  Ref,
} from 'react'
import { forwardRef, useId } from 'react'
import { Row } from '../Row'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'
import { checkbox, label as labelReceipe, toggle } from './styles.css'

type ToggleProps = {
  id?: string
  checked?: boolean
  name?: string
  tooltip?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  size?: 'large' | 'small'
  labelPosition?: 'left' | 'right'
  label?: ReactNode
  'aria-label'?: string
  helper?: ReactNode
  disabled?: boolean
  className?: string
  required?: boolean
  error?: boolean | string
  'data-testid'?: string
} & Pick<InputHTMLAttributes<HTMLInputElement>, 'value'>

export const Toggle = forwardRef(
  (
    {
      checked,
      disabled = false,
      id,
      name,
      onChange,
      size = 'large',
      tooltip,
      labelPosition = 'right',
      label,
      helper,
      required,
      className,
      'data-testid': dataTestId,
      value,
      error,
      'aria-label': ariaLabel,
    }: ToggleProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    const uniqueId = useId()

    return (
      <Tooltip text={tooltip}>
        <label
          aria-disabled={disabled}
          className={`${className ? `${className} ` : ''}${labelReceipe({
            disabled,
            labelPosition,
          })}`}
          data-testid={dataTestId}
        >
          <Stack alignItems="baseline" gap={0.25}>
            {label ? (
              <Row alignItems="center" gap={1} templateColumns="auto 1fr">
                {typeof label === 'string' ? (
                  <Text
                    as="span"
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
              aria-invalid={!!error}
              aria-label={ariaLabel}
              checked={checked}
              className={checkbox}
              disabled={disabled}
              id={id ?? uniqueId}
              name={name}
              onChange={onChange}
              ref={ref}
              required={required}
              type="checkbox"
              value={value}
            />
          </div>
        </label>
      </Tooltip>
    )
  },
)
