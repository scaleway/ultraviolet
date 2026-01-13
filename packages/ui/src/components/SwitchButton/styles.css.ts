import { theme } from '@ultraviolet/themes'
import { globalStyle, style, styleVariants } from '@vanilla-extract/css'

const SIZES = {
  medium: '600',
  small: '500', // sizing token from theme
} as const

const switchButtonContainerBase = style({
  border: `1px solid ${theme.colors.neutral.border}`,
  borderRadius: theme.radii.default,
  display: 'flex',
  gap: theme.space[1],
  padding: theme.space['0.5'],
  position: 'relative',
})

export const switchButtonContainer = styleVariants({
  medium: [switchButtonContainerBase, { height: theme.sizing[SIZES.medium] }],
  small: [switchButtonContainerBase, { height: theme.sizing[SIZES.small] }],
})

export const switchButtonOptionBase = style({
  alignItems: 'center',
  background: 'transparent',
  border: 'none',
  fontWeight: theme.typography.bodyStrong.weight,
  height: '100%',
  justifyContent: 'center',
  padding: `${theme.space[1]} ${theme.space[2]}`,
  selectors: {
    '&:hover, &:active': {
      border: 'none !important',
      boxShadow: 'none !important',
    },
    '&[data-checked="false"]:hover:not([data-error="true"])[data-disabled="false"]':
      { boxShadow: 'none' },
    '&[data-checked="false"][data-error="false"][data-disabled="false"]:active':
      { boxShadow: 'none' },
    '&[data-checked="true"]': { border: 'none' },
    '&[data-disabled="true"]': { background: 'transparent', border: 'none' },
  },
  transition: 'all 200ms ease-in-out ',
  userSelect: 'none',
  whiteSpace: 'nowrap',
})

/**
 * Create style variant so it is easier to deal with the global styles
 */
export const switchButtonOption = styleVariants({
  neutral: [switchButtonOptionBase],
  primary: [switchButtonOptionBase],
})

globalStyle(`${switchButtonOptionBase}[data-checked="true"] label`, {
  color: theme.colors.neutral.textStrong,
  transition: 'color 300ms ease-in-out',
})

globalStyle(`${switchButtonOptionBase} label`, {
  transition: 'color 300ms ease-in-out',
})

globalStyle(`${switchButtonOption.primary}[data-checked="true"] label`, {
  color: theme.colors.primary.textStrong,
})

globalStyle(`${switchButtonOption.neutral}[data-checked="false"] label:hover`, {
  color: theme.colors.neutral.textHover,
})

globalStyle(`${switchButtonOption.primary}[data-checked="false"] label:hover`, {
  color: theme.colors.primary.text,
})

globalStyle(`${switchButtonOptionBase}[data-disabled="true"] label`, {
  color: theme.colors.neutral.textDisabled,
})

globalStyle(
  `${switchButtonOptionBase}[data-checked='false'][data-disabled="true"] label:hover`,
  {
    background: 'transparent',
    color: theme.colors.neutral.textDisabled,
  },
)

const focusOverlayBase = style({
  borderRadius: theme.radii.default,
  height: `calc(100% - ${theme.space[1]})`,
  position: 'absolute',
  transformOrigin: 'left center',
  transition: 'all 200ms ease-in-out',
})

export const focusOverlay = styleVariants({
  neutral: [
    focusOverlayBase,
    { background: theme.colors.neutral.backgroundStrong },
  ],
  primary: [
    focusOverlayBase,
    { background: theme.colors.primary.backgroundStrong },
  ],
})
