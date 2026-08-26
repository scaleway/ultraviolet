import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'

export const carouselStoryContent = style({
  backgroundColor: theme.colors.info.background,
  color: theme.colors.info.text,
  padding: theme.space[3],
  textAlign: 'center',
  width: '100%',
})
