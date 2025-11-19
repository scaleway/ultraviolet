import { style } from '@vanilla-extract/css'

export const capitalizeText = style({
  selectors: {
    '&::first-letter': {
      textTransform: 'capitalize',
    },
  },
})

export const row = style({ width: '100%' })
