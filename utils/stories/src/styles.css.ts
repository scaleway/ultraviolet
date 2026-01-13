import { theme } from '@ultraviolet/themes'
import { createVar, style, styleVariants } from '@vanilla-extract/css'

export const computedBackground = createVar()
export const separator = style({
  margin: `${theme.space[3]} 0`,
})

export const capitalizedText = style({
  textTransform: 'capitalize',
})

export const noMarginText = style({ margin: 0 })

export const card = style({
  alignItems: 'center',
  background: computedBackground,
  display: 'flex',
  justifyContent: 'space-between',
  padding: 8,
  width: '100%',
})
export const paddingCard = styleVariants({
  default: { padding: 8 },
  large: { padding: 32 },
})
