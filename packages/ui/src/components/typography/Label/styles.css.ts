import { styleVariants } from '@vanilla-extract/css'

const textPointer = styleVariants({
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

export const labelStyle = { textPointer }
