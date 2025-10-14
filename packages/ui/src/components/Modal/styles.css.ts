import { theme } from '@ultraviolet/themes'
import { createVar, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { MODAL_PLACEMENT, MODAL_WIDTH } from './constants'
import { slideFromBottomVanillaExtract } from '../../utils'

export const topModal = createVar()
export const positionModal = createVar()

export const modalContainer = style({
  position: 'absolute',
  top: theme.space[2],
  right: theme.space[2],
})

export const modalImageContainer = style({
  width: '100%',
  height: '15rem',
  backgroundColor: theme.colors.primary.background,
  overflow: 'hidden',
})

export const modalImage = style({
  marginInline: 'auto',
  objectFit: 'cover',
  height: '100%',
  width: '100%',
})

export const modalContent = style({
  padding: theme.space[3],
})

export const modalBackdropBase = style({
  position: 'fixed',
  top: 0,
  right: 0,
  height: 0,
  width: 0,
  overflow: 'hidden',
  backgroundColor: theme.colors.overlay,
  zIndex: 1,
  opacity: 0,
})

export const modalBackdrop = recipe({
  base: modalBackdropBase,
  variants: {
    open: {
      true: {
        padding: theme.space[2],
        overflow: 'auto',
        display: 'flex',
        bottom: 0,
        left: 0,
        height: '100%',
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
    position: 'relative',
    borderRadius: theme.radii.default,
    border: 0,
    padding: theme.space[3],
    width: `${MODAL_WIDTH.medium}rem`,
    boxShadow: `${theme.shadows.overlay[0]}, ${theme.shadows.overlay[1]}`,
    transition: 'width 0.3s ease-in-out, transform 0.3s ease-in-out',
  },
  variants: {
    size: Object.fromEntries(
      Object.entries(MODAL_WIDTH).map(([size, width]) => [
        size,
        { width: `${width}rem` },
      ]),
    ),
    placement: Object.fromEntries(
      Object.entries(MODAL_PLACEMENT).map(([placement, value]) => [
        placement,
        value,
      ]),
    ),
    image: {
      true: {
        padding: 0,
      },
    },
    animation: {
      true: {
        animation: `${slideFromBottomVanillaExtract} 0.3s ease-in-out forwards`,
      },
    },
    positivePosition: {
      true: {},
    },
  },
  compoundVariants: Object.keys(MODAL_WIDTH).map(size => ({
    variants: { size, positivePosition: true },
    style: {
      width: `calc(${MODAL_WIDTH[size as keyof typeof MODAL_WIDTH]}rem - ${positionModal}) !important`,
      transform: `translate3d(0, ${topModal}, 0)`,
    },
  })),
  defaultVariants: {
    size: 'medium',
    placement: 'center',
    image: false,
    animation: false,
    positivePosition: false,
  },
})
