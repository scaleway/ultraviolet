'use client'

import styled from '@emotion/styled'
import { langs } from '@uiw/codemirror-extensions-langs'
import { material } from '@uiw/codemirror-theme-material'
import CodeMirror from '@uiw/react-codemirror'
import { consoleDarkTheme } from '@ultraviolet/themes'
import { CopyButton, Label, Stack, Text } from '@ultraviolet/ui'
import type { ComponentProps, ReactNode } from 'react'

const EditorContainer = styled.div`
  position: relative;
  width: 100%;
`

const StyledCopyButton = styled(CopyButton)`
  position: absolute;
  top: ${({ theme }) => theme.space['1']};
  right: ${({ theme }) => theme.space['1']};
  z-index: 1;

  svg > path {
    fill: ${consoleDarkTheme.colors.other.icon.product.original.fill};
  }

  &:hover {
    background-color: ${consoleDarkTheme.colors.neutral.backgroundHover};
  }
`

const StyledStack = styled(Stack, {
  shouldForwardProp: prop => !['disabled'].includes(prop),
})<{ disabled: boolean }>`
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'auto')};

  .cm-editor {
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    background-color: ${({ disabled }) => (disabled ? consoleDarkTheme.colors.neutral.backgroundWeakDisabled : consoleDarkTheme.colors.neutral.backgroundWeak)};
    border-radius: ${({ theme }) => theme.space['0.5']};

    ${({ disabled }) =>
      disabled
        ? `
      pointer-events: none;
      color: ${consoleDarkTheme.colors.neutral.textDisabled}`
        : ''}
   }

  .cm-content {
    padding-block: ${({ theme }) => theme.space['2']};
  };

  .cm-gutters {
    background-color: ${consoleDarkTheme.colors.neutral.backgroundHover};
  }

  .cm-line span {
    ${({ disabled }) =>
      disabled
        ? `
      color: ${consoleDarkTheme.colors.neutral.textDisabled}`
        : ''}
  }

  .cm-lineNumbers {
    padding-left: ${({ theme }) => theme.space['1']};
  }

  .cm-gutterElement {
    color: ${({ disabled }) => (disabled ? consoleDarkTheme.colors.neutral.textWeakDisabled : '#545454')};
  }

  .cm-scroller {
    border-radius: ${({ theme }) => theme.space['0.5']};
  }
`
type CodeEditorProps = {
  value: string
  onChange: ComponentProps<typeof CodeMirror>['onChange']
  extensions: keyof typeof langs
  onBlur?: () => void
  height?: string
  readOnly?: boolean
  autoCompletion?: boolean
  disabled?: boolean
  helper?: ReactNode
  /**
   * When set to true, a copy button is displayed in the top right corner of the editor.
   * If a string is provided, it is used as the button's label. Otherwise, no label is displayed.
   */
  copyButton?: boolean | string
  label?: string
  id?: string
}

export const CodeEditor = ({
  value,
  onChange,
  extensions = 'javascript',
  onBlur,
  height,
  readOnly,
  autoCompletion,
  disabled = false,
  label,
  copyButton,
  id,
  helper,
}: CodeEditorProps) => (
  <StyledStack gap={0.5} disabled={disabled}>
    {label ? <Label>{label}</Label> : null}

    <EditorContainer>
      {copyButton && !disabled ? (
        <StyledCopyButton
          bordered
          value={value}
          sentiment="neutral"
          size="small"
        >
          {typeof copyButton === 'string' ? copyButton : undefined}
        </StyledCopyButton>
      ) : null}
      <CodeMirror
        readOnly={readOnly}
        width="100%"
        height={height}
        onChange={onChange}
        value={value}
        extensions={[langs[extensions]()]}
        onBlur={onBlur}
        basicSetup={{
          highlightActiveLine: false,
          highlightActiveLineGutter: false,
        }}
        id={id}
        theme={material}
      />
    </EditorContainer>
    {helper ? (
      <Text as="span" variant="caption" prominence="weak" sentiment="neutral">
        {helper}
      </Text>
    ) : null}
    <CodeMirror
      readOnly={readOnly}
      width="100%"
      height={height}
      theme={material}
      onChange={onChange}
      value={value}
      extensions={[langs[extensions]()]}
      onBlur={onBlur}
      basicSetup={{
        highlightActiveLine: false,
        highlightActiveLineGutter: false,
        autocompletion: autoCompletion,
      }}
    />
  </StyledStack>
)
