import { keyframes } from '@emotion/react'

export const NAVIGATION_MIN_WIDTH = 220 // in px
export const NAVIGATION_WIDTH = 280 // in px
export const NAVIGATION_COLLASPED_WIDTH = 67 // in px

/**
 * ANIMATIONS
 */
export const PIN_BUTTON_OPACITY_TRANSITION = 'opacity 250ms ease-in-out' // this is the transition animation when hovering pin button
export const ANIMATION_DURATION = 700 // collapse and expand animation duration of the whole nav in ms

export const shrinkHeight = keyframes`
    0% {
      max-height: 50px; // this is on purpose higher than the actual height of the item
    }

    100% {
      max-height: 32px;
    }
`

export const groupAnimation = keyframes`
  0% {
    opacity: 0;
    max-height: 0;
    margin-bottom: -8px;
  }

  100% {
    opacity: 1;
    max-height: 40px;
    margin-bottom: 0;
  }
`
