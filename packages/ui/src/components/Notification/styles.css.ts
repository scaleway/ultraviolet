import { theme } from '@ultraviolet/themes'
import { globalStyle, style } from '@vanilla-extract/css'

const PREFIX = '.Toastify'

export const notification = style({
  borderRadius: theme.radii.default,
})

globalStyle(PREFIX, {
  backgroundColor: theme.colors.other.elevation.background.raised,
  position: 'fixed',
  zIndex: 1,
})

globalStyle(`${notification} ${PREFIX}__toast`, {
  backgroundColor: theme.colors.other.elevation.background.raised,
  boxShadow: `${theme.shadows.raised[0]}, ${theme.shadows.raised[1]}`,
  color: theme.colors.neutral.text,
  padding: theme.space[2],
})

globalStyle(`${notification} ${PREFIX}__toast-container`, {
  width: '19.5rem',
})

globalStyle(`${notification} ${PREFIX}__toast-body`, {
  display: 'none',
  margin: 0,
  padding: 0,
})
