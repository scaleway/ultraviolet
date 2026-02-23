import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'

const container = style({
  display: 'grid',
  gap: theme.space['1'],
  gridTemplateColumns: 'repeat(2, 1fr)',
})
export const passwordCheckStyle = { container }
