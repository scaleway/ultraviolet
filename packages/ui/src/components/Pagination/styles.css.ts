import { style, styleVariants } from '@vanilla-extract/css'
import { theme } from '@ultraviolet/themes'

export const pageNumbersContainer = style({
  margin: `0 ${theme.space['1']}`,
})

export const pageButton = styleVariants({
  small: { width: theme.sizing[400] },
  medium: { width: theme.sizing[500] },
})

const ellipsisBase = style({
  alignContent: 'center',
  padding: theme.space[1],
})

export const ellipsisClass = styleVariants({
  small: [
    ellipsisBase,
    {
      height: theme.sizing[400],
      width: theme.sizing[400],
    },
  ],
  medium: [
    ellipsisBase,
    {
      height: theme.sizing[500],
      width: theme.sizing[500],
    },
  ],
})
