import { keyframes } from '@vanilla-extract/css'

export const fadeInVanillaExtract = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

export const pingVanillaExtract = keyframes({
  '100%': { opacity: 0, transform: 'scale(2)' },
})

export const slideFromBottomVanillaExtract = keyframes({
  '0%': {
    transform: 'translateY(100%)',
  },
  '100% ': {
    transform: 'translateY(0%)',
  },
})
