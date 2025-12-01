import { theme } from '@ultraviolet/themes'
import { createVar, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const wrapperWidth = createVar()

export const wrapperBarStack = style({
  width: wrapperWidth,
  minWidth: 0,
  transition: 'width 500ms',
  backgroundColor: theme.colors.neutral.backgroundWeak,
  selectors: {
    '&:nth-child(6n+1)': {
      backgroundColor: theme.colors.other.data.charts.data1,
    },
    '&:nth-child(6n+2)': {
      backgroundColor: theme.colors.other.data.charts.data2,
    },
    '&:nth-child(6n+3)': {
      backgroundColor: theme.colors.other.data.charts.data3,
    },
    '&:nth-child(6n+4)': {
      backgroundColor: theme.colors.other.data.charts.data4,
    },
    '&:nth-child(6n+5)': {
      backgroundColor: theme.colors.other.data.charts.data5,
    },
    '&:nth-child(6n+6)': {
      backgroundColor: theme.colors.other.data.charts.data6,
    },
  },
})

export const barStack = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.space[1],
    width: '100%',
    minWidth: 0,
  },
  variants: {
    size: {
      xsmall: {
        height: theme.sizing[200],
        fontSize: theme.typography.captionSmallStrong.fontSize,
      },
      small: {
        height: theme.sizing[300],
        fontSize: theme.typography.captionSmallStrong.fontSize,
      },
      medium: {
        fontSize: theme.typography.captionStrong.fontSize,
        height: theme.sizing[400],
      },
      fontSize: theme.typography.captionStrong.fontSize,
      large: { height: theme.sizing[500] },
    },
  },
  defaultVariants: {
    size: 'medium',
  },
})

export const barStackText = style({
  display: 'block',
  width: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})

export const containerBarStack = style({
  width: '100%',
  display: 'flex',
  backgroundColor: theme.colors.neutral.backgroundWeak,
  borderRadius: theme.radii.default,
  boxShadow: theme.shadows.defaultShadow,
  overflow: 'hidden',
  gap: theme.space['0.25'],
})

export const barStackLabel = style({
  justifyContent: 'space-between',
})

export const barStackLegendCircle = recipe({
  base: {
    width: theme.sizing[100],
    height: theme.sizing[100],
    borderRadius: theme.radii.circle,
  },
  variants: {
    child: {
      0: { backgroundColor: theme.colors.other.data.charts.data1 },
      1: { backgroundColor: theme.colors.other.data.charts.data2 },
      2: { backgroundColor: theme.colors.other.data.charts.data3 },
      3: { backgroundColor: theme.colors.other.data.charts.data4 },
      4: { backgroundColor: theme.colors.other.data.charts.data5 },
      5: { backgroundColor: theme.colors.other.data.charts.data6 },
    },
  },
  defaultVariants: {
    child: 0,
  },
})
