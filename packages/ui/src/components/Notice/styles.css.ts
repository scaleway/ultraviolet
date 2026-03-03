import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'

const notice = style({
  alignItems: 'center',
  display: 'flex',
  gap: theme.space[1],
})

export const noticeStyle = { notice }
