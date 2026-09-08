import { theme } from '@ultraviolet/themes'
import { globalStyle, style } from '@vanilla-extract/css'

const PREFIX = '.Toastify'

const toaster = style({
  borderRadius: theme.radii.default,
  minHeight: theme.sizing[700],
})

globalStyle(`${toaster} ${PREFIX}__toast-container`, {
  width: '21.5rem',
})

globalStyle(`${toaster} ${PREFIX}__toast-body`, {
  margin: 0,
  padding: 0,
})

globalStyle(`${toaster} ${PREFIX}__toast--success`, {
  backgroundColor: theme.colors.neutral.backgroundStronger,
  color: theme.colors.neutral.textStronger,
  padding: theme.space[2],
})

globalStyle(`${toaster} ${PREFIX}__toast--error`, {
  backgroundColor: theme.colors.danger.backgroundStrong,
  color: theme.colors.neutral.textStronger,
  padding: theme.space[2],
})

globalStyle(`${toaster} ${PREFIX}__toast--warning`, {
  backgroundColor: theme.colors.warning.backgroundStrong,
  color: theme.colors.warning.textStrong,
  padding: theme.space[2],
})

const closeButton = style({
  background: 'none',
  margin: 'auto',
  marginLeft: theme.space[1],
  selectors: {
    '&:hover, &:active': {
      background: 'none',
      border: 'none',
      boxShadow: 'none',
    },
  },
})

const button = style({
  color: theme.colors.neutral.textStronger,
})

export const toasterStyle = {
  toaster,
  closeButton,
  button,
}
