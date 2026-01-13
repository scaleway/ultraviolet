import { theme } from '@ultraviolet/themes'
import { createVar, style, styleVariants } from '@vanilla-extract/css'

export const subContainerHeightVar = createVar()
export const skeletonHeightVar = createVar({
  inherits: false,
  initialValue: 'auto',
  syntax: '*',
})
export const skeletonWidthVar = createVar({
  inherits: false,
  initialValue: 'auto',
  syntax: '*',
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
  background: theme.colors.neutral.background,
  border: `1px solid ${theme.colors.neutral.border}`,
  borderRadius: theme.radii.default,
  color: theme.colors.neutral.text,
  display: 'block',
  overflowWrap: 'break-word',
  padding: 0,
  selectors: {
    '&[disabled]': {
      cursor: 'not-allowed',
    },
    '&[disabled]:hover': {
      border: `1px solid ${theme.colors.neutral.border}`,
      boxShadow: 'none',
    },
  },
  textAlign: 'left',
  textDecoration: 'none',
})

export const iconContainer = style({
  background: theme.colors.neutral.backgroundWeak,
  borderRadius: theme.radii.default,
  display: 'flex',
  padding: theme.space['1'],
  width: 'fit-content',
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
  noHref: [
    subContainerBase,
    {
      padding: `${theme.space['3']}`,
    },
  ],
  row: [
    subContainerBase,
    {
      padding: `${theme.space['3']} 0 ${theme.space['3']} ${theme.space['3']}`,
    },
  ],
})

const imageBase = style({
  objectFit: 'cover',
  selectors: {
    '&[data-disabled="true"]': {
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
