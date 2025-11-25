import { fadeIn, fadeOut } from '@ultraviolet/ui'
import { style } from '@vanilla-extract/css'

export const animation = style({
  animation: `${fadeIn} 300ms ease-in-out`,
  selectors: {
    "&[data-expanded='false']": {
      animation: `${fadeOut} 250ms ease-in-out`,
    },
  },
})
