import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'

const mainRow = style({
  background: theme.colors.neutral.backgroundWeak,
  borderRadius: theme.radii.default,
  padding: theme.space[2],
})

export const filterStyles = {
  mainRow,
}
