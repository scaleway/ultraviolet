/**
 * ANIMATIONS
 * collapse and expand animation duration of the whole nav in ms
 */

import { keyframes } from '@vanilla-extract/css'

export const shrinkHeight = keyframes({
  '0%': {
    maxHeight: 50, // this is on purpose higher than the actual height of the item
  },
  '100%': {
    maxHeight: 32,
  },
})

export const groupAnimation = keyframes({
  '0%': {
    opacity: 0,
    maxHeight: 0,
    marginBottom: -8,
  },
  '100%': {
    opacity: 1,
    maxHeight: 40,
    marginBottom: 0,
  },
})
