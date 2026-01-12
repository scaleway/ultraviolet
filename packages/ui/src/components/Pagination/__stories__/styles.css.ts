import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'

export const list = style({
  border: `1px solid ${theme.colors.neutral.border}`,
  height: '13.5rem',
  overflowY: 'auto',
  padding: theme.space[1],
})
