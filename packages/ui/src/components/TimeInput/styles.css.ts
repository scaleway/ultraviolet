import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { INPUT_SIZE_HEIGHT } from './constants'

export const timeinputWrapper = recipe({
  base: {
    background: theme.colors.neutral.background,
    border: `1px solid ${theme.colors.neutral.border}`,
    borderRadius: theme.radii.default,
    boxShadow: 'none',
    cursor: 'text',
    display: 'flex',
    padding: theme.space[1],
    selectors: {
      '&:active': {
        borderColor: theme.colors.primary.borderHover,
        boxShadow: theme.shadows.focusPrimary,
      },
      '&:focus-within': {
        borderColor: theme.colors.primary.borderHover,
      },
    },
  },
  variants: {
    disabled: {
      false: {
        selectors: {
          '&:hover, &:focus': {
            borderColor: theme.colors.primary.borderHover,
            outline: 'none',
          },
        },
      },
      true: {
        background: theme.colors.neutral.backgroundDisabled,
        borderColor: theme.colors.neutral.borderDisabled,
        cursor: 'not-allowed',
        selectors: {
          '&:active': {
            borderColor: theme.colors.neutral.borderDisabled,
            boxShadow: 'none',
          },
        },
        userSelect: 'none',
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
          '&:focus-within': {
            borderColor: theme.colors.danger.borderHover,
          },
          '&:hover': {
            borderColor: theme.colors.danger.borderHover,
          },
        },
      },
    },
    readOnly: {
      true: {
        background: theme.colors.neutral.backgroundWeak,
        borderColor: theme.colors.neutral.border,
        cursor: 'default',
        selectors: {
          '&:active': {
            borderColor: theme.colors.neutral.border,
            boxShadow: 'none',
          },
          '&:focus-within': {
            borderColor: theme.colors.neutral.border,
          },
        },
      },
    },
    size: {
      large: {
        height: theme.sizing[INPUT_SIZE_HEIGHT.large],
      },
      medium: {
        height: theme.sizing[INPUT_SIZE_HEIGHT.medium],
      },
      small: {
        height: theme.sizing[INPUT_SIZE_HEIGHT.small],
        paddingLeft: theme.space[1],
      },
    },
  },
})

export const timeinput = recipe({
  base: {
    background: 'transparent',
    border: 'none',
    borderRadius: theme.radii.default,
    caretColor: 'transparent',
    color: theme.colors.neutral.text,
    fontSize: theme.typography.bodySmall.fontSize,
    height: theme.sizing[300],
    outline: 'none',
    selectors: {
      '&::selection': {
        background: 'none',
      },
      '&:disabled': {
        cursor: 'not-allowed',
        userSelect: 'none',
      },
      '&:not(:disabled):active, &:not(:disabled):focus': {
        backgroundColor: theme.colors.neutral.backgroundStrong,
        color: theme.colors.neutral.text,
        outline: 0,
      },
      '&:not(:disabled):hover': {
        backgroundColor: theme.colors.neutral.backgroundHover,
        color: theme.colors.neutral.textWeak,
      },
      '&:read-only': {
        cursor: 'default',
      },
      '&[data-size="large"]': {
        fontSize: theme.typography.body.fontSize,
      },
    },
    textAlign: 'center',
    width: theme.sizing[312],
  },
  defaultVariants: {
    period: false,
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
})

export const timeSeparator = style({
  paddingInline: theme.space['0.25'],
})
