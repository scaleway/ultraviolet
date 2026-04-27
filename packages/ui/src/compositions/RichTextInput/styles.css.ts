import { theme } from '@ultraviolet/themes'
import { createVar, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const docRegionMaxHeightVar = createVar()
export const docRegionMinHeightVar = createVar()

export const wrapper = style({
  display: 'flex',
})

export const errorIcon = style({
  position: 'relative',
  right: theme.space['1'],
  top: theme.space['1'],
})

export const toolbarRow = style({
  borderBottom: `1px solid ${theme.colors.neutral.border}`,
  flexShrink: 0,
  padding: `${theme.space['0.5']} ${theme.space[1]}`,
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
  lineHeight: theme.typography.body.lineHeight,
  maxHeight: docRegionMaxHeightVar,
  minHeight: docRegionMinHeightVar,
  outline: 'none',
  overflowY: 'auto',
  padding: theme.space[1],
  whiteSpace: 'pre-wrap',
  width: '100%',
})

export const richTextInputStyle = {
  docRegion,
  editorSurface,
  errorIcon,
  wrapper,
  toolbarRow,
}
