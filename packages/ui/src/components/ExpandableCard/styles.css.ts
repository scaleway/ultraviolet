import { theme } from '@ultraviolet/themes'
import { globalStyle, style } from '@vanilla-extract/css'

export const arrowIcon = style({
  transition: 'transform 0.2s ease-in-out',
})

export const dropableArea = style({
  borderBottom: '2px solid',
  borderColor: 'transparent',
  bottom: '-5px',
  height: theme.space['3'],
  padding: `${theme.space['0.5']} 0`,
  position: 'absolute',
  selectors: {
    '&::after': {
      border: '3px solid',
      borderColor: 'inherit',
      borderRadius: theme.radii.circle,
      bottom: '-4px',
      content: "''",
      display: 'flex',
      height: '0px',
      left: 0,
      marginLeft: `-${theme.space['0.25']}`,
      marginTop: `-${theme.space['1']}`,
      position: 'absolute',
      width: '0px',
    },
    '&[data-first="true"]': {
      top: `-${theme.space['3']}`,
    },
  },
  width: '100%',
})

export const summaryClass = style({
  alignItems: 'center',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'row',
  gap: theme.space['2'],
  listStyleType: 'none',
  padding: theme.space['3'],

  selectors: {
    '&[data-disabled="true"]': {
      background: theme.colors.neutral.backgroundWeak,
      borderRadius: theme.radii.default,
      cursor: 'not-allowed',
    },
  },
})

export const detailsClass = style({
  border: `1px solid ${theme.colors.neutral.border}`,
  borderRadius: theme.radii.default,

  selectors: {
    '&[data-clicking="true"]': {
      borderColor: theme.colors.primary.border,
      boxShadow: `${theme.shadows.raised[0]}, ${theme.shadows.raised[1]}`,
    },
    '&[open]': {
      borderColor: theme.colors.primary.border,
    },
  },
  transition: 'border-color 0.2s ease-in-out',
  width: '100%',
})

export const content = style({
  borderTop: `1px solid ${theme.colors.neutral.border}`,
  padding: theme.space['3'],
  selectors: {
    [`${detailsClass}[open] > &`]: {
      borderColor: theme.colors.primary.border,
    },
  },
})
globalStyle(`${detailsClass}[open] ${arrowIcon}`, {
  transform: 'rotate(180deg)',
})

export const stackClass = style({
  position: 'relative',
})

globalStyle(`${stackClass}:hover > ${detailsClass}`, {
  borderColor: theme.colors.primary.border,
})

export const dragIconContainer = style({
  cursor: 'grab',
  height: '100%',
  opacity: 0,
  paddingTop: `calc(${theme.space['3']} + 2px)`,

  selectors: {
    '&:active': {
      cursor: 'grabbing',
      opacity: 1,
    },
    '&:focus-within': {
      opacity: 1,
    },
    '&[data-visible="true"]': {
      opacity: 1,
    },
  },
  transition: 'opacity 0.2s ease-in-out',
})
