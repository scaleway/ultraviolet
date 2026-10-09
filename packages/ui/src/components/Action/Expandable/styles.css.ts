import { createVar, style } from '@vanilla-extract/css'

export const animationDurationVar = createVar()

const expandable = style({
  height: 'auto',
  selectors: {
    '&[data-is-animated="true"]': {
      transition: `
        max-height ${animationDurationVar} cubic-bezier(0.22, 1, 0.36, 1),
        opacity ${animationDurationVar} cubic-bezier(0.22, 1, 0.36, 1)
      `,
    },
  },
})
export const expandableStyle = { expandable }
