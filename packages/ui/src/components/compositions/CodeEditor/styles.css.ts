import { consoleDarkTheme, theme } from '@ultraviolet/themes'
import {
  createVar,
  globalStyle,
  style,
  styleVariants,
} from '@vanilla-extract/css'

export const maxHeightVar = createVar()
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
  maxHeight: maxHeightVar,
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
  outline: 'none',
  boxShadow: 'none',
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

const showMoreContainerBase = style({
  width: '100%',
  backgroundColor: consoleDarkTheme.colors.neutral.backgroundWeak,
  borderRadius: theme.space['0.5'],
  position: 'relative',
  marginTop: `calc(-1 * ${theme.space[1]})`,
  transition: 'box-shadow .5s',
})
export const showMoreContainer = styleVariants({
  false: [
    showMoreContainerBase,
    {
      boxShadow: `0px -22px 19px -6px ${consoleDarkTheme.colors.neutral.backgroundWeak}`,
    },
  ],
  true: [
    showMoreContainerBase,
    {
      boxShadow: 'none',
    },
  ],
})

export const showMoreButton = style({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: theme.space[2],
  paddingTop: theme.space[1],
  width: '100%',
})

export const centeredText = style({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  color: consoleDarkTheme.colors.neutral.text,
})

export const animatedArrowIcon = styleVariants({
  false: {
    transform: 'rotate(0deg)',
    transformOrigin: 'center',
    transition: 'transform 300ms ease-in-out',
  },
  true: {
    transform: 'rotate(180deg)',
    transformOrigin: 'center',
    transition: 'transform 300ms ease-in-out',
  },
})

export const codeEditorWrapper = style({
  borderRadius: theme.space['0.5'],
  border: '1px solid transparent',

  selectors: {
    [`&:has(${codeEditorBase} .cm-editor.cm-focused)`]: {
      boxShadow: theme.shadows.focusPrimary,
      border: `1px solid ${theme.colors.primary.border}`,
    },
  },
})
