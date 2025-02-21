import type { ReactNode } from 'react'
import { Stack } from '../Stack'
import { Text } from '../Text'

const LabelRequiredOrNot = ({
  children,
  required,
  id,
  size,
  htmlFor,
  as,
}: LabelProps) =>
  required ? (
    <Stack direction="row" gap="0.5" alignItems="start">
      <Text
        as={as === 'label' ? 'label' : 'legend'}
        id={id}
        variant={size === 'large' ? 'bodyStrong' : 'bodySmallStrong'}
        sentiment="neutral"
        htmlFor={htmlFor}
        prominence="strong"
      >
        {children}
      </Text>
      <Text
        as="span"
        variant={size === 'large' ? 'bodyStrong' : 'bodySmallStrong'}
        sentiment="danger"
        aria-label="required"
      >
        *
      </Text>
    </Stack>
  ) : (
    <Text
      as="label"
      id={id}
      variant={size === 'large' ? 'bodyStrong' : 'bodySmallStrong'}
      sentiment="neutral"
      htmlFor={htmlFor}
      prominence="strong"
    >
      {children}
    </Text>
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
}: LabelProps) =>
  labelDescription ? (
    <Stack direction="row" gap="1" alignItems="center">
      <LabelRequiredOrNot
        required={required}
        size={size}
        htmlFor={htmlFor}
        id={id}
        as={as}
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
    >
      {children}
    </LabelRequiredOrNot>
  )
