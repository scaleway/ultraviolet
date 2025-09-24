import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'
import type { RecipeVariants } from '@vanilla-extract/recipes'
import { recipe } from '@vanilla-extract/recipes'
import { SIZES } from './constants'

const ANIMATION_DURATION = 200 // in ms

// MenuContent styles
export const styledPopup = recipe({
  base: {
    backgroundColor: theme.colors.other.elevation.background.raised,
    boxShadow: `${theme.shadows.raised[0]}, ${theme.shadows.raised[1]}`,
    padding: '0',
    minWidth: SIZES.small,
    maxWidth: SIZES.large,
    borderRadius: theme.radii.default,
    selectors: {
      '&[data-has-arrow="true"]::after': {
        borderColor: `${theme.colors.other.elevation.background.raised} transparent transparent transparent`,
      },
    },
  },
  variants: {
    searchable: {
      true: {
        minWidth: '20rem',
      },
      false: {},
    },
  },
  defaultVariants: {
    searchable: false,
  },
})

export const content = style({
  overflow: 'auto',
})

export const footer = style({
  padding: theme.space['1'],
})

export const menuList = recipe({
  base: {
    overflowY: 'auto',
    overflowX: 'hidden',
    backgroundColor: theme.colors.other.elevation.background.raised,
    color: theme.colors.neutral.text,
    borderRadius: theme.radii.default,
    position: 'relative',
    selectors: {
      '&::after, &::before': {
        border: 'solid transparent',
        borderWidth: '9px',
        content: '" "',
        height: 0,
        width: 0,
        position: 'absolute',
        pointerEvents: 'none',
      },
      '&::after': {
        borderColor: 'transparent',
      },
      '&::before': {
        borderColor: 'transparent',
      },
    },
  },
  variants: {
    height: {
      default: {},
    },
  },
  defaultVariants: {
    height: 'default',
  },
})

export const styledSearchInput = style({
  padding: theme.space['1'],
})

// Item styles
export const itemContainer = recipe({
  base: {
    width: '100%',
    selectors: {
      '&:last-child': {
        border: 'none',
      },
    },
  },
  variants: {
    borderless: {
      true: {
        padding: `${theme.space['0.25']} ${theme.space['0.5']}`,
      },
      false: {
        borderBottom: `1px solid ${theme.colors.neutral.border}`,
        padding: `${theme.space['0.5']} ${theme.space['0.5']}`,
      },
    },
  },
  defaultVariants: {
    borderless: false,
  },
})

const getItemStyle = (sentiment: 'neutral' | 'primary' | 'danger', disabled: boolean) => ({
  display: 'flex',
  justifyContent: 'start',
  textAlign: 'left' as const,
  alignItems: 'center',
  minHeight: theme.sizing['400'],
  maxHeight: theme.sizing['500'],
  fontSize: theme.typography.bodySmall.fontSize,
  lineHeight: theme.typography.bodySmall.lineHeight,
  fontWeight: 'inherit',
  padding: `${theme.space['0.5']} ${theme.space['1']}`,
  border: 'none',
  cursor: disabled ? 'not-allowed' : 'pointer',
  minWidth: '6.875rem',
  width: '100%',
  borderRadius: theme.radii.default,
  transition: `background-color ${ANIMATION_DURATION}ms, color ${ANIMATION_DURATION}ms`,
  color: theme.colors[sentiment][disabled ? 'textDisabled' : 'text'],
  selectors: {
    'svg': {
      fill: theme.colors[sentiment][disabled ? 'textDisabled' : 'text'],
    },
    ...(disabled ? {} : {
      '&:hover, &:focus-visible, &[data-active="true"]': {
        backgroundColor: theme.colors[sentiment].backgroundHover,
        color: theme.colors[sentiment].textHover,
      },
      '&:hover svg, &:focus-visible svg, &[data-active="true"] svg': {
        fill: theme.colors[sentiment].textHover,
      },
    }),
  },
})

export const styledItem = recipe({
  base: {
    background: 'none',
  },
  variants: {
    sentiment: {
      neutral: {},
      primary: {},
      danger: {},
    },
    disabled: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: { sentiment: 'neutral', disabled: false },
      style: getItemStyle('neutral', false),
    },
    {
      variants: { sentiment: 'neutral', disabled: true },
      style: getItemStyle('neutral', true),
    },
    {
      variants: { sentiment: 'primary', disabled: false },
      style: getItemStyle('primary', false),
    },
    {
      variants: { sentiment: 'primary', disabled: true },
      style: getItemStyle('primary', true),
    },
    {
      variants: { sentiment: 'danger', disabled: false },
      style: getItemStyle('danger', false),
    },
    {
      variants: { sentiment: 'danger', disabled: true },
      style: getItemStyle('danger', true),
    },
  ],
  defaultVariants: {
    sentiment: 'neutral',
    disabled: false,
  },
})

export const styledLinkItem = recipe({
  base: {
    textDecoration: 'none',
    selectors: {
      '&:focus': {
        textDecoration: 'none',
      },
    },
  },
  variants: {
    sentiment: {
      neutral: {},
      primary: {},
      danger: {},
    },
    disabled: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: { sentiment: 'neutral', disabled: false },
      style: getItemStyle('neutral', false),
    },
    {
      variants: { sentiment: 'neutral', disabled: true },
      style: getItemStyle('neutral', true),
    },
    {
      variants: { sentiment: 'primary', disabled: false },
      style: getItemStyle('primary', false),
    },
    {
      variants: { sentiment: 'primary', disabled: true },
      style: getItemStyle('primary', true),
    },
    {
      variants: { sentiment: 'danger', disabled: false },
      style: getItemStyle('danger', false),
    },
    {
      variants: { sentiment: 'danger', disabled: true },
      style: getItemStyle('danger', true),
    },
  ],
  defaultVariants: {
    sentiment: 'neutral',
    disabled: false,
  },
})

// Group styles
export const groupContainer = style({
  padding: `${theme.space['0.5']} ${theme.space['1.5']}`,
  textAlign: 'left',
})

export type MenuContentVariants = RecipeVariants<typeof styledPopup>
export type MenuListVariants = RecipeVariants<typeof menuList>
export type ItemContainerVariants = RecipeVariants<typeof itemContainer>
export type ItemVariants = RecipeVariants<typeof styledItem>
export type LinkItemVariants = RecipeVariants<typeof styledLinkItem>