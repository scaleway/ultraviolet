import { consoleDarkTheme, theme } from '@ultraviolet/themes'
import { globalStyle, style, styleVariants } from '@vanilla-extract/css'

export const disabledStack = style({ cursor: 'not-allowed' })

export const copyButton = style({
  position: 'absolute',
  top: theme.space[1],
  right: theme.space[1],
  backgroundColor: consoleDarkTheme.colors.neutral.backgroundWeak,
  selectors: {
    '&:hover': {
      backgroundColor: consoleDarkTheme.colors.neutral.backgroundHover,
    },
  },
})

globalStyle(`${copyButton} svg > path`, {
  fill: consoleDarkTheme.colors.other.icon.product.original.fill,
})

const codeEditorBase = style({
  position: 'relative',
  width: '100%',
})

export const codeEditor = styleVariants({
  disabled: [codeEditorBase, { pointerEvents: 'none', userSelect: 'none' }],
  default: [codeEditorBase],
})

/** Default style */
globalStyle(`${codeEditorBase} .cm-editor`, {
  fontFamily: theme.typography.code.fontFamily,
  fontSize: theme.typography.code.fontSize,
  backgroundColor: consoleDarkTheme.colors.neutral.backgroundWeak,
  borderRadius: theme.space['0.5'],
  border: `1px solid transparent`,
})

globalStyle(`${codeEditorBase} .cm-editor.cm-focused`, {
  outline: 'none',
  boxShadow: theme.shadows.focusPrimary,
  border: `1px solid ${theme.colors.primary.border}`,
})

globalStyle(`${codeEditorBase} .cm-content`, {
  paddingBlock: theme.space[2],
})

globalStyle(`${codeEditorBase} .cm-gutters`, {
  backgroundColor: consoleDarkTheme.colors.neutral.backgroundHover,
})

globalStyle(`${codeEditorBase} .cm-lineNumbers`, {
  paddingLeft: theme.space[1],
})

globalStyle(`${codeEditorBase} .cm-gutterElement`, {
  color: '#545454',
})

globalStyle(`${codeEditorBase} .cm-scroller`, {
  borderRadius: theme.space['0.5'],
})

/**
 * Disabled style
 */
globalStyle(`${codeEditor.disabled} .cm-editor`, {
  backgroundColor: consoleDarkTheme.colors.neutral.backgroundWeakDisabled,
  color: consoleDarkTheme.colors.neutral.textDisabled,
})

globalStyle(`${codeEditor.disabled} .cm-line span`, {
  color: consoleDarkTheme.colors.neutral.textDisabled,
})

globalStyle(`${codeEditor.disabled} .cm-gutter-Element`, {
  color: consoleDarkTheme.colors.neutral.textWeakDisabled,
})

globalStyle(`${codeEditor.disabled} .cm-cursor`, {
  borderLeftColor: 'transparent',
  display: 'none',
})

globalStyle(`${codeEditor.disabled} .cm-selectionMatch`, {
  backgroundColor: 'transparent',
})

globalStyle(`${codeEditor.disabled} .cm-selectionLayer`, {
  display: 'none',
})

globalStyle(`${codeEditor.disabled} .cm-editor.cm-focused`, {
  boxShadow: 'none',
  border: '1px solid transparent',
})
