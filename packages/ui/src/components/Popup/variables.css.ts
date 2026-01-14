import { createThemeContract } from '@vanilla-extract/css'

export const popupTheme = createThemeContract({
  maxHeight: null,
  maxWidth: null,
  initialPosition: null,
  position: null,
  animationDuration: null,

})

export const arrowTheme = createThemeContract({
    top: null,
    left: null,
    transform: null
});
