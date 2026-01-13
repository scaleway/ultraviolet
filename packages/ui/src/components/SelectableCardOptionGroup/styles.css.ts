import { theme } from '@ultraviolet/themes'
import { globalStyle, style } from '@vanilla-extract/css'
import { radioStack } from '../Radio/styles.css'
import { selectBarBase } from '../SelectInput/components/selectBar.css'

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

globalStyle(`${selectableCard} ${radioStack}`, {
  marginTop: `calc(-1 * ${theme.space[2]})`,
  padding: theme.space[1],
  position: 'absolute',
})

export const optionFullHeight = style({ height: '100%' })

export const optionSelectInput = style({})
export const optionSelectInputDisabled = style({})
export const optionSelectInputError = style({})

globalStyle(`${optionSelectInput} ${selectBarBase}`, {
  borderBottom: 0,
  borderLeft: 0,
  borderRadius: `0 0 ${theme.radii.default} ${theme.radii.default}`,
  borderRight: 0,
})

globalStyle(
  `${optionSelectInput} ${selectBarBase}:hover, ${optionSelectInput} ${selectBarBase}:focus, ${optionSelectInput} ${selectBarBase}:active`,
  {
    borderColor: theme.colors.neutral.border,
    outline: 'none',
  },
)

globalStyle(
  `${optionSelectInputDisabled} ${selectBarBase}:hover, ${optionSelectInputDisabled} ${selectBarBase}:focus, ${optionSelectInputDisabled} ${selectBarBase}:active`,
  {
    borderColor: theme.colors.neutral.borderDisabled,
  },
)

globalStyle(
  `${optionSelectInputError} ${selectBarBase}:hover, ${optionSelectInputError} ${selectBarBase}:focus, ${optionSelectInputError} ${selectBarBase}:active`,
  {
    borderColor: theme.colors.danger.border,
  },
)

export const optionPadded = style({
  padding: `0 ${theme.space[2]}`,
})
