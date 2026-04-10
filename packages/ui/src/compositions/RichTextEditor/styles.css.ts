import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const toolbarRow = recipe({
  base: {
    borderBottom: `1px solid ${theme.colors.neutral.border}`,
    flexShrink: 0,
    padding: `${theme.space['0.5']} ${theme.space[1]}`,
  },
  defaultVariants: {
    error: false,
    success: false,
  },
  variants: {
    error: {
      true: {
        borderBottomColor: theme.colors.danger.border,
      },
    },
    success: {
      true: {
        borderBottomColor: theme.colors.success.border,
      },
    },
  },
})

export const editorSurface = recipe({
  base: {
    background: theme.colors.neutral.background,
    border: `1px solid ${theme.colors.neutral.border}`,
    borderRadius: theme.radii.default,
    color: theme.colors.neutral.text,
    overflow: 'hidden',
    width: '100%',
  },
  defaultVariants: {
    error: false,
    success: false,
  },
  variants: {
    disabled: {
      true: {
        background: theme.colors.neutral.backgroundDisabled,
        borderColor: theme.colors.neutral.borderDisabled,
        color: theme.colors.neutral.textDisabled,
      },
    },
    error: {
      true: {
        borderColor: theme.colors.danger.border,
      },
    },
    success: {
      true: {
        borderColor: theme.colors.success.border,
      },
    },
  },
})

export const docRegion = style({
  lineHeight: 1.5,
  outline: 'none',
  overflowY: 'auto',
  padding: theme.space[1],
  whiteSpace: 'pre-wrap',
  width: '100%',
})

export const richTextEditorStyle = {
  docRegion,
  editorSurface,
  toolbarRow,
}
