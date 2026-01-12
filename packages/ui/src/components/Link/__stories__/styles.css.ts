import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'

export const containerStoryLink = style({
  background: theme.colors.info.background,
  marginBottom: theme.space[2],
  marginTop: theme.space[1],
  padding: theme.space[1],
  width: 200,
})
