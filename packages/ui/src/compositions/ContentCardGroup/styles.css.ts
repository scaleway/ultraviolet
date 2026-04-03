import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'

const customStack = style({
  minWidth: 0,
})

const cardWrapper = style({
  height: '100%',
  padding: theme.space['3'],

  selectors: {
    '&:first-child': {
      borderRadius: `${theme.radii.default} ${theme.radii.default} 0 0`,
    },
    '&:hover': {
      background: theme.colors.neutral.backgroundHover,
    },
    '&:last-child': {
      borderRadius: `0 0 ${theme.radii.default} ${theme.radii.default}`,
    },
    '&:not(:first-child)': {
      borderTop: `1px solid ${theme.colors.neutral.border}`,
    },
  },
  textDecoration: 'none',
})

const iconWrapper = style({
  background: theme.colors.neutral.backgroundWeak,
  borderRadius: theme.radii.default,
  display: 'inline-flex',
  padding: theme.space['1'],
  selectors: {
    [`${cardWrapper}:hover &`]: {
      background: 'none',
    },
  },
})

const cardContentStack = style({
  height: '100%',
})

const groupCardWrapper = style({
  background: theme.colors.neutral.background,
  border: `1px solid ${theme.colors.neutral.border}`,
  borderRadius: theme.radii.default,
  minWidth: 0,
})

const skeletonWrapper = style({
  padding: theme.space['3'],
  selectors: {
    '&:not(:first-child)': {
      borderTop: `1px solid ${theme.colors.neutral.border}`,
    },
  },
})

const squareSkeleton = style({
  borderRadius: theme.radii.default,
  height: 32,
  width: 32,
})

export const contentCardGroupStyle = {
  customStack,
  cardWrapper,
  iconWrapper,
  cardContentStack,
  groupCardWrapper,
  skeletonWrapper,
  squareSkeleton,
}
