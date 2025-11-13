import type { theme as UVTheme } from '@ultraviolet/themes'

// Match the text variant with component size
export const TEXT_VARIANT_BY_SIZE = {
  large: 'headingLarge',
  medium: 'headingSmall',
  small: 'bodySmall',
  xsmall: 'captionSmall',
} as const

// Match the container size with actual px size
export const sizes = (theme: typeof UVTheme) =>
  ({
    large: '7rem', // Note: add this value to tokens
    medium: theme.sizing['800'],
    small: theme.sizing['400'],
    xsmall: theme.sizing['250'],
  }) as const

export const RADIUS_SIZES = {
  large: 'xxlarge',
  medium: 'xlarge',
  small: 'large',
  xsmall: 'default',
} as const

// Defines all available sentiments for the eligible variants
export const SENTIMENTS = ['primary', 'neutral'] as const

// It's the default color set for the colors variant
export const DEFAULT_COLORS = ['primary', 'secondary'] as const
