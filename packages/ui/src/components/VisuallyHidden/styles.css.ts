import { style } from '@vanilla-extract/css'

const visuallyHidden = style({
  selectors: {
    '&:not(:focus):not(:active):not(:focus-within)': {
      position: 'absolute',
      width: 1,
      height: 1,
      overflow: 'hidden',
      clip: 'rect(0 0 0 0)',
      clipPath: 'inset(50%)',
      whiteSpace: 'nowrap',
      border: 0,
      padding: 0,
    },
  },
})

export const visuallyHiddenStyle = { visuallyHidden }
