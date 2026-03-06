'use client'

import { Stack } from '../../Stack'
import { Text } from '../../Text'

import type { ContentCardProps } from './type'

export const CardContent = ({
  title,
  subtitle,
  disabled,
  headingTag = 'h3',
  description,
  children,
}: ContentCardProps) => (
  <Stack flex="1 1 auto" gap={2} justifyContent="space-between">
    <Stack gap={0.5}>
      <Stack>
        {subtitle ? (
          <Text
            as="small"
            disabled={disabled}
            prominence="weak"
            sentiment="neutral"
            variant="caption"
          >
            {subtitle}
          </Text>
        ) : null}
        <Text
          as={headingTag}
          disabled={disabled}
          sentiment="neutral"
          variant="bodyStrong"
        >
          {title}
        </Text>
      </Stack>
      {description ? (
        <Text
          as="p"
          disabled={disabled}
          sentiment="neutral"
          variant="bodySmall"
        >
          {description}
        </Text>
      ) : null}
    </Stack>
    {children ? <Stack>{children}</Stack> : null}
  </Stack>
)
