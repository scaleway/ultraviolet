import { theme } from '@ultraviolet/themes'
import { style, styleVariants } from '@vanilla-extract/css'

const closeButton = style({
  background: 'none',

  selectors: {
    '&:hover, &:focus, &:active': {
      background: 'none',
    },
  },
})

const containerBase = style({
  height: theme.sizing['700'],
  padding: theme.space['2'],
  width: '100%',
})

const container = styleVariants({
  danger: [containerBase, { backgroundColor: theme.colors.danger.backgroundStrong }],
  info: [containerBase, { backgroundColor: theme.colors.info.backgroundStrong }],
  promotional: [containerBase, { background: theme.colors.other.gradients.background.linear.aqua }],
})

export const globalAlertStyle = {
  closeButton,
  container,
}
