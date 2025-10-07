import { theme } from '@ultraviolet/themes'
import { globalStyle, style, styleVariants } from '@vanilla-extract/css'

const SIZES = {
  medium: '600',
  small: '500', // sizing token from theme
} as const

const switchButtonContainerBase = style({
  border: `1px solid ${theme.colors.neutral.border}`,
  borderRadius: theme.radii.default,
  padding: theme.space['0.5'],
  display: 'flex',
  gap: theme.space[1],
  position: 'relative',
})

export const switchButtonContainer = styleVariants({
  small: [switchButtonContainerBase, { height: theme.sizing[SIZES.small] }],
  medium: [switchButtonContainerBase, { height: theme.sizing[SIZES.medium] }],
})

export const switchButtonOptionBase = style({
  border: 'none',
  padding: `${theme.space[1]} ${theme.space[2]}`,
  fontWeight: theme.typography.bodyStrong.weight,
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'all 200ms ease-in-out ',
  whiteSpace: 'nowrap',
  background: 'transparent',
  height: '100%',
  userSelect: 'none',
  selectors: {
    '&:hover, &:active': {
      boxShadow: 'none !important',
      border: 'none !important',
    },
    '&[data-checked="false"][data-error="false"][data-disabled="false"]:active':
      { boxShadow: 'none' },
    '&[data-checked="false"]:hover:not([data-error="true"])[data-disabled="false"]':
      { boxShadow: 'none' },
    '&[data-checked="true"]': { border: 'none' },
    '&[data-disabled="true"]': { border: 'none', background: 'transparent' },
  },
})

/**
 * Create style variant so it is easier to deal with the global styles
 */
export const switchButtonOption = styleVariants({
  primary: [switchButtonOptionBase],
  neutral: [switchButtonOptionBase],
})

globalStyle(`${switchButtonOptionBase}[data-checked="true"] label`, {
  transition: 'color 300ms ease-in-out',
  color: theme.colors.neutral.textStrong,
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
  position: 'absolute',
  height: `calc(100% - ${theme.space[1]})`,
  borderRadius: theme.radii.default,
  transformOrigin: 'left center',
  transition: 'all 200ms ease-in-out',
})

export const focusOverlay = styleVariants({
  primary: [
    focusOverlayBase,
    { background: theme.colors.primary.backgroundStrong },
  ],
  neutral: [
    focusOverlayBase,
    { background: theme.colors.neutral.backgroundStrong },
  ],
})
