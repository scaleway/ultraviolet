import { keyframes } from '@emotion/react'

export type PositionsType = {
  arrowLeft: number
  arrowTop: number
  arrowTransform: string
  placement: string
  rotate: number
  popupInitialPosition: string
  popupPosition: string
}

export const animation = (positions: PositionsType) => keyframes`
  0% {
    opacity: 0;
    transform: ${positions.popupInitialPosition};
  }
  100% {
    opacity: 1;
    transform: ${positions.popupPosition};
  }
`

export const exitAnimation = (positions: PositionsType) => keyframes`
  0% {
    opacity: 1;
    transform: ${positions.popupPosition};
  }
  100% {
    opacity: 0;
    transform: ${positions.popupInitialPosition};
  }
`
