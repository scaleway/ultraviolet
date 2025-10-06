import { theme } from '@ultraviolet/themes'
import { createVar, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const paddingRightVar = createVar()
export const textareaWrapper = style({
  position: 'relative',
  display: 'flex',
  width: '100%',
})

export const textAreaClearableContainer = style({
  position: 'absolute',
  top: theme.space['1.5'],
  right: theme.space[1],
})

export const textArea = recipe({
  base: {
    width: '100%',
    resize: 'vertical',
    background: theme.colors.neutral.background,
    border: `1px solid ${theme.colors.neutral.border}`,
    color: theme.colors.neutral.text,
    borderRadius: theme.radii.default,
    padding: `${theme.space['1.5']} ${theme.space['1']} ${theme.space['1.5']} ${theme.space['2']}`,
    paddingRight: paddingRightVar,
    selectors: {
      '&::placeholder': {
        color: theme.colors.neutral.textWeak,
      },
      '&:read-only': {
        background: theme.colors.neutral.backgroundWeak,
        borderColor: theme.colors.neutral.border,
      },
      '&:disabled': {
        background: theme.colors.neutral.backgroundDisabled,
        borderColor: theme.colors.neutral.borderDisabled,
        color: theme.colors.neutral.textDisabled,
      },
      '&:disabled::placeholder': {
        color: theme.colors.neutral.textWeakDisabled,
      },
      '&:not(:disabled):hover': {
        borderColor: theme.colors.primary.border,
      },
      '&:not(:disabled):focus': {
        outline: 'none',
        borderColor: theme.colors.primary.border,
        boxShadow: theme.shadows.focusPrimary,
      },
    },
  },
  variants: {
    success: {
      true: {
        borderColor: theme.colors.success.border,
      },
    },
    error: {
      true: {
        borderColor: theme.colors.danger.border,
      },
    },
  },
  defaultVariants: {
    success: false,
    error: false,
  },
})
