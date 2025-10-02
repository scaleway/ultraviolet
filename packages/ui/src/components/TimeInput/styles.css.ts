import { theme } from '@ultraviolet/themes'
import { recipe } from '@vanilla-extract/recipes'
import { INPUT_SIZE_HEIGHT } from './constants'
import { style } from '@vanilla-extract/css'

export const timeinputWrapper = recipe({
  base: {
    display: 'flex',
    cursor: 'text',
    padding: theme.space[1],
    boxShadow: 'none',
    background: theme.colors.neutral.background,
    borderRadius: theme.radii.default,
    border: `1px solid ${theme.colors.neutral.border}`,
    selectors: {
      '&:focus-within': {
        borderColor: theme.colors.primary.borderHover,
      },
      '&:active': {
        borderColor: theme.colors.primary.borderHover,
        boxShadow: theme.shadows.focusPrimary,
      },
    },
  },
  variants: {
    disabled: {
      true: {
        selectors: {
          '&:active': {
            borderColor: theme.colors.neutral.borderDisabled,
            boxShadow: 'none',
          },
        },
        background: theme.colors.neutral.backgroundDisabled,
        borderColor: theme.colors.neutral.borderDisabled,
        cursor: 'not-allowed',
        userSelect: 'none',
      },
      false: {
        selectors: {
          '&:hover, &:focus': {
            borderColor: theme.colors.primary.borderHover,
            outline: 'none',
          },
        },
      },
    },
    readOnly: {
      true: {
        selectors: {
          '&:active': {
            borderColor: theme.colors.neutral.border,
            boxShadow: 'none',
          },
          '&:focus-within': {
            borderColor: theme.colors.neutral.border,
          },
        },
        background: theme.colors.neutral.backgroundWeak,
        borderColor: theme.colors.neutral.border,
        cursor: 'default',
      },
    },
    error: {
      true: {
        border: `1px solid ${theme.colors.danger.border}`,
        selectors: {
          '&:active': {
            borderColor: theme.colors.danger.borderHover,
            boxShadow: theme.shadows.focusDanger,
          },
          '&:hover': {
            borderColor: theme.colors.danger.borderHover,
          },
          '&:focus-within': {
            borderColor: theme.colors.danger.borderHover,
          },
        },
      },
    },
    size: {
      small: {
        height: theme.sizing[INPUT_SIZE_HEIGHT.small],
        paddingLeft: theme.space[1],
      },
      medium: {
        height: theme.sizing[INPUT_SIZE_HEIGHT.medium],
      },
      large: {
        height: theme.sizing[INPUT_SIZE_HEIGHT.large],
      },
    },
  },
})

export const timeinput = recipe({
  base: {
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontSize: theme.typography.bodySmall.fontSize,
    width: theme.sizing[312],
    height: theme.sizing[300],
    textAlign: 'center',
    borderRadius: theme.radii.default,
    color: theme.colors.neutral.text,
    caretColor: 'transparent',
    selectors: {
      '&:not(:disabled):hover': {
        backgroundColor: theme.colors.neutral.backgroundHover,
        color: theme.colors.neutral.textWeak,
      },
      '&:not(:disabled):active, &:not(:disabled):focus': {
        backgroundColor: theme.colors.neutral.backgroundStrong,
        color: theme.colors.neutral.text,
        outline: 0,
      },
      '&:read-only': {
        cursor: 'default',
      },
      '&:disabled': {
        cursor: 'not-allowed',
        userSelect: 'none',
      },
      '&[data-size="large"]': {
        fontSize: theme.typography.body.fontSize,
      },
      '&::moz-selection, &::selection': {
        background: 'none',
      },
    },
  },
  variants: {
    period: {
      true: {
        color: theme.colors.neutral.textWeak,
        selectors: {
          "&[data-size='large']": {
            width: `calc(${theme.sizing['312']} + ${theme.sizing[100]})`,
          },
        },
      },
    },
  },
  defaultVariants: {
    period: false,
  },
})

export const timeSeparator = style({
  paddingInline: theme.space['0.25'],
})
