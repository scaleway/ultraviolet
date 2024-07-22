// Match the text variant with component size
export const TEXT_VARIANT_BY_SIZE = {
  xsmall: 'captionSmall',
  small: 'bodySmall',
  medium: 'headingSmall',
  large: 'headingLarge',
} as const

// Match the container size with actual px size
export const SIZES = {
  xsmall: 20,
  small: 32,
  medium: 64,
  large: 112,
} as const

// Defines all available sentiments for the eligible variants
export const SENTIMENTS = ['primary', 'neutral'] as const

// It's the default color set for the colors variant
export const DEFAULT_COLORS = ['primary', 'secondary'] as const
