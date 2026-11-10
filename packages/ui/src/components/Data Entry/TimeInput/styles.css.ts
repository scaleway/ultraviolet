import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { INPUT_SIZE_HEIGHT } from './constants'

const wrapper = recipe({
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

const timeinput = recipe({
  base: {
    background: 'transparent',
    border: 'none',
    borderRadius: theme.radii.default,
    caretColor: 'transparent',
    color: theme.colors.neutral.text,
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
      '&::placeholder': {
        color: theme.colors.neutral.textWeak,
      },
    },
    textAlign: 'center',
    width: theme.sizing[312],
  },
  defaultVariants: {
    period: false,
    disabled: false,
  },
  variants: {
    size: {
      large: { fontSize: theme.typography.body.fontSize },
      medium: { fontSize: theme.typography.body.fontSize },
      small: { fontSize: theme.typography.bodySmall.fontSize },
    },
    disabled: {
      true: {
        color: theme.colors.neutral.textDisabled,
        selectors: {
          '&::placeholder': {
            color: theme.colors.neutral.textWeakDisabled,
          },
        },
      },
    },
    period: {
      true: {
        color: theme.colors.neutral.textWeak,
      },
    },
  },
  compoundVariants: [
    {
      variants: { period: true, disabled: true },
      style: {
        color: theme.colors.neutral.textWeakDisabled,
        selectors: {
          '&::placeholder': { color: theme.colors.neutral.textWeakDisabled },
        },
      },
    },
    {
      variants: { period: true, size: 'large' },
      style: { width: `calc(${theme.sizing['312']} + ${theme.sizing[100]})` },
    },
  ],
})

const timeSeparator = style({
  paddingInline: theme.space['0.25'],
})

export const timeInputStyle = {
  wrapper,
  timeinput,
  timeSeparator,
}
