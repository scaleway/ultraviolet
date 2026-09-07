import { theme } from '@ultraviolet/themes'
import { createVar, style } from '@vanilla-extract/css'

export const columns = createVar()
export const widthLine = createVar()
export const sliderLength = createVar()

export const CIRCLE_SIZE = 12.875

export const blockSkeletonLine = style({
  alignItems: 'center',
  display: 'flex',
  padding: `${theme.space[3]} ${theme.space[2]}`,
  selectors: {
    '&:not(:last-child)': {
      borderBottom: `1px solid ${theme.colors.neutral.border}`,
    },
  },
})

export const blockSkeletonList = style({
  border: `1px solid ${theme.colors.neutral.borderWeak}`,
  borderRadius: theme.radii.default,
  height: '100%',
  margin: 0,
  minHeight: '12.5rem',
  padding: theme.space[2],
  width: '100%',
})

export const blocksContainer = style({
  display: 'grid',
  gap: theme.space[2],
  gridTemplateColumns: `repeat(${columns}, 1fr)`,
})

export const blocksSkeleton = style({
  alignItems: 'center',
  border: `1px solid ${theme.colors.neutral.borderWeak}`,
  borderRadius: theme.radii.default,
  display: 'flex',
  overflow: 'hidden',
  padding: `${theme.space[1]} ${theme.space[2]}`,
  width: '100%',
})

export const boxWithIconSkeleton = style({
  alignItems: 'center',
  border: `1px solid ${theme.colors.neutral.borderWeak}`,
  borderRadius: theme.radii.default,
  display: 'flex',
  flexDirection: 'column',
  height: '8.125rem',
  justifyContent: 'space-evenly',
  overflow: 'hidden',
})

export const donutSkeletonContainer = style({
  display: 'flex',
})

export const donutSkeletonSvg = style({
  height: `${CIRCLE_SIZE}rem`,
  transform: 'rotate(-90deg)',
  width: `${CIRCLE_SIZE}rem`,
})

export const donutSkeletonCircle = style({
  fill: 'none',
  stroke: theme.colors.neutral.borderWeak,
  strokeLinecap: 'butt',
  strokeWidth: 18,
  transformOrigin: '50% 50%',
})

export const donutSkeletonLineList = style({
  display: 'grid',
  gap: theme.space[2],
  listStyle: 'none',
})

export const iconSkeleton = style({
  backgroundColor: theme.colors.neutral.borderWeak,
  borderRadius: theme.radii.large,
  height: theme.space[4],
  marginRight: theme.space[1],
  minWidth: theme.space[4],
  width: theme.space[4],
})

export const lineSkeleton = style({
  backgroundColor: theme.colors.neutral.borderWeak,
  borderRadius: theme.radii.large,
  height: theme.sizing[150],
  maxWidth: '100%',
  width: widthLine,
})

export const listSkeletonLi = style({
  alignItems: 'center',
  display: 'flex',
  height: theme.sizing[600],
  padding: `${theme.space['0.5']} ${theme.space[1]}`,
  selectors: {
    '&:nth-of-type(even)': {
      backgroundColor: theme.colors.neutral.backgroundDisabled,
    },
  },
})

export const listSkeletonDiv = style({
  flex: 1,
})

export const listSkeletonUl = style({
  listStyle: 'none',
  margin: 0,
  padding: 0,
})

export const sliderSkeletonContainer = style({
  display: 'grid',
  gap: theme.space[2],
  gridTemplateColumns: `repeat(${sliderLength}, 1fr)`,
  height: '17.375rem',
  overflow: 'auto',
})

export const sliderSkeletonCard = style({
  border: `1px solid ${theme.colors.neutral.borderWeak}`,
  borderRadius: theme.radii.default,
  height: '16.375rem',
  overflow: 'hidden',
  width: '14.875rem',
})

export const sliderSkeletonBanner = style({
  backgroundColor: theme.colors.neutral.borderWeak,
  border: `1px solid ${theme.colors.neutral.borderWeak}`,
  height: '33%',
  width: '100%',
})

export const squareSkeleton = style({
  backgroundColor: theme.colors.neutral.borderWeak,
  height: '100%',
  maxWidth: '100%',
  width: '100%',
})
