import { theme } from '@ultraviolet/themes'
import { globalStyle, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { inputDisplay, labelDisplay } from './variables.css'

const paddingsInline = {
  small: theme.space['1.5'],
  medium: theme.space[2],
  large: theme.space[2],
}

const paddingsBlock = {
  small: theme.space['0.5'],
  medium: theme.space[1],
  large: theme.space['1.5'],
}

const container = recipe({
  base: {
    background: theme.colors.neutral.background,
    border: `1px solid ${theme.colors.neutral.border}`,
    borderRadius: theme.radii.default,
    color: theme.colors.neutral.text,
    cursor: 'pointer',
    position: 'relative',
    padding: theme.space[0],
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
    transition: `
    border-color 200ms ease,
    box-shadow 200ms ease`,
    width: '100%',
  },
  defaultVariants: {
    cursor: 'custom',
    image: 'none',
    size: 'large',
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
      icon: {},
      illustration: {},
      none: {},
    },
    size: {
      small: {},
      medium: {},
      large: {},
    },
  },
  compoundVariants: [
    {
      style: { paddingInline: paddingsInline.small, paddingBlock: paddingsBlock.small },
      variants: { size: 'small', image: 'none' },
    },
    {
      style: { paddingInline: paddingsInline.medium, paddingBlock: paddingsBlock.medium },
      variants: { size: 'medium', image: 'none' },
    },
    {
      style: { paddingInline: paddingsInline.large, paddingBlock: paddingsBlock.large },
      variants: { size: 'large', image: 'none' },
    },
    {
      style: { paddingRight: paddingsInline.small },
      variants: { size: 'small', image: 'icon' },
    },
    {
      style: { paddingRight: paddingsInline.medium },
      variants: { size: 'medium', image: 'icon' },
    },
    {
      style: { paddingRight: paddingsInline.large },
      variants: { size: 'large', image: 'icon' },
    },
  ],
})

const labelContainerSelectableCardLabel = style({})
const labelContainerSelectableCardLabelDescription = style({})
const labelContainerSelectableCardNoLabel = style({})

const div = style({
  alignItems: 'normal',
  display: 'flex',
  flexFlow: 'column',
  gap: 0,
  justifyContent: 'center',
  minWidth: '11.25rem',
  overflow: 'hidden',
  position: 'relative',
})

const image = style({
  height: 'auto',
  left: theme.space[1],
  minWidth: '13.75rem',
  objectFit: 'cover',
  position: 'absolute',
})

const illustration = recipe({
  base: {
    flex: '0 1 auto',
    maxWidth: 'calc(100% - 10rem)',
    padding: theme.space[2],
  },
  variants: {
    size: {
      small: {
        paddingInline: paddingsInline.small,
        paddingBlock: paddingsBlock.small,
      },
      medium: { paddingInline: paddingsInline.medium, paddingBlock: paddingsBlock.medium },
      large: { paddingInline: paddingsInline.large, paddingBlock: paddingsBlock.large },
    },
  },
  defaultVariants: {
    size: 'large',
  },
})

const stack = recipe({
  variants: {
    defaultCursor: {
      true: {
        cursor: 'default',
      },
    },
    label: {
      false: {
        display: 'contents',
      },
    },
  },
})

const indentedCard = style({
  paddingLeft: theme.space[4],
})

const selectableElement = style({
  alignItems: 'flex-start',
  display: 'inline-flex',
})

globalStyle(`${selectableElement} > input + svg`, {
  display: inputDisplay,
})

globalStyle(`${selectableElement} > label`, {
  display: labelDisplay,
})

export const selectableCardStyle = {
  container,
  labelContainerSelectableCardLabel,
  labelContainerSelectableCardLabelDescription,
  labelContainerSelectableCardNoLabel,
  div,
  image,
  illustration,
  stack,
  indentedCard,
  selectableElement,
}
