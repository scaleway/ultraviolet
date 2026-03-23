import { theme } from '@ultraviolet/themes'
import { style, styleVariants } from '@vanilla-extract/css'

import { SIZE_HEIGHT } from '../Button/constants'

const closeButton = style({
  background: 'none',
  position: 'absolute',
  right: theme.sizing[SIZE_HEIGHT.large],

  selectors: {
    '&:hover, &:focus, &:active': {
      background: 'none',
    },
  },
})

const containerBase = style({
  height: theme.sizing['700'],
  padding: `0 ${theme.space['2']}`,
  width: '100%',
})

const container = styleVariants({
  danger: [
    containerBase,
    { backgroundColor: theme.colors.danger.backgroundStrong },
  ],
  info: [
    containerBase,
    { backgroundColor: theme.colors.info.backgroundStrong },
  ],
  promotional: [
    containerBase,
    { background: theme.colors.other.gradients.background.linear.aqua },
  ],
})

export const globalAlertStyle = {
  closeButton,
  container,
}
