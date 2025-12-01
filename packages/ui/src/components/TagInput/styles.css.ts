import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const TAGINPUT_SIZE_PADDING = {
  large: '1.5',
  medium: '1',
  small: '0.5',
} as const

export const tagInputContainer = recipe({
  base: {
    display: 'flex',
    gap: theme.space[1],
    backgroundColor: theme.colors.neutral.background,
    cursor: 'text',
    border: `1px solid ${theme.colors.neutral.border}`,
    borderRadius: theme.radii.default,
    selectors: {
      '&:focus-within': {
        borderColor: theme.colors.primary.borderHover,
        boxShadow: theme.shadows.focusPrimary,
      },
      '&[data-success="true"]': {
        borderColor: theme.colors.success.border,
      },
      '&[data-error="true"]': {
        borderColor: theme.colors.danger.border,
      },
      '&:hover': {
        borderColor: theme.colors.primary.borderHover,
      },
      '&[data-readonly="true"]': {
        borderColor: theme.colors.neutral.border,
        background: theme.colors.neutral.backgroundWeak,
      },
      '&[data-disabled="true"]': {
        borderColor: theme.colors.neutral.borderDisabled,
        background: theme.colors.neutral.backgroundDisabled,
        cursor: 'not-allowed',
      },
    },
  },

  variants: {
    size: {
      large: {
        padding: `calc(${theme.space[TAGINPUT_SIZE_PADDING.large]} - 1px) ${
          theme.space['2']
        }`,
        minHeight: theme.sizing[600],
      },
      small: {
        padding: `calc(${theme.space[TAGINPUT_SIZE_PADDING.small]} - 1px) ${
          theme.space['1']
        }`,
        minHeight: theme.sizing[400],
      },
      medium: {
        padding: `calc(${theme.space[TAGINPUT_SIZE_PADDING.medium]} - 1px) ${
          theme.space['2']
        }`,
        minHeight: theme.sizing[500],
      },
    },
    multiline: {
      height: 'auto',
      minHeight: theme.sizing[400],
      maxHeight: '200px',
      overflowY: 'auto',
    },
  },
  defaultVariants: {
    size: 'large',
  },
})

export const tagInputDataContainer = style({
  height: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: theme.space[1],
  flex: 1,
})

export const tagInputStateContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: theme.space[1],
})

export const tagInput = style({
  display: 'flex',
  flex: 1,
  fontSize: theme.typography.bodySmall.fontSize,
  background: 'inherit',
  color: theme.colors.neutral.text,
  border: 'none',
  outline: 'none',
  height: '100%',
  selectors: {
    '&::placeholder': {
      color: theme.colors.neutral.textWeak,
    },
    '&[data-size="large"]': {
      fontSize: theme.typography.body.fontSize,
    },
    '&:focus': {
      outline: 'none',
    },
  },
})
