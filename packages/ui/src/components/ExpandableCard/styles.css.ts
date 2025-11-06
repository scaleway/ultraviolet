import { globalStyle, style } from '@vanilla-extract/css'
import { theme } from '@ultraviolet/themes'

export const arrowIcon = style({
  transition: 'transform 0.2s ease-in-out',
})

export const dropableArea = style({
  height: theme.space['3'],
  borderBottom: '2px solid',
  borderColor: 'transparent',
  padding: `${theme.space['0.5']} 0`,
  width: '100%',
  bottom: '-5px',
  position: 'absolute',
  selectors: {
    '&[data-first="true"]': {
      top: `-${theme.space['3']}`,
    },

    '&::after': {
      content: "''",
      left: 0,
      bottom: '-4px',
      height: '0px',
      width: '0px',
      border: '3px solid',
      borderColor: 'inherit',
      borderRadius: theme.radii.circle,
      display: 'flex',
      marginTop: `-${theme.space['1']}`,
      marginLeft: `-${theme.space['0.25']}`,
      position: 'absolute',
    },
  },
})

export const summaryClass = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.space['2'],
  padding: theme.space['3'],
  listStyleType: 'none',
  cursor: 'pointer',

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
  width: '100%',
  transition: 'border-color 0.2s ease-in-out',

  selectors: {
    '&[open]': {
      borderColor: theme.colors.primary.border,
    },

    '&[data-clicking="true"]': {
      boxShadow: `${theme.shadows.raised[0]}, ${theme.shadows.raised[1]}`,
      borderColor: theme.colors.primary.border,
    },
  },
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
  height: '100%',
  opacity: 0,
  transition: 'opacity 0.2s ease-in-out',
  cursor: 'grab',
  paddingTop: `calc(${theme.space['3']} + 2px)`,

  selectors: {
    '&[data-visible="true"]': {
      opacity: 1,
    },
    '&:focus-within': {
      opacity: 1,
    },

    '&:active': {
      cursor: 'grabbing',
      opacity: 1,
    },
  },
})
