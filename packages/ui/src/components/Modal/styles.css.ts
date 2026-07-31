import { theme } from '@ultraviolet/themes'
import { createVar, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { dialogStyle } from '../Dialog/styles.css'
import { drawerStyle, SIZES } from '../Drawer/styles.css'
import {
  ANIMATION_DURATION_MS,
  ANIMATION_EASING_OPACITY,
  animationDuration,
  animationDurationTranslation,
  animationEasingTranslation,
  MODAL_PLACEMENT,
  MODAL_WIDTH,
  offscreenTranslation,
} from './constants.css'

export const nestedModalTop = createVar()
export const nestedModalScale = createVar()
const modalWidth = createVar()

const container = style({
  position: 'absolute',
  right: theme.space[2],
  top: theme.space[2],
})

const imageContainer = style({
  backgroundColor: theme.colors.primary.background,
  borderTopLeftRadius: 'inherit',
  borderTopRightRadius: 'inherit',
  height: '15rem',
  overflow: 'hidden',
  width: '100%',
})

const image = style({
  height: '100%',
  marginInline: 'auto',
  objectFit: 'cover',
  width: '100%',
})

const content = style({
  padding: theme.space[3],
})

const backdrop = style({
  height: '100%',
  width: '100%',
  overflow: 'auto',
  position: 'fixed',
  inset: 0,
  zIndex: 1,
  display: 'flex',
  padding: theme.space[2],
  '@starting-style': {
    overflow: 'hidden',
  },
  vars: {
    [animationDuration]: `${ANIMATION_DURATION_MS}ms`,
    [animationEasingTranslation]: 'cubic-bezier(0.22, 1, 0.36, 1)', // easeOutQuint
    [animationDurationTranslation]: `calc(${animationDuration} * 1.5)`,
  },
  selectors: {
    ['&::before']: {
      content: '',
      position: 'fixed',
      inset: '0',
      background: theme.colors.overlay,
      transition: `opacity ${animationDuration} ${ANIMATION_EASING_OPACITY}`,
      '@starting-style': {
        opacity: 0,
      },
    },
    ['&:not(:has(dialog[open]))::before']: {
      opacity: 0,
    },
    [`&:not(:has(dialog[open]))`]: {
      vars: {
        [animationDuration]: `${ANIMATION_DURATION_MS * 0.7}ms`,
        [animationDurationTranslation]: animationDuration,
      },
      overflow: 'hidden',
      transitionDelay: '0s',
    },
    [`&:has(${drawerStyle.base})`]: {
      padding: 0,
      transition: `overflow 0s ${animationDurationTranslation} allow-discrete`, // prevent a horizontal scrollbar
    },
    [`&:has(${drawerStyle.push})`]: {
      pointerEvents: 'none',
    },
    [`&:has(${drawerStyle.push})::before`]: {
      background: 'none',
    },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      vars: {
        [animationDuration]: '0s !important',
      },
    },
  },
})

const modal = recipe({
  base: {
    backgroundColor: theme.colors.other.elevation.background.overlay,
    border: 0,
    borderRadius: theme.radii.default,
    boxShadow: `${theme.shadows.overlay[0]}, ${theme.shadows.overlay[1]}`,
    padding: theme.space[3],
    position: 'relative',
    transition: `
      opacity ${animationDuration} ${ANIMATION_EASING_OPACITY},
      width ${animationDurationTranslation} ${animationEasingTranslation},
      transform ${animationDurationTranslation} ${animationEasingTranslation},
      box-shadow ${animationDurationTranslation} ${animationEasingTranslation}
    `,
    width: modalWidth,
    '@starting-style': {
      opacity: 0,
      transform: offscreenTranslation,
    },
    selectors: {
      '&:not([open])': {
        opacity: 0,
        display: 'block', // the default `display: none` breaks the transition on Firefox and Safari
        transform: offscreenTranslation,
      },
      '&:not([open])[data-close-action=confirm]': {
        transform: 'scale(1.03)',
      },
      [`&${drawerStyle.base}`]: {
        borderRadius: '0',
        marginRight: '0',
        padding: '0',
        '@starting-style': {
          opacity: 1,
          transform: `translateX(calc(${modalWidth} * 0.9))`,
          boxShadow: 'none',
        },
      },
      [`&${drawerStyle.base}:not([open])`]: {
        opacity: 1,
        transform: `translateX(${modalWidth})`,
        boxShadow: 'none',
        borderLeft: `1px solid ${theme.colors.neutral.border}`,
        vars: {
          [animationEasingTranslation]: 'cubic-bezier(0.5, 0, 0.1, 1)',
        },
      },
      [`&${drawerStyle.push}`]: {
        borderLeft: `1px solid ${theme.colors.neutral.border}`,
        boxShadow: 'none',
        pointerEvents: 'auto',
      },
      [`&${drawerStyle.drawer.large}`]: {
        vars: {
          [modalWidth]: `min(100dvw, ${SIZES.large}rem)`,
        },
      },
      [`&${drawerStyle.drawer.small}`]: {
        vars: {
          [modalWidth]: `min(100dvw, ${SIZES.small}rem)`,
        },
      },
      [`&${drawerStyle.drawer.medium}`]: {
        vars: {
          [modalWidth]: `min(100dvw, ${SIZES.medium}rem)`,
        },
      },
      [`&${dialogStyle.xsmall}`]: {
        vars: {
          [modalWidth]: 'min(100dvw, 32.5rem)',
        },
      },
    },
  },
  defaultVariants: {
    image: false,
    placement: 'center',
    positivePosition: false,
    size: 'medium',
  },
  variants: {
    image: {
      true: {
        padding: 0,
      },
    },
    placement: MODAL_PLACEMENT,
    positivePosition: {
      true: {
        transformOrigin: 'top',
        transform: `translateY(${nestedModalTop}) scale(${nestedModalScale})`,
      },
    },
    size: Object.fromEntries(
      Object.entries(MODAL_WIDTH).map(([size, width]) => [
        size,
        {
          vars: {
            [modalWidth]: `min(${width}rem, 100dvw)`,
          },
        },
      ]),
    ),
  },
})

export const modalStyle = {
  container,
  imageContainer,
  image,
  content,
  backdrop,
  modal,
}
