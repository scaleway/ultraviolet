import { keyframes } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const angryAnimation = keyframes({
  '30%': {
    transform: 'translate3d(-5px, 0, 0) rotate(5deg)',
  },
  '60%': {
    transform: 'translate3d(-4px, 0, 0)',
  },
  '90%': {
    transform: 'translate3d(-1px, 0, 0) rotate(-5deg)',
  },
  'from, 10%, 40%, 80%, to': {
    transform: 'translate3d(0, 0, 0) rotate(0deg)',
  },
})

export const happyAnimation = keyframes({
  '30%': {
    transform: 'translate3d(0, 5px, 0) rotate(5deg)',
  },
  '60%': {
    transform: 'translate3d(0, -6px, 0)',
  },
  '90%': {
    transform: 'translate3d(0, -2px, 0)',
  },
  'from, 10%, 40%, 80%, to': {
    transform: 'translate3d(0, 0, 0) rotate(0deg)',
  },
})

export const customerStatisfaction = recipe({
  base: {
    cursor: 'pointer',
    height: 88,
    selectors: {
      '&:hover, &:focus': {
        transform: 'scale(1.2)',
      },
    },
    transition: 'transform 1s cubic-bezier(0.19, 1, 0.22, 1)',
    width: 88,
  },
  variants: {
    animated: {
      angry: {
        animation: `${angryAnimation} 1s ease infinite`,
      },
      happy: {
        animation: `${happyAnimation} 1s ease infinite`,
      },
    },
    isScaled: {
      true: {
        transform: 'scale(1.2)',
      },
    },
  },
})
