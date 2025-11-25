import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'

export const notice = style({
  display: 'flex',
  alignItems: 'center',
  gap: theme.space[1],
})
