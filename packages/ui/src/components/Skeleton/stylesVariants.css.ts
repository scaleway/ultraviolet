import { theme } from '@ultraviolet/themes'
import { createVar, style } from '@vanilla-extract/css'

export const columns = createVar()
export const widthLine = createVar()
export const sliderLength = createVar()

export const CIRCLE_SIZE = 12.875

export const blockSkeletonLine = style({
  display: 'flex',
  alignItems: 'center',
  padding: `${theme.space[3]} ${theme.space[2]}`,
  selectors: {
    '&:not(:last-child)': {
      borderBottom: `1px solid ${theme.colors.neutral.border}`,
    },
  },
})

export const blockSkeletonList = style({
  minHeight: '12.5rem',
  width: '100%',
  height: '100%',
  padding: theme.space[2],
  border: `1px solid ${theme.colors.neutral.borderWeak}`,
  borderRadius: theme.radii.default,
  margin: 0,
})

export const blocksContainer = style({
  display: 'grid',
  gridTemplateColumns: `repeat(${columns}, 1fr)`,
  gap: theme.space[2],
})

export const blocksSkeleton = style({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  padding: `${theme.space[1]} ${theme.space[2]}`,
  border: `1px solid ${theme.colors.neutral.borderWeak}`,
  borderRadius: theme.radii.default,
  overflow: 'hidden',
})

export const boxWithIconSkeleton = style({
  height: '8.125rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  border: `1px solid ${theme.colors.neutral.borderWeak}`,
  borderRadius: theme.radii.default,
  overflow: 'hidden',
})

export const donutSkeletonContainer = style({
  display: 'flex',
})

export const donutSkeletonSvg = style({
  height: `${CIRCLE_SIZE}rem`,
  width: `${CIRCLE_SIZE}rem`,
  transform: 'rotate(-90deg)',
})

export const donutSkeletonCircle = style({
  transformOrigin: '50% 50%',
  stroke: theme.colors.neutral.borderWeak,
  strokeWidth: 18,
  strokeLinecap: 'butt',
  fill: 'none',
})

export const donutSkeletonLineList = style({
  display: 'grid',
  listStyle: 'none',
  gap: theme.space[2],
})

export const iconSkeleton = style({
  marginRight: theme.space[1],
  width: theme.space[4],
  height: theme.space[4],
  minWidth: theme.space[4],
  borderRadius: theme.radii.large,
  backgroundColor: theme.colors.neutral.borderWeak,
})

export const lineSkeleton = style({
  height: theme.sizing[150],
  width: widthLine,
  maxWidth: '100%',
  borderRadius: theme.radii.large,
  backgroundColor: theme.colors.neutral.borderWeak,
})

export const listSkeletonLi = style({
  display: 'flex',
  alignItems: 'center',
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
  padding: 0,
  margin: 0,
})

export const sliderSkeletonContainer = style({
  height: '17.375rem',
  display: 'grid',
  gridTemplateColumns: `repeat(${sliderLength}, 1fr)`,
  gap: theme.space[2],
  overflow: 'auto',
})

export const sliderSkeletonCard = style({
  border: `1px solid ${theme.colors.neutral.borderWeak}`,
  borderRadius: theme.radii.default,
  width: '14.875rem',
  height: '16.375rem',
  overflow: 'hidden',
})

export const sliderSkeletonBanner = style({
  border: `1px solid ${theme.colors.neutral.borderWeak}`,
  backgroundColor: theme.colors.neutral.borderWeak,
  width: '100%',
  height: '33%',
})

export const squareSkeleton = style({
  height: '100%',
  width: '100%',
  maxWidth: '100%',
  backgroundColor: theme.colors.neutral.borderWeak,
})
