import { keyframes } from '@emotion/react'

export const ANIMATION_DURATION = 600 // in ms
export const NAVIGATION_MIN_WIDTH = 220
export const NAVIGATION_WIDTH = 280
export const NAVIGATION_COLLASPED_WIDTH = 67

export const shrinkHeight = keyframes`
    0% {
      max-height: 60px;
    }

    100% {
      max-height: 32px;
    }
`
