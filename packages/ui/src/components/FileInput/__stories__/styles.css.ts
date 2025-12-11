import { style } from '@vanilla-extract/css'

export const hereText = style({
  cursor: 'pointer',
  selectors: {
    '&:hover': {
      textDecoration: 'underline',
    },
  },
})
