import { theme } from '@ultraviolet/themes'
import { globalStyle, style, styleVariants } from '@vanilla-extract/css'
import { linkStyle } from '../../Action/Link/styles.css'

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

globalStyle(`${container['danger']} ${linkStyle.defaultLink}`, {
  color: theme.colors.danger.textStrong,
})

globalStyle(`${container['info']} ${linkStyle.defaultLink}`, {
  color: theme.colors.info.textStrong,
})

globalStyle(`${container['promotional']} ${linkStyle.defaultLink}`, {
  color: theme.colors.primary.textStrong,
})

export const globalAlertStyle = {
  closeButton,
  container,
}
