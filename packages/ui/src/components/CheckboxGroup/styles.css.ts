import { globalStyle, style } from '@vanilla-extract/css'

export const fieldset = style({
  border: 'none',
  margin: 0,
  padding: 0,
})

export const checkbox = style({})

globalStyle(`${checkbox} label`, {
  width: 'fit-content',
})
