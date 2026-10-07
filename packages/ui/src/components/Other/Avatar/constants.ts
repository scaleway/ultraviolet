import type { theme as UVTheme } from '@ultraviolet/themes'

export const ICON_SIZE_BY_AVATAR_SIZE = {
  large: 'xxlarge',
  medium: 'xlarge',
  small: 'large',
  xsmall: 'small',
  xxsmall: 'xsmall',
} as const

// Match the text variant with component size
export const TEXT_VARIANT_BY_SIZE = {
  large: 'headingLarge',
  medium: 'headingSmall',
  small: 'bodySmall',
  xsmall: 'captionSmall',
  xxsmall: 'captionSmall',
} as const

// Match the container size with actual px size
export const sizes = (theme: typeof UVTheme) =>
  ({
    large: '7rem', // Note: add this value to tokens
    medium: theme.sizing['800'],
    small: theme.sizing['400'],
    xsmall: theme.sizing['250'],
    xxsmall: theme.sizing['200'],
  }) as const

export const RADIUS_SIZES = {
  large: 'xxlarge',
  medium: 'xlarge',
  small: 'large',
  xsmall: 'default',
  xxsmall: 'default',
} as const

export const SIZES = ['large', 'medium', 'small', 'xsmall', 'xxsmall'] as const
export type Size = 'large' | 'medium' | 'small' | 'xsmall' | 'xxsmall'

// Defines all available sentiments for the eligible variants
export const SENTIMENTS = ['primary', 'neutral'] as const

// It's the default color set for the colors variant
export const DEFAULT_COLORS = ['primary', 'secondary'] as const
