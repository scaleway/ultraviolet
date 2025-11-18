import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'

export const oneLineContainer = style({
  marginBottom: theme.space[2],
  marginTop: theme.space[2],
  width: 200,
  background: theme.colors.info.background,
  padding: theme.space[1],
})
