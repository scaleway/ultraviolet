import { styleVariants } from '@vanilla-extract/css'

export const textPointer = styleVariants({
  disabled: {
    cursor: 'not-allowed',
  },
  htmlFor: {
    cursor: 'pointer',
  },
  default: {
    cursor: 'text',
  },
})
