import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { fadeIn } from '../../../utils'
import { ANIMATION_DURATION, ANIMATION_EASING } from '../constants'

export const groupText = recipe({
  base: {
    height: `calc(${theme.typography.bodySmallStrong.lineHeight} + ${theme.space['1']})`,
    paddingBottom: theme.space[1],
    paddingLeft: theme.space[1],
  },
  variants: {
    animation: {
      expand: {
        animation: `${fadeIn} ${ANIMATION_DURATION}ms ${ANIMATION_EASING}`,
      },
    },
  },
})

export const groupStack = style({ paddingTop: theme.space[1] })

export const pinnedItemDropableArea = style({
  borderTop: '2px solid',
  borderColor: 'transparent',
  height: 2,
  left: 0,
  padding: `${theme.space['0.5']} 0`,
  position: 'absolute',
  right: 0,
  selectors: {
    '&::before': {
      border: '3px solid',
      borderColor: 'inherit',
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

export const pinnedItemRelativeDiv = style({
  position: 'relative',
})

export const pinnedItemContainer = recipe({
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

export const separator = style({
  margin: `${theme.space['2']} calc(${theme.space['2']} * -1)`,
  flexShrink: 0,
})

export const showHideStack = recipe({
  base: {
    height: '100%',
  },
  variants: {
    expanding: {
      true: {
        animation: `${fadeIn} ${ANIMATION_DURATION}ms ${ANIMATION_EASING}`,
      },
    },
  },
})
