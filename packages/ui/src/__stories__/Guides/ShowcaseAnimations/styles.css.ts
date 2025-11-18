import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'

export const animationShowCaseContainer = style({
  padding: theme.space[1],
  border: `1px solid ${theme.colors.neutral.border}`,
  margin: theme.space['0.25'],
})

export const animationShowCaseAnimatedElement = style({
  width: theme.sizing[300],
  height: theme.sizing[300],
  borderRadius: theme.radii.default,
  background: theme.colors.primary.background,
  border: theme.colors.primary.border,
})
