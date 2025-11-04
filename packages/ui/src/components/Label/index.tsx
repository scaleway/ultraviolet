'use client'

import type { ComponentProps, CSSProperties, ReactNode } from 'react'
import { useMemo } from 'react'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { textPointer } from './styles.css'

const LabelRequiredOrNot = ({
  children,
  required,
  id,
  size,
  htmlFor,
  as,
  sentiment,
  disabled,
  style,
}: LabelProps) => {
  const textPointerValue = useMemo(() => {
    if (disabled) {
      return 'disabled'
    }

    if (htmlFor) {
      return 'htmlFor'
    }

    return 'default'
  }, [disabled, htmlFor])

  if (required) {
    return (
      <Stack alignItems="start" direction="row" gap="0.5" style={style}>
        <Text
          as={as === 'label' ? 'label' : 'legend'}
          className={textPointer[textPointerValue]}
          disabled={disabled}
          htmlFor={htmlFor}
          id={id}
          sentiment={sentiment}
          variant={size === 'large' ? 'bodyStrong' : 'bodySmallStrong'}
        >
          {children}
        </Text>
        <Text
          aria-label="required"
          as="span"
          disabled={disabled}
          sentiment="danger"
          variant={size === 'large' ? 'bodyStrong' : 'bodySmallStrong'}
        >
          *
        </Text>
      </Stack>
    )
  }

  return (
    <Text
      as={as === 'label' ? 'label' : 'legend'}
      className={textPointer[textPointerValue]}
      disabled={disabled}
      htmlFor={htmlFor}
      id={id}
      sentiment={sentiment}
      style={style}
      variant={size === 'large' ? 'bodyStrong' : 'bodySmallStrong'}
    >
      {children}
    </Text>
  )
}

type LabelProps = {
  /**
   * As can help you to define a label or a legend in case you are using it inside a fieldset
   */
  as?: 'label' | 'legend'
  children?: string
  labelDescription?: ReactNode
  required?: boolean
  size?: 'small' | 'medium' | 'large'
  htmlFor?: string
  id?: string
  sentiment?: ComponentProps<typeof Text>['sentiment']
  disabled?: boolean
  style?: CSSProperties
}

/**
 * Label is used inside all of our input components, but it can be used outside for design purposes
 */
export const Label = ({
  as = 'label',
  children,
  labelDescription,
  required,
  size = 'large',
  htmlFor,
  id,
  sentiment = 'neutral',
  disabled,
  style,
}: LabelProps) =>
  labelDescription ? (
    <Stack alignItems="center" direction="row" gap="1">
      <LabelRequiredOrNot
        as={as}
        disabled={disabled}
        htmlFor={htmlFor}
        id={id}
        required={required}
        sentiment={sentiment}
        size={size}
        style={style}
      >
        {children}
      </LabelRequiredOrNot>
      {typeof labelDescription === 'string' ? (
        <Text as="span" variant="bodySmall">
          {labelDescription}
        </Text>
      ) : (
        labelDescription
      )}
    </Stack>
  ) : (
    <LabelRequiredOrNot
      as={as}
      disabled={disabled}
      htmlFor={htmlFor}
      id={id}
      required={required}
      sentiment={sentiment}
      size={size}
      style={style}
    >
      {children}
    </LabelRequiredOrNot>
  )
