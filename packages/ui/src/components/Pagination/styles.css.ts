import { theme } from '@ultraviolet/themes'
import { style, styleVariants } from '@vanilla-extract/css'

export const pageNumbersContainer = style({
  margin: `0 ${theme.space['1']}`,
})

export const pageButton = styleVariants({
  medium: { width: theme.sizing[500] },
  small: { width: theme.sizing[400] },
})

const ellipsisBase = style({
  alignContent: 'center',
  padding: theme.space[1],
})

export const ellipsisClass = styleVariants({
  medium: [
    ellipsisBase,
    {
      height: theme.sizing[500],
      width: theme.sizing[500],
    },
  ],
  small: [
    ellipsisBase,
    {
      height: theme.sizing[400],
      width: theme.sizing[400],
    },
  ],
})
