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
      borderColor: theme.colors.neutral.border,
      color: theme.colors.neutral.text,
    }
  }

  return {
    background: theme.colors[sentiment].background,
    borderColor: theme.colors[sentiment].background,
    color: theme.colors[sentiment].text,
  }
}

function getStrongStyle(sentiment: (typeof sentiments)[number]) {
  if (sentiment === 'neutral') {
    return {
      background: theme.colors.neutral.backgroundStronger,
      borderColor: theme.colors.neutral.borderStronger,
      color: theme.colors.neutral.textStronger,
    }
  }

  return {
    background: theme.colors[sentiment].backgroundStrong,
    borderColor: theme.colors[sentiment].backgroundStrong,
    color: theme.colors[sentiment].textStrong,
  }
}

const compoundVariants = [
  ...sentiments.map(sentiment => ({
    style: getDefaultStyle(sentiment),
    variants: {
      disabled: false,
      prominence: 'default' as const,
      sentiment,
    },
  })),
  ...sentiments.map(sentiment => ({
    style: getStrongStyle(sentiment),
    variants: {
      disabled: false,
      prominence: 'strong' as const,
      sentiment,
    },
  })),
]

export const badge = recipe({
  base: {
    alignItems: 'center',
    borderRadius: theme.radii.xlarge,
    borderStyle: 'solid',
    borderWidth: '1px',
    display: 'inline-flex',
    gap: theme.space['0.5'],
    justifyContent: 'center',
    textTransform: 'uppercase',
    width: 'fit-content',
  },
  compoundVariants,
  defaultVariants: {
    disabled: false,
    prominence: 'default',
    sentiment: 'neutral',
    size: 'medium',
  },
  variants: {
    disabled: {
      true: {
        backgroundColor: theme.colors.neutral.backgroundStrong,
        border: 'none',
        color: theme.colors.neutral.textWeak,
      },
    },

    prominence: {
      default: {},
      strong: {},
    },

    sentiment: {
      black: {},
      danger: {},
      info: {},
      neutral: {},
      primary: {},
      secondary: {},
      success: {},
      warning: {},
      white: {},
    },
    size: {
      large: {
        height: theme.sizing[SIZES.large],
        padding: `0 ${theme.space[2]}`,
      },
      medium: {
        height: theme.sizing[SIZES.medium],
        padding: `0 ${theme.space[1.5]}`,
      },
      small: {
        height: theme.sizing[SIZES.small],
        padding: `0 ${theme.space[1]}`,
      },
      xsmall: {
        height: theme.sizing[SIZES.xsmall],
        padding: `0 ${theme.space[1]}`,
      },
    },
  },
})

export type BadgeVariants = NonNullable<RecipeVariants<typeof badge>>
