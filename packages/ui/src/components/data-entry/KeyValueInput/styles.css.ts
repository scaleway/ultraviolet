import { theme } from '@ultraviolet/themes'
import { style, styleVariants } from '@vanilla-extract/css'

const errorDescription = styleVariants({
  key: { gridColumn: '1' },
  value: { gridColumn: '2' },
})

const row = style({
  columnGap: theme.space[2],
  rowGap: theme.space[1],
})

export const keyValueInputStyle = { errorDescription, row }
