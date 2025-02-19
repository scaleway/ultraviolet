import type { ReactNode } from 'react'
import { Stack } from '../Stack'
import { Text } from '../Text'

const LabelRequiredOrNot = ({
  children,
  required,
  id,
  size,
  htmlFor,
}: LabelProps) =>
  required ? (
    <Stack direction="row" gap="0.5" alignItems="start">
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
    >
      {children}
    </LabelRequiredOrNot>
  )
