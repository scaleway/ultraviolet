'use client'

import styled from '@emotion/styled'
import type { ComponentProps, ReactNode } from 'react'
import { Stack } from '../Stack'
import { Text } from '../Text'

const TextPointer = styled(Text)`
  cursor: ${({ disabled, htmlFor }) => {
    if (disabled) {
      return 'not-allowed'
    }

    if (htmlFor) {
      return 'pointer'
    }

    return 'text'
  }};
`

const LabelRequiredOrNot = ({
  children,
  required,
  id,
  size,
  htmlFor,
  as,
  sentiment,
  disabled,
}: LabelProps) =>
  required ? (
    <Stack alignItems="start" direction="row" gap="0.5">
      <TextPointer
        as={as === 'label' ? 'label' : 'legend'}
        disabled={disabled}
        htmlFor={htmlFor}
        id={id}
        sentiment={sentiment}
        variant={size === 'large' ? 'bodyStrong' : 'bodySmallStrong'}
      >
        {children}
      </TextPointer>
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
  ) : (
    <TextPointer
      as={as === 'label' ? 'label' : 'legend'}
      disabled={disabled}
      htmlFor={htmlFor}
      id={id}
      sentiment={sentiment}
      variant={size === 'large' ? 'bodyStrong' : 'bodySmallStrong'}
    >
      {children}
    </TextPointer>
  )

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
    >
      {children}
    </LabelRequiredOrNot>
  )
