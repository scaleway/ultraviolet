'use client'

import type { ComponentProps } from 'react'
import { Text } from '../../Text'

export type ExpandableCardTitleProps = {
  size?: 'medium' | 'large'
  disabled?: boolean
} & Partial<Pick<ComponentProps<typeof Text>, 'as'>> &
  Pick<ComponentProps<typeof Text>, 'children'>
export const ExpandableCardTitle = ({
  as,
  size = 'medium',
  children,
  disabled,
}: ExpandableCardTitleProps) => (
  <Text
    as={as ?? 'h2'}
    variant={size === 'medium' ? 'bodyStrong' : 'headingSmallStrong'}
    sentiment="neutral"
    disabled={disabled}
  >
    {children}
  </Text>
)
