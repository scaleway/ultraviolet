import { style } from '@vanilla-extract/css'

export const styleButton = style({
  selectors: {
    '&:focus': {
      outline: '2px dotted black',
    },
    '&:focus::before': {
      content: '[has focus]',
    },
  },
})
