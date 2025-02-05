import { AsteriskIcon } from '@ultraviolet/icons'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { Stack } from '../Stack'
import { Text } from '../Text'

type LabelProps = {
  children?: string
  labelDescription?: ReactNode
  required?: boolean
  size?: 'small' | 'medium' | 'large'
  htmlFor?: string
  id?: string
} & Pick<InputHTMLAttributes<HTMLInputElement>, 'aria-labelledby'>

/**
 * Label is used inside all of our input components, but it can be used outside for design purposes
 */
export const Label = ({
  children,
  labelDescription,
  required,
  size = 'medium',
  htmlFor,
  id,
  'aria-labelledby': ariaLabelledBy,
}: LabelProps) => {
  const LabelRequiredOrNot = () =>
    required ? (
      <Stack direction="row" gap="0.5" alignItems="start">
        <Text
          as="label"
          id={id}
          variant={size === 'large' ? 'bodyStrong' : 'bodySmallStrong'}
          sentiment="neutral"
          htmlFor={htmlFor}
          prominence="strong"
          aria-labelledBy={ariaLabelledBy}
        >
          {children}
        </Text>
        <AsteriskIcon sentiment="danger" size={8} />
      </Stack>
    ) : (
      <Text
        as="label"
        id={ariaLabelledBy}
        variant={size === 'large' ? 'bodyStrong' : 'bodySmallStrong'}
        sentiment="neutral"
        htmlFor={htmlFor}
        prominence="strong"
      >
        {children}
      </Text>
    )

  return labelDescription ? (
    <Stack direction="row" gap="1" alignItems="center">
      <LabelRequiredOrNot />
      {typeof labelDescription === 'string' ? (
        <Text as="label" variant="bodySmall">
          {labelDescription}
        </Text>
      ) : (
        labelDescription
      )}
    </Stack>
  ) : (
    <LabelRequiredOrNot />
  )
}
