import { theme } from '@ultraviolet/themes'
import { globalStyle, style } from '@vanilla-extract/css'

const PREFIX = '.Toastify'

export const notification = style({
  borderRadius: theme.radii.default,
})

globalStyle(`${PREFIX}`, {
  backgroundColor: theme.colors.other.elevation.background.raised,
  zIndex: 1,
  position: 'fixed',
})

globalStyle(`${notification} ${PREFIX}__toast`, {
  backgroundColor: theme.colors.other.elevation.background.raised,
  color: theme.colors.neutral.text,
  padding: theme.space[2],
  boxShadow: `${theme.shadows.raised[0]}, ${theme.shadows.raised[1]}`,
})

globalStyle(`${notification} ${PREFIX}__toast-container`, {
  width: '19.5rem',
})

globalStyle(`${notification} ${PREFIX}__toast-body`, {
  margin: 0,
  padding: 0,
  display: 'none',
})
