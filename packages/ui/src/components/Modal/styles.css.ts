import { theme } from '@ultraviolet/themes'
import { createVar, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { slideFromBottom } from '../../utils'
import { drawerBase } from '../Drawer/styles.css'
import { MODAL_PLACEMENT, MODAL_WIDTH } from './constants'

export const topModal = createVar()
export const positionModal = createVar()

export const modalContainer = style({
  position: 'absolute',
  right: theme.space[2],
  top: theme.space[2],
})

export const modalImageContainer = style({
  backgroundColor: theme.colors.primary.background,
  height: '15rem',
  overflow: 'hidden',
  width: '100%',
})

export const modalImage = style({
  height: '100%',
  marginInline: 'auto',
  objectFit: 'cover',
  width: '100%',
})

export const modalContent = style({
  padding: theme.space[3],
})

export const modalBackdropBase = style({
  backgroundColor: theme.colors.overlay,
  height: 0,
  opacity: 0,
  overflow: 'hidden',
  position: 'fixed',
  right: 0,
  top: 0,
  width: 0,
  zIndex: 1,
  selectors: {
    [`&:has(${drawerBase})`]: {
      padding: 0,
      transition: 'opacity 100ms ease-in-out',
    },
  },
})

export const modalBackdrop = recipe({
  base: modalBackdropBase,
  variants: {
    open: {
      true: {
        bottom: 0,
        display: 'flex',
        height: '100%',
        left: 0,
        overflow: 'auto',
        padding: theme.space[2],
        width: '100%',
      },
    },
    visible: {
      true: {
        opacity: 1,
      },
    },
  },
})

export const modal = recipe({
  base: {
    backgroundColor: theme.colors.other.elevation.background.overlay,
    border: 0,
    borderRadius: theme.radii.default,
    boxShadow: `${theme.shadows.overlay[0]}, ${theme.shadows.overlay[1]}`,
    padding: theme.space[3],
    position: 'relative',
    transition: 'width 0.3s ease-in-out, transform 0.3s ease-in-out',
    width: `${MODAL_WIDTH.medium}rem`,
  },
  compoundVariants: Object.keys(MODAL_WIDTH).map(size => ({
    style: {
      transform: `translate3d(0, ${topModal}, 0)`,
      width: `calc(${MODAL_WIDTH[size as keyof typeof MODAL_WIDTH]}rem - ${positionModal}) !important`,
    },
    variants: { positivePosition: true, size },
  })),
  defaultVariants: {
    animation: false,
    image: false,
    placement: 'center',
    positivePosition: false,
    size: 'medium',
  },
  variants: {
    animation: {
      true: {
        animation: `${slideFromBottom} 0.3s ease-in-out forwards`,
      },
    },
    image: {
      true: {
        padding: 0,
      },
    },
    placement: Object.fromEntries(
      Object.entries(MODAL_PLACEMENT).map(([placement, value]) => [
        placement,
        value,
      ]),
    ),
    positivePosition: {
      true: {},
    },
    size: Object.fromEntries(
      Object.entries(MODAL_WIDTH).map(([size, width]) => [
        size,
        { width: `${width}rem` },
      ]),
    ),
  },
})
