import type { Theme } from '@emotion/react'

// Match the text variant with component size
export const TEXT_VARIANT_BY_SIZE = {
  xsmall: 'captionSmall',
  small: 'bodySmall',
  medium: 'headingSmall',
  large: 'headingLarge',
} as const

// Match the container size with actual px size
export const sizes = (theme: Theme) =>
  ({
    xsmall: theme.sizing['250'],
    small: theme.sizing['400'],
    medium: theme.sizing['800'],
    large: '7rem', // TODO: add this value to tokens
  }) as const

export const RADIUS_SIZES = {
  xsmall: 'default',
  small: 'large',
  medium: 'xlarge',
  large: 'xxlarge',
} as const

// Defines all available sentiments for the eligible variants
export const SENTIMENTS = ['primary', 'neutral'] as const

// It's the default color set for the colors variant
export const DEFAULT_COLORS = ['primary', 'secondary'] as const
