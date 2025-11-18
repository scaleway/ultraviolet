import { theme } from '@ultraviolet/themes'
import { style, styleVariants } from '@vanilla-extract/css'
import type { RecipeVariants } from '@vanilla-extract/recipes'
import { recipe } from '@vanilla-extract/recipes'
import type { AlertSentiment } from './type'

function createStyleAlert(sentiment: AlertSentiment) {
  const sentimentColor = theme.colors[sentiment]

  return {
    backgroundColor: sentimentColor.background,
    color: sentimentColor.text,
    borderLeft: `4px solid ${sentimentColor.border}`,
  }
}
export const alert = recipe({
  base: {
    borderRadius: theme.radii.default,
  },
  variants: {
    sentiment: {
      danger: createStyleAlert('danger'),
      info: createStyleAlert('info'),
      success: createStyleAlert('success'),
      warning: createStyleAlert('warning'),
      neutral: {
        backgroundColor: theme.colors.neutral.backgroundWeak,
        color: theme.colors.neutral.text,
        borderLeft: `4px solid ${theme.colors.neutral.borderStronger}`,
      },
    },
    size: {
      medium: {
        padding: theme.space[2],
      },
      small: {
        padding: theme.space['1.5'],
      },
    },
  },
  defaultVariants: {
    sentiment: 'danger',
    size: 'medium',
  },
})

export const wrapAlert = style({
  width: '100%',
})

export const textAlert = style({
  color: theme.colors.neutral.text,
  paddingTop: theme.space['0.25'],
})

export const buttonAlert = styleVariants({
  medium: {
    marginLeft: theme.space[5],
  },
  small: {
    marginLeft: theme.space[3],
  },
})

export const buttonCloseAlert = style({
  alignSelf: 'start',
})

export type AlertVariants = NonNullable<RecipeVariants<typeof alert>>
