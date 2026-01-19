import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { groupAnimation } from '../animations.css'
import { ANIMATION_DURATION } from '../constants'

export const navigationGroupText = recipe({
  base: {
    height: `calc(${theme.typography.bodySmallStrong.lineHeight} + ${theme.space['1']})`,
    paddingBottom: theme.space[1],
    paddingLeft: theme.space[1],
    transition: `opacity ${ANIMATION_DURATION}ms ease-in-out, height ${ANIMATION_DURATION}ms ease-in-out`,
  },
  variants: {
    animation: {
      collapse: {
        animation: `${groupAnimation} ${ANIMATION_DURATION}ms ease-in-out reverse`,
      },
      expand: {
        animation: `${groupAnimation} ${ANIMATION_DURATION}ms ease-in-out`,
      },
      false: {},
    },
  },
})

export const navigationGroupStack = style({ paddingTop: theme.space[1] })

export const navigationPinnedItemDropableArea = style({
  borderTop: '2px solid transparent',
  height: 2,
  left: 0,
  padding: `${theme.space['0.5']} 0`,
  position: 'absolute',
  right: 0,
  selectors: {
    '&::before': {
      border: '3px solid inherit',
      borderRadius: theme.radii.circle,
      content: "''",
      height: 0,
      left: 0,
      position: 'absolute',
      top: '-4px',
      width: 0,
    },
  },
  top: 0,
})

export const navigationPinnedItemRelativeDiv = style({
  position: 'relative',
})

export const navigationPinnedItemContainer = recipe({
  base: {
    padding: `${theme.space[1]} 0`,
  },
  variants: {
    expanded: {
      true: {
        marginLeft: theme.space['0.5'],
        paddingLeft: theme.space[4],
      },
    },
  },
})

export const navigationSeparator = style({
  margin: `${theme.space['2']} calc(${theme.space['2']} * -1)`,
})
