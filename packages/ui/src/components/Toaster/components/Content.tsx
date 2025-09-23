'use client'

import type { ReactNode } from 'react'
import { Stack } from '../../Stack'
import { Text } from '../../Text'

type ContentProps = {
  children?: ReactNode
}

export const Content = ({ children }: ContentProps) => (
  <Stack direction="row" gap={2} width="100%">
    {typeof children === 'string' ? (
      <Text as="span" variant="bodySmallStrong">
        {children}
      </Text>
    ) : (
      children
    )}
  </Stack>
)
