import { theme } from '@ultraviolet/themes'
import { style, styleVariants } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import type { AlertSentiment } from './type'
import type { RecipeVariants } from '@vanilla-extract/recipes'

function createStyleAlert(sentiment: AlertSentiment) {
  const sentimentColor = theme.colors[sentiment]

  return {
    backgroundColor: sentimentColor.background,
    borderLeft: `4px solid ${sentimentColor.border}`,
    color: sentimentColor.text,
  }
}

const alert = recipe({
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

const wrap = style({
  width: '100%',
})

const text = style({
  color: theme.colors.neutral.text,
})

const button = styleVariants({
  medium: {
    marginLeft: theme.space[5],
  },
  small: {
    marginLeft: theme.space[3],
  },
})

const buttonClose = style({
  alignSelf: 'flex-start',
})

export type AlertVariants = NonNullable<RecipeVariants<typeof alert>>

const icon = style({
  marginTop: theme.space['0.25'],
})

export const alertStyle = {
  alert,
  wrap,
  text,
  button,
  buttonClose,
  icon,
}
