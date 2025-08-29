import { theme } from '@ultraviolet/themes'
import { recipe } from '@vanilla-extract/recipes'
import { DEFAULT_ARROW_WIDTH } from './helpers'
import { keyframes, styleVariants } from '@vanilla-extract/css'
import {
  animationDurationPopup,
  arrowLeft,
  arrowTop,
  arrowTransform,
  maxHeightPopup,
  maxWidthPopup,
  popupInitialPosition,
  popupPosition,
} from './variables.css'

const animation = keyframes({
  ' 0%': {
    opacity: 0,
    transform: popupInitialPosition,
  },
  '100%': {
    opacity: 1,
    transform: popupPosition,
  },
})

const exitAnimation = keyframes({
  '0%': {
    opacity: 1,
    transform: popupPosition,
  },
  '100% ': {
    opacity: 0,
    transform: popupInitialPosition,
  },
})

export const containerPopup = recipe({
  base: {
    overflow: 'auto',
    maxHeight: '100%',
  },
  variants: {
    hasMaxHeight: {
      true: {
        maxHeight: `calc(${maxHeightPopup} - ${theme.space[2]})`,
      },
    },
  },
})

export const popup = recipe({
  base: {
    backgroundColor: theme.colors.neutral.backgroundStronger,
    color: theme.colors.neutral.textStronger,
    borderRadius: theme.radii.default,
    padding: `${theme.space['0.5']} ${theme.space[1]}`,
    textAlign: 'center',
    position: 'absolute',
    overflowWrap: 'break-word',
    fontSize: '0.8rem',
    inset: '0 auto auto 0',
    top: 0,
    left: 0,
    opacity: 0,
    zIndex: 1,
    transform: popupPosition,
    maxWidth: maxWidthPopup,
    maxHeight: maxHeightPopup,
  },
  variants: {
    hasArrow: {
      true: {
        selectors: {
          '&::after': {
            content: ' ',
            position: 'absolute',
            top: arrowTop,
            left: arrowLeft,
            transform: arrowTransform,
            marginLeft: `-${DEFAULT_ARROW_WIDTH}px`,
            borderWidth: `${DEFAULT_ARROW_WIDTH}px`,
            borderStyle: 'solid',
            borderColor: `${theme.colors.neutral.backgroundStronger} transparent transparent transparent`,
            pointerEvents: 'none',
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
  defaultVariants: {
    hasArrow: true,
    visibleInDom: true,
  },
})

export const animationPopup = styleVariants({
  reverse: {
    animation: `${animationDurationPopup} ${exitAnimation} forwards`,
  },
  notReverse: {
    animation: `${animationDurationPopup} ${animation} forwards`,
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
