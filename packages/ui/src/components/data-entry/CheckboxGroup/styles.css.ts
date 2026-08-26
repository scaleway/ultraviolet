import { style } from '@vanilla-extract/css'

const fieldset = style({
  border: 'none',
  margin: 0,
  padding: 0,
})

const checkboxGroup = style({})

export const checkboxGroupStyle = { fieldset, checkboxGroup }
