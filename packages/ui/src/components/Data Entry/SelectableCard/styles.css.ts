import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

const borderWidth = '1px'

const sizes = ['small', 'medium', 'large'] as const

const paddings = {
  small: { block: theme.space['0.5'], inline: theme.space['1'] },
  medium: { block: theme.space['1'], inline: theme.space[1.5] },
  large: { block: theme.space['1.5'], inline: theme.space[2] },
}

const interactive = ':not([data-error="true"]):not([data-disabled="true"])'

const container = recipe({
  base: {
    background: theme.colors.neutral.background,
    border: `${borderWidth} solid ${theme.colors.neutral.border}`,
    borderRadius: theme.radii.default,
    color: theme.colors.neutral.text,
    cursor: 'pointer',
    outline: 'none',
    position: 'relative',
    selectors: {
      '&[data-checked="true"]': {
        border: `${borderWidth} solid ${theme.colors.primary.border}`,
      },
      '&[data-error="true"]': {
        border: `${borderWidth} solid ${theme.colors.danger.border}`,
      },
      '&[data-disabled="true"]': {
        border: `${borderWidth} solid ${theme.colors.neutral.borderDisabled}`,
        color: theme.colors.neutral.textDisabled,
        background: theme.colors.neutral.backgroundDisabled,
        cursor: 'not-allowed',
      },
      [`&:hover${interactive}, &:active${interactive}`]: {
        border: `${borderWidth} solid ${theme.colors.primary.border}`,
        transitionDuration: '300ms',
      },
      [`&:focus-visible${interactive}`]: {
        border: `${borderWidth} solid ${theme.colors.primary.border}`,
        boxShadow: theme.shadows.focusPrimary,
      },
      [`&[data-checked="false"]:hover${interactive}, &[data-checked="false"]:active${interactive}`]: {
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
    ...sizes.map(size => ({
      style: {
        paddingInline: paddings[size].inline,
        paddingBlock: `calc(${paddings[size].block} - ${borderWidth})`,
      },
      variants: { image: 'none' as const, size },
    })),
    ...sizes.map(size => ({
      style: { paddingRight: paddings[size].inline },
      variants: { image: 'icon' as const, size },
    })),
  ],
})

const labelContainerSelectableCardLabel = style({})
const labelContainerSelectableCardLabelDescription = style({})
const labelContainerSelectableCardNoLabel = style({})

const div = style({
  display: 'flex',
  flexFlow: 'column',
  justifyContent: 'center',
  minWidth: '11.25rem',
  overflow: 'hidden',
  position: 'relative',
})

const image = style({
  left: theme.space[1],
  minWidth: '13.75rem',
  position: 'absolute',
})

const illustration = recipe({
  base: {
    maxWidth: 'calc(100% - 10rem)',
  },
  variants: {
    size: {
      small: { paddingBlock: paddings.small.block, paddingInline: paddings.small.inline },
      medium: { paddingBlock: paddings.medium.block, paddingInline: paddings.medium.inline },
      large: { paddingBlock: paddings.large.block, paddingInline: paddings.large.inline },
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
  paddingLeft: `calc(${theme.sizing[300]} + ${theme.space[1]})`,
  selectors: {
    [`${container.classNames.variants.size.small} &`]: {
      paddingLeft: `calc(${theme.sizing[300]} + ${theme.space[0.5]})`,
    },
  },
})

const selectableElement = style({
  alignItems: 'flex-start',
  display: 'inline-flex',
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
