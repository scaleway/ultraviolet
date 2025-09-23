import { theme } from '@ultraviolet/themes'
import type { RecipeVariants } from '@vanilla-extract/recipes'
import { recipe } from '@vanilla-extract/recipes'
import type { Color } from '../../theme'
import { style } from '@vanilla-extract/css'

const SENTIMENTS = [
  'danger',
  'info',
  'neutral',
  'primary',
  'secondary',
  'success',
  'warning',
] as Color[]

function getSentimentStyle(sentiment: (typeof SENTIMENTS)[number]) {
  return {
    color: theme.colors[sentiment].text,
    background: theme.colors[sentiment].background,
    border: `solid 1px ${sentiment === 'neutral' ? theme.colors.neutral.border : theme.colors[sentiment].background}`,
  }
}
export const containerTag = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    borderRadius: theme.radii.default,
    padding: `0 ${theme.space[1]}`,
    gap: theme.space[1],
    width: 'fit-content',
    height: theme.sizing[300],
  },
  variants: {
    copiable: {
      true: {
        selectors: {
          '&:hover, &:active': {
            cursor: 'pointer',
            background: theme.colors.neutral.backgroundWeakHover,
            borderColor: theme.colors.neutral.borderStrongHover,
          },
          '&:active': {
            boxShadow: theme.shadows.focusNeutral,
          },
        },
      },
    },

    sentiment: {
      danger: getSentimentStyle('danger'),
      info: getSentimentStyle('info'),
      neutral: getSentimentStyle('neutral'),
      primary: getSentimentStyle('primary'),
      secondary: getSentimentStyle('secondary'),
      success: getSentimentStyle('success'),
      warning: getSentimentStyle('warning'),
    },

    disabled: {
      true: {
        color: theme.colors.neutral.textDisabled,
        background: theme.colors.neutral.backgroundDisabled,
        border: `solid 1px ${theme.colors.neutral.borderDisabled}`,
        cursor: 'not-allowed',
      },
    },
  },
  defaultVariants: {
    copiable: false,
    disabled: false,
    sentiment: 'neutral',
  },
})

export const textTag = style({
  maxWidth: '14.5rem',
})

export const closeButtonTag = style({
  width: 'fit-content',
  height: 'fit-content',
  padding: theme.space['0.25'],
})

export type TagVariants = NonNullable<RecipeVariants<typeof containerTag>>
