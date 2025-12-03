import { theme } from '@ultraviolet/themes'
import type { RecipeVariants } from '@vanilla-extract/recipes'
import { recipe } from '@vanilla-extract/recipes'
import { SIZES } from './constant'

const sentiments = [
  'primary',
  'secondary',
  'danger',
  'info',
  'success',
  'warning',
  'neutral',
] as const

function getDefaultStyle(sentiment: (typeof sentiments)[number]) {
  if (sentiment === 'neutral') {
    return {
      background: theme.colors.neutral.backgroundWeak,
      color: theme.colors.neutral.text,
      borderColor: theme.colors.neutral.border,
    }
  }

  return {
    background: theme.colors[sentiment].background,
    color: theme.colors[sentiment].text,
    borderColor: theme.colors[sentiment].background,
  }
}

function getStrongStyle(sentiment: (typeof sentiments)[number]) {
  if (sentiment === 'neutral') {
    return {
      background: theme.colors.neutral.backgroundStronger,
      color: theme.colors.neutral.textStronger,
      borderColor: theme.colors.neutral.borderStronger,
    }
  }

  return {
    background: theme.colors[sentiment].backgroundStrong,
    color: theme.colors[sentiment].textStrong,
    borderColor: theme.colors[sentiment].backgroundStrong,
  }
}

export const badge = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radii.xlarge,
    width: 'fit-content',
    borderWidth: '1px',
    borderStyle: 'solid',
    textTransform: 'uppercase',
    gap: theme.space['0.5'],
  },
  variants: {
    size: {
      small: {
        padding: `0 ${theme.space[1]}`,
        height: theme.sizing[SIZES.small],
      },
      medium: {
        padding: `0 ${theme.space[1.5]}`,
        height: theme.sizing[SIZES.medium],
      },
      large: {
        padding: `0 ${theme.space[2]}`,
        height: theme.sizing[SIZES.large],
      },
      xsmall: {
        padding: `0 ${theme.space[1]}`,
        height: theme.sizing[SIZES.xsmall],
      },
    },

    sentiment: {
      primary: {},
      secondary: {},
      danger: {},
      info: {},
      success: {},
      warning: {},
      neutral: {},
      black: {},
      white: {},
    },

    prominence: {
      default: {},
      strong: {},
    },
    disabled: {
      true: {
        border: 'none',
        color: theme.colors.neutral.textWeak,
        backgroundColor: theme.colors.neutral.backgroundStrong,
      },
    },
  },

  compoundVariants: [
    ...sentiments.map(sentiment => ({
      variants: {
        prominence: 'default' as const,
        sentiment,
        disabled: false,
      },
      style: getDefaultStyle(sentiment),
    })),
    ...sentiments.map(sentiment => ({
      variants: {
        prominence: 'strong' as const,
        sentiment,
        disabled: false,
      },
      style: getStrongStyle(sentiment),
    })),
  ],
  defaultVariants: {
    size: 'medium',
    prominence: 'default',
    sentiment: 'neutral',
    disabled: false,
  },
})

export type BadgeVariants = NonNullable<RecipeVariants<typeof badge>>
