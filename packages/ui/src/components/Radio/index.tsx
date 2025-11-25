'use client'

import type { InputHTMLAttributes, ReactNode } from 'react'
import { forwardRef, useId } from 'react'
import type { LabelProp } from '../../types'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'
import {
  container,
  innerCircleRing,
  labelStyle,
  margedText,
  radio,
  radioMark,
  radioStack,
  ring,
  textLabel,
} from './styles.css'

const RadioMarkedIcon = () => (
  <g>
    <circle cx="12" cy="12" r="10" strokeWidth="2" />
    <circle className={innerCircleRing} cx="12" cy="12" r="8" />
    <circle className={radioMark} cx="12" cy="12" r="5" />
  </g>
)

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
      tabIndex,
      id,
      style,
    },
    forwadedRef,
  ) => {
    const generatedId = useId()
    const localId = id || generatedId

    return (
      <Tooltip text={tooltip}>
        <Stack className={radioStack} gap={0.5}>
          <div
            aria-disabled={disabled}
            className={`${className ? `${className} ` : ''}${container}`}
            data-checked={checked}
            data-error={error}
            data-testid={dataTestId}
          >
            <input
              aria-disabled={disabled}
              aria-invalid={!!error} // oxlint-disable-line eslint-plugin-jsx-a11y(role-supports-aria-props)
              aria-label={ariaLabel}
              autoFocus={autoFocus}
              checked={checked}
              className={radio}
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
            <svg className={ring} viewBox="0 0 24 24">
              <RadioMarkedIcon />
            </svg>
            {label ? (
              <>
                {typeof label === 'string' ? (
                  <Text
                    as="label"
                    className={textLabel}
                    htmlFor={localId}
                    prominence="default"
                    variant="body"
                  >
                    {label}
                  </Text>
                ) : (
                  <label className={labelStyle} htmlFor={localId}>
                    {label}
                  </label>
                )}
              </>
            ) : null}
          </div>
          {helper ? (
            <Text
              as="span"
              className={margedText}
              prominence="weak"
              sentiment="neutral"
              variant="caption"
            >
              {helper}
            </Text>
          ) : null}
        </Stack>
      </Tooltip>
    )
  },
)
