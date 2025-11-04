'use client'

import type { ComponentProps } from 'react'
import { Text } from '../../Text'

export type ExpandableCardTitleProps = {
  size?: 'medium' | 'large'
  disabled?: boolean
} & Partial<Pick<ComponentProps<typeof Text>, 'as' | 'style'>> &
  Pick<ComponentProps<typeof Text>, 'children'>
export const ExpandableCardTitle = ({
  as,
  size = 'medium',
  children,
  disabled,
  style,
}: ExpandableCardTitleProps) => (
  <Text
    as={as ?? 'h2'}
    disabled={disabled}
    sentiment="neutral"
    style={style}
    variant={size === 'medium' ? 'bodyStrong' : 'headingSmallStrong'}
  >
    {children}
  </Text>
)
