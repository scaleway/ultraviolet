import { theme } from '@ultraviolet/themes'
import { globalStyle, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { inputDisplay, labelDisplay } from './variables.css'

export const containerSelectableCard = recipe({
  base: {
    background: theme.colors.neutral.background,
    border: `1px solid ${theme.colors.neutral.border}`,
    borderRadius: theme.radii.default,
    color: theme.colors.neutral.text,
    cursor: 'pointer',
    padding: theme.space[2],
    position: 'relative',
    selectors: {
      '&:hover:not([data-error="true"]):not([data-disabled="true"]), &:active:not([data-error="true"]):not([data-disabled="true"])':
        {
          border: `1px solid ${theme.colors.primary.border}`,
        },

      '&[data-checked="false"]:hover:not([data-error="true"]):not([data-disabled="true"]), &[data-checked="false"]:active:not([data-error="true"]):not([data-disabled="true"])':
        {
          boxShadow: theme.shadows.hoverPrimary,
        },
      '&[data-checked="true"]': {
        border: `1px solid ${theme.colors.primary.border}`,
      },
      '&[data-disabled="true"]': {
        background: theme.colors.neutral.backgroundDisabled,
        border: `1px solid ${theme.colors.neutral.borderDisabled}`,
        color: theme.colors.neutral.textDisabled,
        cursor: 'not-allowed',
      },
      '&[data-error="true"]': {
        border: `1px solid ${theme.colors.danger.border}`,
      },
    },
    transition: `
    border-color 200ms ease,
    box-shadow 200ms ease`,
    width: '100%',
  },
  defaultVariants: {
    cursor: 'custom',
    image: 'none',
  },
  variants: {
    cursor: {
      custom: {
        cursor: 'pointer',
      },
      default: {
        cursor: 'default',
      },
    },
    image: {
      icon: {
        padding: theme.space[0],
        paddingRight: theme.space[2],
      },
      illustration: {
        padding: theme.space[0],
      },
      none: {},
    },
  },
})

export const labelContainerSelectableCardLabel = style({
  selectors: {
    '&:first-child': {
      marginBottom: `-${theme.space['0.5']}`,
    },
  },
})
export const labelContainerSelectableCardNoLabel = style({})

export const divSelectableCard = style({
  alignItems: 'normal',
  display: 'flex',
  flexFlow: 'column',
  gap: 0,
  justifyContent: 'center',
  minWidth: '11.25rem',
  overflow: 'hidden',
  position: 'relative',
})

export const imageSelectableCard = style({
  height: 'auto',
  left: theme.space[1],
  minWidth: '13.75rem',
  objectFit: 'cover',
  position: 'absolute',
})

export const illustrationSelectableCard = style({
  flex: '0 1 auto',
  maxWidth: 'calc(100% - 10rem)',
  padding: theme.space[2],
})

export const stackSelectableCard = style({
  selectors: {
    '&[data-has-default-cursor="true"]': {
      cursor: 'default',
    },
    '&[data-has-label="false"]': {
      display: 'contents',
    },
  },
})

export const indentedCard = style({
  paddingLeft: theme.space[4],
})

export const selectableElementSelectableCard = style({
  alignItems: 'start',
  display: 'inline-flex',
  selectors: {
    '&[data-checked="true"]': {
      color: theme.colors.primary.text,
    },
    '&[data-disabled="true"]': {
      color: theme.colors.neutral.textDisabled,
    },
    '&[data-error="true"]': {
      color: theme.colors.danger.text,
    },
  },
})

globalStyle(`${selectableElementSelectableCard} > input + svg`, {
  display: inputDisplay,
})

globalStyle(`${selectableElementSelectableCard} > label`, {
  display: labelDisplay,
})
