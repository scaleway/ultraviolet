import { createThemeContract } from '@vanilla-extract/css'

export const popupTheme = createThemeContract({
  animationDuration: null,
  initialPosition: null,
  maxHeight: null,
  maxWidth: null,
  position: null,
})

export const arrowTheme = createThemeContract({
  left: null,
  top: null,
  transform: null,
})
