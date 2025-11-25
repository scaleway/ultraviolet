import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'

export const carouselStoryContent = style({
  backgroundColor: theme.colors.info.background,
  width: '100%',
  padding: theme.space[3],
  color: theme.colors.info.text,
  textAlign: 'center',
})
