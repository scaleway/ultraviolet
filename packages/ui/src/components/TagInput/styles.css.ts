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
    backgroundColor: theme.colors.neutral.background,
    border: `1px solid ${theme.colors.neutral.border}`,
    borderRadius: theme.radii.default,
    cursor: 'text',
    display: 'flex',
    gap: theme.space[1],
    height: 'auto',
    overflowY: 'auto',
    selectors: {
      '&:focus-within': {
        borderColor: theme.colors.primary.borderHover,
        boxShadow: theme.shadows.focusPrimary,
      },
      '&:hover': {
        borderColor: theme.colors.primary.borderHover,
      },
      '&[data-disabled="true"]': {
        background: theme.colors.neutral.backgroundDisabled,
        borderColor: theme.colors.neutral.borderDisabled,
        cursor: 'not-allowed',
      },
      '&[data-error="true"]': {
        borderColor: theme.colors.danger.border,
      },
      '&[data-readonly="true"]': {
        background: theme.colors.neutral.backgroundWeak,
        borderColor: theme.colors.neutral.border,
      },
      '&[data-success="true"]': {
        borderColor: theme.colors.success.border,
      },
    },
  },
  defaultVariants: {
    size: 'large',
  },

  variants: {
    size: {
      large: {
        minHeight: theme.sizing[600],
        padding: `calc(${theme.space[TAGINPUT_SIZE_PADDING.large]} - 1px) ${
          theme.space['2']
        }`,
      },
      medium: {
        minHeight: theme.sizing[500],
        padding: `calc(${theme.space[TAGINPUT_SIZE_PADDING.medium]} - 1px) ${
          theme.space['2']
        }`,
      },
      small: {
        minHeight: theme.sizing[400],
        padding: `calc(${theme.space[TAGINPUT_SIZE_PADDING.small]} - 1px) ${
          theme.space['1']
        }`,
      },
    },
  },
})

export const tagInputDataContainer = style({
  alignItems: 'center',
  display: 'flex',
  flex: 1,
  flexWrap: 'wrap',
  gap: theme.space[1],
  height: '100%',
})

export const tagInputStateContainer = style({
  alignItems: 'center',
  display: 'flex',
  gap: theme.space[1],
})

export const tagInput = style({
  background: 'inherit',
  border: 'none',
  color: theme.colors.neutral.text,
  display: 'flex',
  flex: 1,
  fontSize: theme.typography.bodySmall.fontSize,
  height: '100%',
  outline: 'none',
  selectors: {
    '&::placeholder': {
      color: theme.colors.neutral.textWeak,
    },
    '&:focus': {
      outline: 'none',
    },
    '&[data-size="large"]': {
      fontSize: theme.typography.body.fontSize,
    },
  },
})
