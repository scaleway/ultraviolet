import { consoleDarkTheme, theme } from '@ultraviolet/themes'
import { globalStyle, style, styleVariants } from '@vanilla-extract/css'

export const disabledStack = style({ cursor: 'not-allowed' })

export const copyButton = style({
  backgroundColor: consoleDarkTheme.colors.neutral.backgroundWeak,
  position: 'absolute',
  right: theme.space[1],
  selectors: {
    '&:hover': {
      backgroundColor: consoleDarkTheme.colors.neutral.backgroundHover,
    },
  },
  top: theme.space[1],
})

globalStyle(`${copyButton} svg > path`, {
  fill: consoleDarkTheme.colors.other.icon.product.original.fill,
})

const codeEditorBase = style({
  position: 'relative',
  width: '100%',
})

export const codeEditor = styleVariants({
  default: [codeEditorBase],
  disabled: [codeEditorBase, { pointerEvents: 'none', userSelect: 'none' }],
})

/** Default style */
globalStyle(`${codeEditorBase} .cm-editor`, {
  backgroundColor: consoleDarkTheme.colors.neutral.backgroundWeak,
  border: '1px solid transparent',
  borderRadius: theme.space['0.5'],
  fontFamily: theme.typography.code.fontFamily,
  fontSize: theme.typography.code.fontSize,
})

globalStyle(`${codeEditorBase} .cm-editor.cm-focused`, {
  border: `1px solid ${theme.colors.primary.border}`,
  boxShadow: theme.shadows.focusPrimary,
  outline: 'none',
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
  border: '1px solid transparent',
  boxShadow: 'none',
})
