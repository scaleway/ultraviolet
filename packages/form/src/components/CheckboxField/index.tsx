import { Checkbox } from '@scaleway/ui'
import type { FieldState } from 'final-form'
import type { ComponentProps, ReactNode, Ref } from 'react'
import { forwardRef } from 'react'
import { useFormField } from '../../hooks'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type CheckboxValue = string

type CheckboxFieldProps<T = CheckboxValue, K = string> = BaseFieldProps<T, K> &
  Partial<
    Pick<
      ComponentProps<typeof Checkbox>,
      | 'disabled'
      | 'onBlur'
      | 'onChange'
      | 'onFocus'
      | 'progress'
      | 'size'
      | 'value'
    >
  > & {
    name: string
    label?: string
    className?: string
    children?: ReactNode
    required?: boolean
  }

export const CheckboxField = forwardRef(
  (
    {
      validate,
      name,
      label = '',
      size,
      progress,
      disabled,
      required,
      className,
      children,
      onChange,
      onBlur,
      onFocus,
      value,
    }: CheckboxFieldProps,
    ref: Ref<HTMLInputElement>,
  ): JSX.Element => {
    const { getError } = useErrors()

    const { input, meta } = useFormField(name, {
      disabled,
      required,
      type: 'checkbox',
      validate,
      value,
    })

    const error = getError({
      label,
      meta: meta as FieldState<unknown>,
      name,
      value: input.value ?? input.checked,
    })

    return (
      <Checkbox
        name={input.name}
        onChange={event => {
          input.onChange(event)
          onChange?.(event)
        }}
        onBlur={event => {
          input.onBlur(event)
          onBlur?.(event)
        }}
        onFocus={event => {
          input.onFocus(event)
          onFocus?.(event)
        }}
        size={size}
        progress={progress}
        disabled={disabled}
        checked={input.checked}
        error={error}
        ref={ref}
        className={className}
        value={input.value}
        required={required}
      >
        {children}
      </Checkbox>
    )
  },
)
