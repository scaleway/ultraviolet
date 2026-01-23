import { theme } from '@ultraviolet/themes'
import { keyframes, styleVariants } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { DEFAULT_ARROW_WIDTH } from './helpers'
import { arrowTheme, popupTheme } from './variables.css'

const animation = keyframes({
  ' 0%': {
    opacity: 0,
    transform: popupTheme.initialPosition,
  },
  '100%': {
    opacity: 1,
    transform: popupTheme.position,
  },
})

const exitAnimation = keyframes({
  '0%': {
    opacity: 1,
    transform: popupTheme.position,
  },
  '100% ': {
    opacity: 0,
    transform: popupTheme.initialPosition,
  },
})

export const containerPopup = recipe({
  base: {
    maxHeight: '100%',
    overflow: 'auto',
  },
  variants: {
    hasMaxHeight: {
      true: {
        maxHeight: `calc(${popupTheme.maxHeight} - ${theme.space[2]})`,
      },
    },
  },
})

export const popup = recipe({
  base: {
    backgroundColor: theme.colors.neutral.backgroundStronger,
    borderRadius: theme.radii.default,
    color: theme.colors.neutral.textStronger,
    fontSize: '0.8rem',
    inset: '0 auto auto 0',
    left: 0,
    maxHeight: popupTheme.maxHeight,
    maxWidth: popupTheme.maxWidth,
    opacity: 0,
    overflowWrap: 'break-word',
    padding: `${theme.space['0.5']} ${theme.space[1]}`,
    position: 'absolute',
    textAlign: 'center',
    top: 0,
    transform: popupTheme.position,
    zIndex: 1,
  },
  defaultVariants: {
    hasArrow: true,
    visibleInDom: true,
  },
  variants: {
    hasArrow: {
      true: {
        selectors: {
          '&::after': {
            borderColor: `${theme.colors.neutral.backgroundStronger} transparent transparent transparent`,
            borderStyle: 'solid',
            borderWidth: `${DEFAULT_ARROW_WIDTH}px`,
            content: ' ',
            left: arrowTheme.left,
            marginLeft: `-${DEFAULT_ARROW_WIDTH}px`,
            pointerEvents: 'none',
            position: 'absolute',
            top: arrowTheme.top,
            transform: arrowTheme.transform,
          },
        },
      },
    },
    visibleInDom: {
      false: {
        display: 'none',
      },
    },
  },
})

export const animationPopup = styleVariants({
  notReverse: {
    animation: `${popupTheme.animationDuration} ${animation} forwards`,
  },
  reverse: {
    animation: `${popupTheme.animationDuration} ${exitAnimation} forwards`,
  },
})

export const childrenContainerPopup = recipe({
  base: {
    display: 'inherit',
  },
  variants: {
    fullHeight: {
      true: {
        height: '100%',
      },
    },
    fullWidth: {
      true: {
        width: '100%',
      },
    },
  },
})
