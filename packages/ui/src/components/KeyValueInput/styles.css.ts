import { theme } from '@ultraviolet/themes'
import { styleVariants } from '@vanilla-extract/css'

const errorDescription = styleVariants({
  key: { gridColumn: '1', marginTop: `calc(-1 * ${theme.space[1]})` },
  value: { gridColumn: '2', marginTop: `calc(-1 * ${theme.space[1]})` },
})
export const keyValueInputStyle = { errorDescription }
