import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'

export const selectableCardOptionFieldSet = style({
  border: 'none',
  margin: 0,
  padding: 0,
})

export const disabledImage = style({
  filter: 'grayscale(1) opacity(25%)',
})

export const selectableCard = style({
  cursor: 'pointer',
  padding: 0,
  paddingTop: theme.space[2],
})

export const optionFullHeight = style({ height: '100%' })

export const optionSelectInput = style({})
export const optionSelectInputDisabled = style({})
export const optionSelectInputError = style({})

export const optionPadded = style({
  padding: `0 ${theme.space[2]}`,
})
