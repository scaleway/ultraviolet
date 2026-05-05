'use client'

import { cn } from '@ultraviolet/utils'
import { forwardRef, useId } from 'react'

import { hasHelperText } from '../../helpers/hasHelperText'
import { Helper } from '../Helper'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'

import { RadioMarkedIcon } from './MarkedIcon'
import { radioStyle } from './styles.css'

import type { LabelProp } from '../../types'
import type { InputHTMLAttributes, ReactNode } from 'react'

type RadioProps = {
  error?: ReactNode
  value: string | number
  helper?: ReactNode
  className?: string
  'data-testid'?: string
  tooltip?: string
} & Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'onChange'>> &
  Pick<
    InputHTMLAttributes<HTMLInputElement>,
    | 'onFocus'
    | 'onBlur'
    | 'disabled'
    | 'autoFocus'
    | 'onKeyDown'
    | 'id'
    | 'name'
    | 'required'
    | 'tabIndex'
    | 'checked'
    | 'onClick'
    | 'style'
    | 'aria-describedby'
  > &
  LabelProp

/**
 * Radio component is used to select a single option from a list of options. It is a type of input component.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      checked = false,
      onChange,
      onFocus,
      onBlur,
      disabled = false,
      error,
      name,
      value,
      label,
      helper,
      className,
      autoFocus,
      onKeyDown,
      tooltip,
      'aria-label': ariaLabel,
      'data-testid': dataTestId,
      'aria-describedby': ariaDescribedBy,
      tabIndex,
      id,
      style,
    },
    forwadedRef,
  ) => {
    const generatedId = useId()
    const helperId = useId()
    const localId = id ?? generatedId

    return (
      <Tooltip text={tooltip}>
        <Stack className={radioStyle.stack} gap={0.5}>
          <div
            aria-disabled={disabled}
            className={cn(className, radioStyle.container)}
            data-checked={checked}
            data-error={error}
            data-testid={dataTestId}
          >
            <input
              aria-describedby={
                !ariaDescribedBy && hasHelperText(helper, error)
                  ? helperId
                  : ariaDescribedBy
              }
              aria-disabled={disabled}
              aria-invalid={!!error} // oxlint-disable-line eslint-plugin-jsx-a11y(role-supports-aria-props)
              aria-label={ariaLabel}
              autoFocus={autoFocus} // oxlint-disable-line jsx_a11y/no-autofocus
              checked={checked}
              className={radioStyle.radio}
              disabled={disabled}
              id={localId}
              name={name}
              onBlur={onBlur}
              onChange={onChange}
              onFocus={onFocus}
              onKeyDown={onKeyDown}
              ref={forwadedRef}
              style={style}
              tabIndex={tabIndex}
              type="radio"
              value={value}
            />
            <svg className={radioStyle.ring} viewBox="0 0 24 24">
              <title>radio</title>
              <RadioMarkedIcon />
            </svg>
            {label ? (
              // biome-ignore lint/complexity/noUselessFragments: needed
              <>
                {typeof label === 'string' ? (
                  <Text
                    as="label"
                    className={cn(radioStyle.textLabel, radioStyle.label)}
                    htmlFor={localId}
                    prominence="default"
                    variant="body"
                  >
                    {label}
                  </Text>
                ) : (
                  <label
                    className={cn(radioStyle.labelStyle, radioStyle.label)}
                    htmlFor={localId}
                  >
                    {label}
                  </label>
                )}
              </>
            ) : null}
          </div>
          <Helper
            error={error}
            helper={helper}
            id={ariaDescribedBy ?? helperId}
            disabled={disabled}
          />
        </Stack>
      </Tooltip>
    )
  },
)
