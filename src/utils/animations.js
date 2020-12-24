import { keyframes } from '@emotion/core'

export const bounce = keyframes`
    from, 20%, 53%, 80%, to {
      transform: translate3d(0,0,0);
    }

    40%, 43% {
      transform: translate3d(0, -30px, 0);
    }

    70% {
      transform: translate3d(0, -15px, 0);
    }

    90% {
      transform: translate3d(0,-4px,0);
    }
`
export const zoomIn = keyframes`
    0% {
      transform:scale(0);
    }
    100% {
      transform:scale(1);
    }
`

export const zoomOut = keyframes`
    0% {
      transform:scale(0);
    }
    100% {
      transform:scale(1);
    }
`

export const unfoldIn = keyframes`
    0% {
      transform:scaleY(.005) scaleX(0);
    }
    50% {
      transform:scaleY(.005) scaleX(1);
    }
    100% {
      transform:scaleY(1) scaleX(1);
    }
`
export const unfoldOut = keyframes`
    0% {
      transform:scaleY(1) scaleX(1);
    }
    50% {
      transform:scaleY(.005) scaleX(1);
    }
    100% {
      transform:scaleY(.005) scaleX(0);
    }
`

export const fadeIn = keyframes`
    0% {
      background:rgba(0,0,0,.0);
    }
    100% {
      background:rgba(0,0,0,.4);
    }
`

export const fadeOut = keyframes`
    0% {
      background:rgba(0,0,0,.4);
    }
    100% {
      background:rgba(0,0,0,.0);
    }
`
export const scaleUp = keyframes`
    0% {
      transform:scale(.8) translateY(1000px);
      opacity:0;
    }
    100% {
      transform:scale(1) translateY(0px);
      opacity:1;
    }
`

export const scaleDown = keyframes`
    0% {
      transform:scale(1) translateY(0px);
      opacity:1;
    }
    100% {
      transform:scale(.8) translateY(1000px);
      opacity:0;
    }
`
export const quickScaleDown = keyframes`
    0% {
      transform:scale(1);
    }
    99.9% {
      transform:scale(1);
    }
    100% {
      transform:scale(0);
    }
`

export const scaleBack = keyframes`
    0% {
      transform:scale(1);
    }
    100% {
      transform:scale(.85);
    }
`

export const scaleForward = keyframes`
    0% {
        transform:scale(.85);
    }
    100% {
        transform:scale(1);
    }
`
export const sketchIn = keyframes`
    0% {
      stroke-dashoffset: 778;
    }
    100% {
      stroke-dashoffset: 0;
    }
`

export const sketchOut = keyframes`
    0% {
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dashoffset: 778;
    }
`

export const slideDownLarge = keyframes`
    0% {
        transform:translateY(-100%);
    }
    100% {
        transform:translateY(0%);
    }
  `
export const slideUpLarge = keyframes`
    0% {
    transform:translateY(0%);
    }
    100% {
        transform:translateY(-100%);
    }
  `
