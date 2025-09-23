import { globalStyle, style } from '@vanilla-extract/css'

export const fieldset = style({
  border: 'none',
  padding: 0,
  margin: 0,
})

export const checkbox = style({})

globalStyle(`${checkbox} label`, {
  width: 'fit-content',
})
