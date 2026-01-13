import { createVar, style } from '@vanilla-extract/css'

export const animationDurationVar = createVar()

export const expandable = style({
  height: 'auto',
  selectors: {
    '&[data-is-animated="true"]': {
      transition: `
        max-height ${animationDurationVar} ease-out,
        opacity ${animationDurationVar} ease-out
      `,
    },
  },
})
