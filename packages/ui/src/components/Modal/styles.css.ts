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

export const topModal = createVar()
export const positionModal = createVar()

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
  backgroundColor: theme.colors.overlay,
  height: '100%',
  width: '100%',
  overflow: 'auto',
  position: 'fixed',
  inset: 0,
  zIndex: 1,
  display: 'flex',
  padding: theme.space[2],
  transition: `background-color ${animationDuration} ${ANIMATION_EASING_OPACITY}`,
  '@starting-style': {
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  vars: {
    [animationDuration]: `${ANIMATION_DURATION_MS}ms`,
    [animationEasingTranslation]: 'cubic-bezier(0.22, 1, 0.36, 1)',
    [animationDurationTranslation]: `calc(${animationDuration} * 1.5)`,
  },
  selectors: {
    [`&:not(:has(dialog[open]))`]: {
      vars: {
        [animationDuration]: `${ANIMATION_DURATION_MS * 0.7}ms`,
        [animationDurationTranslation]: animationDuration,
      },
      backgroundColor: 'transparent',
      overflow: 'hidden',
      transitionDelay: '0s',
    },
    [`&:has(${drawerStyle.base})`]: {
      padding: 0,
      transitionProperty: 'background-color, overflow',
      transitionDuration: `${animationDuration}, 0s`,
      transitionDelay: `0s, ${animationDurationTranslation}`, // delay the overflow transition to prevent a horizontal scrollbar
      transitionBehavior: 'allow-discrete',
    },
    [`&:has(${drawerStyle.push})`]: {
      background: 'none',
      pointerEvents: 'none',
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
      display ${animationDurationTranslation} ${animationEasingTranslation} allow-discrete,
      box-shadow ${animationDurationTranslation} ${animationEasingTranslation}
    `,
    width: `${MODAL_WIDTH.medium}rem`,
    '@starting-style': {
      opacity: 0,
      transform: offscreenTranslation,
    },
    '@media': {
      '(prefers-reduced-motion: reduce)': {
        vars: {
          [offscreenTranslation]: '0',
        },
      },
    },
    selectors: {
      [`&${drawerStyle.base}`]: {
        '@starting-style': {
          opacity: 1,
          transform: 'translateX(99%)',
          boxShadow: 'none',
        },
      },
      [`&${drawerStyle.base}:not([open])`]: {
        opacity: 1,
        transform: 'translateX(100%)',
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
      [`&${drawerStyle.drawer.large}, &${drawerStyle.drawer.small}, &${drawerStyle.drawer.medium}`]: {
        borderRadius: '0',
        marginRight: '0',
        padding: '0',
      },
      [`&${drawerStyle.drawer.large}`]: {
        width: `${SIZES.large}rem`,
      },
      [`&${drawerStyle.drawer.small}`]: {
        width: `${SIZES.small}rem`,
      },
      [`&${drawerStyle.drawer.medium}`]: {
        width: `${SIZES.medium}rem`,
      },
      [`&${dialogStyle.xsmall}`]: {
        width: '32.5rem',
      },
      '&:not([open])': {
        opacity: 0,
        transform: offscreenTranslation,
      },
      '&:not([open])[data-close-action=confirm]': {
        transform: 'scale(1.03)',
      },
    },
  },
  compoundVariants: Object.keys(MODAL_WIDTH).map(size => ({
    style: {
      transform: `translate3d(0, ${topModal}, 0)`,
      width: `calc(${MODAL_WIDTH[size as keyof typeof MODAL_WIDTH]}rem - ${positionModal}) !important`,
    },
    variants: { positivePosition: true, size },
  })),
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
      true: {},
    },
    size: Object.fromEntries(Object.entries(MODAL_WIDTH).map(([size, width]) => [size, { width: `${width}rem` }])),
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
