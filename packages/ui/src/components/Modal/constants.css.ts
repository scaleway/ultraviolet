import { theme } from '@ultraviolet/themes'
import type { StyleRule } from '@vanilla-extract/css'
import { createVar } from '@vanilla-extract/css'
import type { ModalPlacement, ModalSize } from './types'

export const MODAL_WIDTH: Record<ModalSize, number> = {
  large: 53.125, // in rem
  medium: 44.25,
  small: 38.5,
  xsmall: 25,
  xxsmall: 22.5,
}

export const ANIMATION_DURATION_MS = 250
export const ANIMATION_EASING_OPACITY = 'ease'

export const animationEasingTranslation = createVar()
export const animationDuration = createVar()
export const animationDurationTranslation = createVar()
export const offscreenTranslation = createVar()

export const MODAL_PLACEMENT: Record<ModalPlacement, StyleRule> = {
  bottom: {
    margin: 'auto',
    marginBottom: 0,
    vars: {
      [offscreenTranslation]: `translateY(${theme.space[1]})`,
    },
  },
  'bottom-left': {
    margin: 'auto',
    marginBottom: 0,
    marginLeft: 0,
    vars: {
      [offscreenTranslation]: `translateY(${theme.space[1]})`,
    },
  },
  'bottom-right': {
    margin: 'auto',
    marginBottom: 0,
    marginRight: 0,
    vars: {
      [offscreenTranslation]: `translateY(${theme.space[1]})`,
    },
  },
  center: {
    margin: 'auto',
    vars: {
      [offscreenTranslation]: `translateY(${theme.space[1]})`,
    },
  },
  left: {
    margin: 'auto',
    marginLeft: 0,
    vars: {
      [offscreenTranslation]: `translateX(calc(-1 * ${theme.space[1]}))`,
    },
  },
  right: {
    margin: 'auto',
    marginRight: 0,
    vars: {
      [offscreenTranslation]: `translateX(${theme.space[1]})`,
    },
  },
  top: {
    margin: 'auto',
    marginTop: 0,
    vars: {
      [offscreenTranslation]: `translateY(calc(-1 * ${theme.space[1]}))`,
    },
  },
  'top-left': {
    margin: 'auto',
    marginLeft: 0,
    marginTop: 0,
    vars: {
      [offscreenTranslation]: `translateY(calc(-1 * ${theme.space[1]}))`,
    },
  },
  'top-right': {
    margin: 'auto',
    marginRight: 0,
    marginTop: 0,
    vars: {
      [offscreenTranslation]: `translateY(calc(-1 * ${theme.space[1]}))`,
    },
  },
}
