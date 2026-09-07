import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'

export const divWithBackground = style({
  alignItems: 'center',
  background: theme.colors.primary.background,
  border: `1px solid ${theme.colors.primary.border}`,
  borderRadius: theme.radii.default,
  color: theme.colors.primary.text,
  display: 'flex',
  justifyContent: 'center',
  padding: theme.space[1],
})
