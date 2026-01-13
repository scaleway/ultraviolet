import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'

export const oneLineContainer = style({
  background: theme.colors.info.background,
  marginBottom: theme.space[2],
  marginTop: theme.space[2],
  padding: theme.space[1],
  width: 200,
})
