import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'

export const list = style({
  height: '13.5rem',
  overflowY: 'auto',
  border: `1px solid ${theme.colors.neutral.border}`,
  padding: theme.space[1],
})
