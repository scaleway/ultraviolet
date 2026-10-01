'use client'

import { Stack } from '../../Layout/Stack'
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
}: LabelProps) => {
  const labelProps = { as, disabled, htmlFor, id, required, sentiment, size, style }

  if (labelDescription) {
    return (
      <Stack alignItems="center" className={className} direction="row" gap="1">
        <LabelRequiredOrNot {...labelProps}>{children}</LabelRequiredOrNot>
        {typeof labelDescription === 'string' ? (
          <Text as="span" variant="bodySmall">
            {labelDescription}
          </Text>
        ) : (
          labelDescription
        )}
      </Stack>
    )
  }

  return (
    <LabelRequiredOrNot className={className} {...labelProps}>
      {children}
    </LabelRequiredOrNot>
  )
}

Label.displayName = 'Label'
