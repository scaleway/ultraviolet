import { theme } from '@ultraviolet/themes'
import { style, styleVariants } from '@vanilla-extract/css'
import type { RecipeVariants } from '@vanilla-extract/recipes'
import { recipe } from '@vanilla-extract/recipes'
import type { AlertSentiment } from './type'

function createStyleAlert(sentiment: AlertSentiment) {
  const sentimentColor = theme.colors[sentiment]

  return {
    backgroundColor: sentimentColor.background,
    borderLeft: `4px solid ${sentimentColor.border}`,
    color: sentimentColor.text,
  }
}
export const alert = recipe({
  base: {
    borderRadius: theme.radii.default,
  },
  defaultVariants: {
    sentiment: 'danger',
    size: 'medium',
  },
  variants: {
    sentiment: {
      danger: createStyleAlert('danger'),
      info: createStyleAlert('info'),
      neutral: {
        backgroundColor: theme.colors.neutral.backgroundWeak,
        borderLeft: `4px solid ${theme.colors.neutral.borderStronger}`,
        color: theme.colors.neutral.text,
      },
      success: createStyleAlert('success'),
      warning: createStyleAlert('warning'),
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
})

export const wrapAlert = style({
  width: '100%',
})

export const textAlert = style({
  color: theme.colors.neutral.text,
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
  alignSelf: 'flex-start',
})

export type AlertVariants = NonNullable<RecipeVariants<typeof alert>>

export const smallIcon = style({
  marginTop: theme.space['0.25'],
})
