import { theme } from '@ultraviolet/themes'
import { keyframes, style } from '@vanilla-extract/css'

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})
const circle = style({
  stroke: theme.colors.neutral.border,
})

const loader = style({
  animationDuration: '0.75s',
  animationIterationCount: 'infinite',
  animationName: spin,
  animationTimingFunction: 'linear',
})

const loaderCircleAnimation = style({
  transition: 'stroke-dashoffset 0.5s ease 0s',
})

export const loaderStyle = { circle, loader, loaderCircleAnimation }
