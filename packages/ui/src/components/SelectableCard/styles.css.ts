import { theme } from '@ultraviolet/themes'
import { globalStyle, style, styleVariants } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { radioStack } from '../Radio/styles.css'
import { inputDisplay, labelDisplay, widthSelectable } from './variables.css'
import { checkboxContainer } from '../Checkbox/styles.css'

export const containerSelectableCard = recipe({
  base: {
    position: 'relative',
    padding: theme.space[2],
    borderRadius: theme.radii.default,
    transition: `
    border-color 200ms ease,
    box-shadow 200ms ease`,
    cursor: 'pointer',
    background: theme.colors.neutral.background,
    border: `1px solid ${theme.colors.neutral.border}`,
    color: theme.colors.neutral.text,
    width: '100%',
    selectors: {
      '&[data-checked="true"]': {
        border: `1px solid ${theme.colors.primary.border}`,
      },
      '&[data-error="true"]': {
        border: `1px solid ${theme.colors.danger.border}`,
      },
      '&[data-disabled="true"]': {
        border: `1px solid ${theme.colors.neutral.borderDisabled}`,
        color: theme.colors.neutral.textDisabled,
        background: theme.colors.neutral.backgroundDisabled,
        cursor: 'not-allowed',
      },
      '&:hover:not([data-error="true"]):not([data-disabled="true"]), &:active:not([data-error="true"]):not([data-disabled="true"])':
        {
          border: `1px solid ${theme.colors.primary.border}`,
        },

      '&[data-checked="false"]:hover:not([data-error="true"]):not([data-disabled="true"]), &[data-checked="false"]:active:not([data-error="true"]):not([data-disabled="true"])':
        {
          boxShadow: theme.shadows.hoverPrimary,
        },
    },
  },
  variants: {
    image: {
      none: {},
      icon: {
        padding: theme.space[0],
        paddingRight: theme.space[2],
      },
      illustration: {
        padding: theme.space[0],
      },
    },
    cursor: {
      default: {
        cursor: 'default',
      },
      custom: {
        cursor: 'pointer',
      },
    },
  },
  defaultVariants: {
    image: 'none',
    cursor: 'custom',
  },
})

export const labelContainerSelectableCard = styleVariants({
  label: {
    selectors: {
      '&:first-child': {
        marginBottom: `-${theme.space['0.5']}`,
      },
    },
  },
  noLabel: {},
})

globalStyle(`${labelContainerSelectableCard.label} ${radioStack}`, {
  width: '100%',
})

globalStyle(`${labelContainerSelectableCard.label} ${checkboxContainer}`, {
  width: '100%',
})

export const divSelectableCard = style({
  display: 'flex',
  gap: 0,
  flexFlow: 'column',
  alignItems: 'normal',
  justifyContent: 'center',
  minWidth: '11.25rem',
  position: 'relative',
  overflow: 'hidden',
})

export const imageSelectableCard = style({
  objectFit: 'cover',
  position: 'absolute',
  minWidth: '13.75rem',
  height: 'auto',
  left: theme.space[1],
})

export const illustrationSelectableCard = style({
  padding: theme.space[2],
  maxWidth: 'calc(100% - 10rem)',
  flex: '0 1 auto',
})

export const stackSelectableCard = style({
  selectors: {
    '&[data-has-label="false"]': {
      display: 'contents',
    },
    '&[data-has-default-cursor="true"]': {
      cursor: 'default',
    },
  },
})

export const indentedCard = style({
  paddingLeft: theme.space[4],
})

export const selectableElementSelectableCard = style({
  display: 'inline-flex',
  alignItems: 'start',
  selectors: {
    '&[data-checked="true"]': {
      color: theme.colors.primary.text,
    },
    '&[data-error="true"]': {
      color: theme.colors.danger.text,
    },
    '&[data-disabled="true"]': {
      color: theme.colors.neutral.textDisabled,
    },
  },
})

globalStyle(`${selectableElementSelectableCard} > input + svg`, {
  display: inputDisplay,
})

globalStyle(`${selectableElementSelectableCard} > label`, {
  display: labelDisplay,
})

globalStyle(`${selectableElementSelectableCard} > ${radioStack}`, {
  width: widthSelectable,
})
