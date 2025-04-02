'use client'

import styled from '@emotion/styled'
import { langs } from '@uiw/codemirror-extensions-langs'
import { material } from '@uiw/codemirror-theme-material'
import CodeMirror from '@uiw/react-codemirror'
import { consoleDarkTheme } from '@ultraviolet/themes'
import { CopyButton, Label, Stack, Text } from '@ultraviolet/ui'
import type { ComponentProps, ReactNode } from 'react'

const StyledText = styled(Text)`
  background-color: ${({ theme }) => theme.colors.neutral.backgroundStrong};
  padding: ${({ theme }) => `${theme.space['1']} ${theme.space['2']}`};
  border-radius: ${({ theme }) => `${theme.radii.default}`};
  width: 100%;
`

const EditorContainer = styled.div`
  position: relative;
  width: 100%;
`

const StyledCopyButton = styled(CopyButton)`
  position: absolute;
  top: ${({ theme }) => theme.space['1']};
  right: ${({ theme }) => theme.space['1']};

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
    font-family: ${({ theme }) => theme.typography.code.fontFamily};
    font-size:  ${({ theme }) => theme.typography.code.fontSize};
    background-color: ${({ disabled }) => (disabled ? consoleDarkTheme.colors.neutral.backgroundWeakDisabled : consoleDarkTheme.colors.neutral.backgroundWeak)};
    border-radius: ${({ theme }) => theme.space['0.5']};

    ${({ disabled }) =>
      disabled
        ? `
      pointer-events: none;
      color: ${consoleDarkTheme.colors.neutral.textDisabled};`
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
  /**
   * @deprecated use prop `label` instead
   */
  title?: string
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
  labelDescription?: ReactNode
}

export const CodeEditor = ({
  title,
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
  labelDescription,
}: CodeEditorProps) => (
  <StyledStack gap={0.5} disabled={disabled}>
    {label ? <Label labelDescription={labelDescription}>{label}</Label> : null}
    {title && !label ? (
      <StyledText as="h3" variant="headingSmall">
        {title}
      </StyledText>
    ) : null}
    <EditorContainer>
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
