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
    <Stack direction="row" gap="0.5" alignItems="start">
      <TextPointer
        as={as === 'label' ? 'label' : 'legend'}
        id={id}
        variant={size === 'large' ? 'bodyStrong' : 'bodySmallStrong'}
        sentiment={sentiment}
        htmlFor={htmlFor}
        disabled={disabled}
      >
        {children}
      </TextPointer>
      <Text
        as="span"
        variant={size === 'large' ? 'bodyStrong' : 'bodySmallStrong'}
        sentiment="danger"
        aria-label="required"
        disabled={disabled}
      >
        *
      </Text>
    </Stack>
  ) : (
    <TextPointer
      as={as === 'label' ? 'label' : 'legend'}
      id={id}
      variant={size === 'large' ? 'bodyStrong' : 'bodySmallStrong'}
      sentiment={sentiment}
      htmlFor={htmlFor}
      disabled={disabled}
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
    <Stack direction="row" gap="1" alignItems="center">
      <LabelRequiredOrNot
        required={required}
        size={size}
        htmlFor={htmlFor}
        id={id}
        as={as}
        sentiment={sentiment}
        disabled={disabled}
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
      required={required}
      size={size}
      htmlFor={htmlFor}
      id={id}
      as={as}
      sentiment={sentiment}
      disabled={disabled}
    >
      {children}
    </LabelRequiredOrNot>
  )
