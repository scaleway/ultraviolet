import { style } from '@vanilla-extract/css'
import { theme } from '@ultraviolet/themes'

export const passwordCheckContainer = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: theme.space['1'],
})
