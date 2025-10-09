import { globalStyle, style } from '@vanilla-extract/css'
import { theme } from '@ultraviolet/themes'

export const customStack = style({
  minWidth: 0,
})

export const iconWrapper = style({
  display: 'inline-flex',
  background: theme.colors.neutral.backgroundWeak,
  padding: theme.space['1'],
  borderRadius: theme.radii.default,
})

export const styledWrapper = style({
  padding: theme.space['3'],
  textDecoration: 'none',
  height: '100%',

  selectors: {
    '&:not(:first-child)': {
      borderTop: `1px solid ${theme.colors.neutral.border}`,
    },
    '&:first-child': {
      borderRadius: `${theme.radii.default} ${theme.radii.default} 0 0`,
    },
    '&:last-child': {
      borderRadius: `0 0 ${theme.radii.default} ${theme.radii.default}`,
    },
    '&:hover': {
      background: theme.colors.neutral.backgroundHover,
    },
  },
})

globalStyle(`${styledWrapper} .${iconWrapper}`, {
  background: theme.colors.neutral.backgroundWeak,
})

globalStyle(`${styledWrapper}:hover .${iconWrapper}`, {
  background: 'none',
})

export const fullHeightStack = style({
  height: '100%',
})

export const groupCardWrapper = style({
  borderRadius: theme.radii.default,
  border: `1px solid ${theme.colors.neutral.border}`,
  background: theme.colors.neutral.background,
  minWidth: 0,
})

export const skeletonWrapper = style({
  padding: theme.space['3'],
  selectors: {
    '&:not(:first-child)': {
      borderTop: `1px solid ${theme.colors.neutral.border}`,
    },
  },
})

export const squareSkeleton = style({
  height: 32,
  width: 32,
  borderRadius: theme.radii.default,
})
