import { createVar, style, styleVariants } from '@vanilla-extract/css'
import { theme } from '@ultraviolet/themes'

export const subContainerHeightVar = createVar()
export const skeletonHeightVar = createVar({
  syntax: '*',
  inherits: false,
  initialValue: 'auto',
})
export const skeletonWidthVar = createVar({
  syntax: '*',
  inherits: false,
  initialValue: 'auto',
})

export const activeClass = style({
  selectors: {
    '&:hover': {
      border: `1px solid ${theme.colors.primary.borderHover}`,
      boxShadow: theme.shadows.defaultShadow,
      cursor: 'pointer',
    },
  },
})

export const cardClass = style({
  display: 'block',
  textAlign: 'left',
  padding: 0,
  color: theme.colors.neutral.text,
  textDecoration: 'none',
  border: `1px solid ${theme.colors.neutral.border}`,
  borderRadius: theme.radii.default,
  background: theme.colors.neutral.background,
  overflowWrap: 'break-word',
  selectors: {
    '&[disabled]': {
      cursor: 'not-allowed',
    },
    '&[disabled]:hover': {
      border: `1px solid ${theme.colors.neutral.border}`,
      boxShadow: 'none',
    },
  },
})

export const iconContainer = style({
  display: 'flex',
  width: 'fit-content',
  background: theme.colors.neutral.backgroundWeak,
  padding: theme.space['1'],
  borderRadius: theme.radii.default,
})

export const iconStack = styleVariants({
  column: {
    padding: `0 ${theme.space['3']} ${theme.space['3']} ${theme.space['3']}`,
  },
  row: {
    padding: `${theme.space['3']} ${theme.space['3']} ${theme.space['3']} 0`,
  },
})

const subContainerBase = style({
  height: 'fit-content',
})

export const subContainer = styleVariants({
  column: [
    subContainerBase,
    {
      padding: `${theme.space['3']} ${theme.space['3']} 0 ${theme.space['3']}`,
    },
  ],
  row: [
    subContainerBase,
    {
      padding: `${theme.space['3']} 0 ${theme.space['3']} ${theme.space['3']}`,
    },
  ],
  noHref: [
    subContainerBase,
    {
      padding: `${theme.space['3']}`,
    },
  ],
})

const imageBase = style({
  objectFit: 'cover',
  selectors: {
    '&[data-disabled]': {
      filter: 'grayscale(1)',
    },
  },
})

export const imageClass = styleVariants({
  column: [
    imageBase,
    {
      borderRadius: `${theme.radii.default} ${theme.radii.default} 0 0`,
    },
  ],
  row: [
    imageBase,
    {
      borderRadius: `${theme.radii.default} 0 0 ${theme.radii.default}`,
      maxHeight: subContainerHeightVar,
    },
  ],
})

export const fullHeight = style({
  height: '100%',
})

const skeletonImageBase = style({
  height: skeletonHeightVar,
  width: skeletonWidthVar,
})

export const skeletonImage = styleVariants({
  column: [
    skeletonImageBase,
    {
      borderRadius: `${theme.radii.default} ${theme.radii.default} 0 0`,
    },
  ],
  row: [
    skeletonImageBase,
    {
      borderRadius: `${theme.radii.default} 0 0 ${theme.radii.default}`,
    },
  ],
})

export const paddedStack = style({
  padding: theme.space['3'],
})
