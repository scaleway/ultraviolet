'use client'

import { useTheme } from '@ultraviolet/themes'
import { cn } from '@ultraviolet/utils'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { forwardRef, useId } from 'react'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'
import {
  checkboxContainer,
  checkboxInput,
  checkMixedMark,
  errorText,
  icon,
  iconPath,
  innerCheckbox,
  label,
} from './styles.css'

const CheckboxIconContainer = ({ children }: { children: ReactNode }) => {
  const theme = useTheme()

  return (
    <g>
      <rect
        className={innerCheckbox}
        height="16"
        rx={theme.radii.small}
        strokeWidth="2"
        width="16"
        x="4"
        y="4"
      />
      {children}
    </g>
  )
}

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
} & Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | 'autoFocus'
  | 'id'
  | 'name'
  | 'onBlur'
  | 'onChange'
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
    },
    ref,
  ) => {
    const uniqId = useId()
    const localId = id ?? uniqId

    const isCheck = checked === true ? checked : false

    return (
      <Tooltip text={tooltip}>
        <div
          aria-disabled={disabled}
          className={cn(className, checkboxContainer)}
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
            className={checkboxInput}
            disabled={disabled}
            id={localId}
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            ref={ref}
            required={required}
            style={style}
            tabIndex={tabIndex}
            type="checkbox"
            value={value}
          />

          <svg className={icon} fill="none" viewBox="0 0 24 24">
            <CheckboxIconContainer>
              {checked !== 'indeterminate' ? (
                <path
                  className={iconPath}
                  clipRule="evenodd"
                  d="M15.6678 5.26709C16.0849 5.6463 16.113 6.28907 15.7307 6.70276L9.29172 13.6705C9.10291 13.8748 8.83818 13.9937 8.55884 13.9998C8.2795 14.0058 8.0098 13.8984 7.81223 13.7024L4.30004 10.2185C3.89999 9.82169 3.89999 9.17831 4.30004 8.78149C4.70009 8.38467 5.34869 8.38467 5.74874 8.78149L8.50441 11.5149L14.2205 5.32951C14.6028 4.91583 15.2508 4.88788 15.6678 5.26709Z"
                  fill="white"
                  fillRule="evenodd"
                  height={9}
                  width={12}
                  x="5"
                  y="4"
                />
              ) : (
                <rect
                  className={checkMixedMark}
                  height="2"
                  rx="1"
                  width="12"
                  x="6"
                  y="11"
                />
              )}
            </CheckboxIconContainer>
          </svg>

          {children || required || helper || error ? (
            <Stack flex={1} gap={0.5}>
              {children || required ? (
                <Stack alignItems="center" direction="row" flex={1} gap={0.5}>
                  {children ? (
                    <>
                      {typeof children === 'string' ? (
                        <Text
                          as="label"
                          className={label}
                          htmlFor={localId}
                          prominence="default"
                          sentiment="neutral"
                          variant="body"
                        >
                          {children}
                        </Text>
                      ) : (
                        <label className={label} htmlFor={localId}>
                          {children}
                        </label>
                      )}
                    </>
                  ) : null}
                  {required ? (
                    <Text as="sup" sentiment="danger" variant="body">
                      *
                    </Text>
                  ) : null}
                </Stack>
              ) : null}

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
                  className={errorText}
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
