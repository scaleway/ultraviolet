export const bounce = `
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }
  70% {
    transform: translate3d(0, -15px, 0);
  }
  90% {
    transform: translate3d(0, -4px, 0);
  }
`

export const ping = `
  100% {
    opacity: 0;
    transform: scale(2);
  }
`

export const flash = `
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.1;
  }
  100% {
    opacity: 1;
  }
`

export const zoomIn = `
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`

export const zoomOut = `
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`

export const unfoldIn = `
  0% {
    transform: scaleY(.005) scaleX(0);
  }
  50% {
    transform: scaleY(.005) scaleX(1);
  }
  100% {
    transform: scaleY(1) scaleX(1);
  }
`

export const unfoldOut = `
  0% {
    transform: scaleY(1) scaleX(1);
  }
  50% {
    transform: scaleY(.005) scaleX(1);
  }
  100% {
    transform: scaleY(.005) scaleX(0);
  }
`

export const fadeIn = `
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const fadeOut = `
  0% {
    background: rgba(0,0,0,.4);
  }
  100% {
    background: rgba(0,0,0,.0);
  }
`

export const scaleUp = `
  0% {
    transform: scale(.8) translateY(1000px);
    opacity: 0;
  }
  100% {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
`

export const scaleDown = `
  0% {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
  100% {
    transform: scale(.8) translateY(1000px);
    opacity: 0;
  }
`

export const quickScaleDown = `
  0% {
    transform: scale(1);
  }
  99.9% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`

export const scaleBack = `
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(.85);
  }
`

export const scaleForward = `
  0% {
    transform: scale(.85);
  }
  100% {
    transform: scale(1);
  }
`

export const sketchIn = `
  0% {
    stroke-dashoffset: 778;
  }
  100% {
    stroke-dashoffset: 0;
  }
`

export const sketchOut = `
  0% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: 778;
  }
`

export const slideDownLarge = `
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0%);
  }
`

export const slideUpLarge = `
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-100%);
  }
`

export const slideFromBottom = `
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0%);
  }
`

export const slideFromTop = `
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0%);
  }
`

export const slideFromRight = `
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0%);
  }
`

export const slideFromLeft = `
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0%);
  }
`

export const slideToBottom = `
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(100%);
  }
`

export const slideToTop = `
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-100%);
  }
`

export const slideToRight = `
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(100%);
  }
`

export const slideToLeft = `
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
`

export const pulse = `
  0% {
    opacity: 0;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.15);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`
