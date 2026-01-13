import { theme } from '@ultraviolet/themes'
import { createVar, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const wrapperWidth = createVar()

export const wrapperBarStack = style({
  backgroundColor: theme.colors.neutral.backgroundWeak,
  minWidth: 0,
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
  transition: 'width 500ms',
  width: wrapperWidth,
})

export const barStack = recipe({
  base: {
    alignItems: 'center',
    display: 'flex',
    minWidth: 0,
    padding: theme.space[1],
    width: '100%',
  },
  defaultVariants: {
    size: 'medium',
  },
  variants: {
    size: {
      fontSize: theme.typography.captionStrong.fontSize,
      large: { height: theme.sizing[500] },
      medium: {
        fontSize: theme.typography.captionStrong.fontSize,
        height: theme.sizing[400],
      },
      small: {
        fontSize: theme.typography.captionSmallStrong.fontSize,
        height: theme.sizing[300],
      },
      xsmall: {
        fontSize: theme.typography.captionSmallStrong.fontSize,
        height: theme.sizing[200],
      },
    },
  },
})

export const barStackText = style({
  display: 'block',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  width: '100%',
})

export const containerBarStack = style({
  backgroundColor: theme.colors.neutral.backgroundWeak,
  borderRadius: theme.radii.default,
  boxShadow: theme.shadows.defaultShadow,
  display: 'flex',
  gap: theme.space['0.25'],
  overflow: 'hidden',
  width: '100%',
})

export const barStackLabel = style({
  justifyContent: 'space-between',
})

export const barStackLegendCircle = recipe({
  base: {
    borderRadius: theme.radii.circle,
    height: theme.sizing[100],
    width: theme.sizing[100],
  },
  defaultVariants: {
    child: 0,
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
})
