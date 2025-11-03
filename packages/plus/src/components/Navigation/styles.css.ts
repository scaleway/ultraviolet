import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'
import {
  ANIMATION_DURATION,
  NAVIGATION_COLLASPED_WIDTH,
  NAVIGATION_MAX_WIDTH,
  NAVIGATION_MIN_WIDTH,
} from './constants'
import { recipe } from '@vanilla-extract/recipes'
import { widthNavigationContainer } from './variables.css'

export const navigationStickyFooter = recipe({
  base: {
    display: 'flex',
    width: '100%',
    background: theme.colors.neutral.background,
    borderTop: `1px solid ${theme.colors.neutral.borderWeak}`,
    padding: `${theme.space['1']} ${theme.space['2']}`,
    transition: `justify-content ${ANIMATION_DURATION}ms ease-in-out, box-shadow 230ms ease-in-out`,
    boxShadow: theme.shadows.defaultShadow,
    justifyContent: 'flex-end',
  },
  variants: {
    overflow: {
      false: {
        boxShadow: 'none',
        border: 'none',
      },
    },
  },
  defaultVariants: {
    overflow: false,
  },
})

export const navigationHeader = style({
  background: theme.colors.neutral.background,
})

export const navigationLogoContainer = style({
  margin: `${theme.space['3']} ${theme.space['3']} ${theme.space['2']} ${theme.space['3']}`,
  maxWidth: 220,
  height: 22,
  overflow: 'hidden',
})

export const navigation = style({
  display: 'flex',
  flexDirection: 'row',
  position: 'relative',
  borderRight: `1px solid ${theme.colors.neutral.borderWeak}`,
})

export const navigationContainer = recipe({
  base: {
    background: theme.colors.neutral.background,
    display: 'flex',
    flexDirection: 'column',
    width: widthNavigationContainer,
  },
  variants: {
    expanded: {
      false: {
        width: `${NAVIGATION_COLLASPED_WIDTH}px`,
      },
    },
    animation: {
      collapse: {
        transition: `width ${ANIMATION_DURATION}ms ease-in-out`,
        width: `${NAVIGATION_COLLASPED_WIDTH}px`,
      },
      expand: {
        transition: `width ${ANIMATION_DURATION}ms ease-in-out`,
        width: widthNavigationContainer,
      },
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: { expanded: true, animation: false },
      style: {
        maxWidth: `${NAVIGATION_MAX_WIDTH}px`,
        minWidth: `${NAVIGATION_MIN_WIDTH}px`,
      },
    },
  ],
})

export const navigationContentContainer = style({
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
})

export const navigationContentContainerCollapsed = style({
  alignItems: 'center',
})

export const navigationContent = style({
  overflowX: 'hidden',
  overflowY: 'auto',
  flexGrow: 1,
  padding: theme.space[2],
})

export const navigationSlider = style({
  background: 'transparent',
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  width: 6,
  cursor: 'col-resize',
  borderRight: '2px solid transparent',
  display: 'flex',
  selectors: {
    '&:hover': {
      borderColor: theme.colors.primary.border,
    },
  },
})
