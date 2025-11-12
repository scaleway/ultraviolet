import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'
import { ANIMATION_DURATION } from '../constants'
import { groupAnimation } from '../animations.css'
import { recipe } from '@vanilla-extract/recipes'

export const navigationGroupText = recipe({
  base: {
    paddingBottom: theme.space[1],
    paddingLeft: theme.space[1],
    transition: `opacity ${ANIMATION_DURATION}ms ease-in-out, height ${ANIMATION_DURATION}ms ease-in-out`,
    height: `calc(${theme.typography.bodySmallStrong.lineHeight} + ${theme.space['1']})`,
  },
  variants: {
    animation: {
      expand: {
        animation: `${groupAnimation} ${ANIMATION_DURATION}ms ease-in-out`,
      },
      collapse: {
        animation: `${groupAnimation} ${ANIMATION_DURATION}ms ease-in-out reverse`,
      },
      false: {},
    },
  },
})

export const navigationGroupStack = style({ paddingTop: theme.space[1] })

export const navigationPinnedItemDropableArea = style({
  position: 'absolute',
  right: 0,
  left: 0,
  top: 0,
  height: 2,
  borderTop: '2px solid',
  borderColor: 'transparent',
  padding: `${theme.space['0.5']} 0`,
  selectors: {
    '&::before': {
      content: "''",
      position: 'absolute',
      left: 0,
      top: '-4px',
      height: 0,
      width: 0,
      border: '3px solid',
      borderColor: 'inherit',
      borderRadius: theme.radii.circle,
    },
  },
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
        paddingLeft: theme.space[4],
        marginLeft: theme.space['0.5'],
      },
    },
  },
})

export const navigationSeparator = style({
  margin: `${theme.space['2']} calc(${theme.space['2']} * -1)`,
})
