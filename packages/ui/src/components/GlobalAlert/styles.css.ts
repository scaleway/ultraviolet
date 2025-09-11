import { style, styleVariants } from '@vanilla-extract/css'
import { theme } from '@ultraviolet/themes'
import { SIZE_HEIGHT } from '../Button/constants'

export const closeButton = style({
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
  width: '100%',
  height: theme.sizing['700'],
  padding: `0 ${theme.space['2']}`,
})

export const container = styleVariants({
  info: [
    containerBase,
    { backgroundColor: theme.colors.info.backgroundStrong },
  ],
  danger: [
    containerBase,
    { backgroundColor: theme.colors.danger.backgroundStrong },
  ],
  promotional: [
    containerBase,
    { background: theme.colors.other.gradients.background.linear.aqua },
  ],
})
