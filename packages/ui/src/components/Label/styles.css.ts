import { styleVariants } from '@vanilla-extract/css'

export const textPointer = styleVariants({
  default: {
    cursor: 'text',
  },
  disabled: {
    cursor: 'not-allowed',
  },
  htmlFor: {
    cursor: 'pointer',
  },
})
