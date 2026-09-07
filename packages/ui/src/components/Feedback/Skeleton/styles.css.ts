import { theme } from '@ultraviolet/themes'
import { keyframes, style } from '@vanilla-extract/css'
import {
  blockSkeletonLine,
  blockSkeletonList,
  blocksContainer,
  blocksSkeleton,
  boxWithIconSkeleton,
  donutSkeletonCircle,
  donutSkeletonContainer,
  donutSkeletonLineList,
  donutSkeletonSvg,
  iconSkeleton,
  lineSkeleton,
  listSkeletonDiv,
  listSkeletonLi,
  listSkeletonUl,
  sliderSkeletonBanner,
  sliderSkeletonCard,
  sliderSkeletonContainer,
  squareSkeleton,
} from './stylesVariants.css'

const shineAnimation = keyframes({
  '0%': {
    left: '-25%',
  },
  '100%': {
    left: '100%',
  },
})

function createColor(opacity: number) {
  return `rgb(from ${theme.colors.neutral.backgroundWeak} r g b / ${opacity})`
}

const container = style({
  cursor: 'progress',
  display: 'flex',
  flexFlow: 'column',
  height: '100%',
  overflow: 'hidden',
  position: 'relative',
  width: '100%',
})

const highlight = style({
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animation: 'unset',
    },
  },
  animation: `${shineAnimation} 1s linear infinite`,
  animationDirection: 'alternate',
  background: `linear-gradient(
    90deg,
    ${createColor(0)},
    ${createColor(0.3)},
    ${createColor(0.4)},
    ${createColor(0.3)},
    ${createColor(0)}
  )`,
  height: '100%',
  opacity: 0.8,
  position: 'absolute',
  top: 0,
  width: '25%',
})

export const skeletonStyle = {
  container,
  highlight,
  blockSkeletonLine,
  blockSkeletonList,
  blocksContainer,
  blocksSkeleton,
  boxWithIconSkeleton,
  donutSkeletonCircle,
  donutSkeletonContainer,
  donutSkeletonSvg,
  donutSkeletonLineList,
  iconSkeleton,
  lineSkeleton,
  listSkeletonLi,
  listSkeletonDiv,
  listSkeletonUl,
  sliderSkeletonBanner,
  sliderSkeletonContainer,
  sliderSkeletonCard,
  squareSkeleton,
}
