import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'

export const animationShowCaseContainer = style({
  border: `1px solid ${theme.colors.neutral.border}`,
  margin: theme.space['0.25'],
  padding: theme.space[1],
})

export const animationShowCaseAnimatedElement = style({
  background: theme.colors.primary.background,
  border: theme.colors.primary.border,
  borderRadius: theme.radii.default,
  height: theme.sizing[300],
  width: theme.sizing[300],
})
