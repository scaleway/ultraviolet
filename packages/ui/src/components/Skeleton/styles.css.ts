import { createVar, keyframes, style } from '@vanilla-extract/css'

const shineAnimation = keyframes({
  '0%': {
    left: '-25%',
  },
  '100%': {
    left: '100%',
  },
})

export const colorGradient00 = createVar()
export const colorGradient4D = createVar()
export const colorGradient66 = createVar()

export const skeletonContainer = style({
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
  cursor: 'progress',
  display: 'flex',
  flexFlow: 'column',
  height: '100%',
})

export const skeletonHighlight = style({
  position: 'absolute',
  top: 0,
  height: '100%',
  width: '25%',
  opacity: 0.8,
  background: `linear-gradient(
    90deg,
    ${colorGradient00},
    ${colorGradient4D},
    ${colorGradient66},
    ${colorGradient4D},
    ${colorGradient00}
  )`,
  animation: `${shineAnimation} 1s linear infinite`,
  animationDirection: 'alternate',
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animation: 'unset',
    },
  },
})
