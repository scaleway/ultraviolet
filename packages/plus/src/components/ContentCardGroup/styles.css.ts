import { theme } from '@ultraviolet/themes'
import { globalStyle, style } from '@vanilla-extract/css'

export const customStack = style({
  minWidth: 0,
})

export const iconWrapper = style({
  background: theme.colors.neutral.backgroundWeak,
  borderRadius: theme.radii.default,
  display: 'inline-flex',
  padding: theme.space['1'],
})

export const styledWrapper = style({
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
  background: theme.colors.neutral.background,
  border: `1px solid ${theme.colors.neutral.border}`,
  borderRadius: theme.radii.default,
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
  borderRadius: theme.radii.default,
  height: 32,
  width: 32,
})
