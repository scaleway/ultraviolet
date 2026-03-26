'use client'

import { Stack } from '../Stack'
import { Text } from '../Text'

import { LabelRequiredOrNot } from './LabelContent'

import type { LabelProps } from './type'

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
  className,
}: LabelProps) =>
  labelDescription ? (
    <Stack alignItems="center" className={className} direction="row" gap="1">
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
      className={className}
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
