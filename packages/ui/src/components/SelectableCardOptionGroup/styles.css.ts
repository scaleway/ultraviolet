import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'

const fieldset = style({
  border: 'none',
  margin: 0,
  padding: 0,
})

const disabledImage = style({
  filter: 'grayscale(1) opacity(25%)',
})

const selectableCard = style({
  cursor: 'pointer',
  padding: 0,
  paddingTop: theme.space[2],
})

const optionFullHeight = style({ height: '100%' })

const optionSelectInput = style({})
const optionSelectInputDisabled = style({})
const optionSelectInputError = style({})

const optionPadded = style({
  padding: `0 ${theme.space[2]}`,
})

export const selectableCardOptionGroupStyle = {
  fieldset,
  disabledImage,
  selectableCard,
  optionFullHeight,
  optionSelectInput,
  optionSelectInputDisabled,
  optionSelectInputError,
  optionPadded,
}
