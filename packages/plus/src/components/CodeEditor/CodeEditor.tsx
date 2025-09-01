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

  .cm-editor {
    font-family: ${({ theme }) => theme.typography.code.fontFamily};
    font-size:  ${({ theme }) => theme.typography.code.fontSize};
    background-color: ${consoleDarkTheme.colors.neutral.backgroundWeak};
    border-radius: ${({ theme }) => theme.space['0.5']};
    border: 1px solid transparent;
  }

  .cm-editor.cm-focused {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.focusPrimary};
    border: 1px solid ${({ theme }) => theme.colors.primary.border};
  }

  .cm-content {
    padding-block: ${({ theme }) => theme.space['2']};
  };

  .cm-gutters {
    background-color: ${consoleDarkTheme.colors.neutral.backgroundHover};
  }

  .cm-lineNumbers {
    padding-left: ${({ theme }) => theme.space['1']};
  }

  .cm-gutterElement {
    color: #545454;
  }

  .cm-scroller {
    border-radius: ${({ theme }) => theme.space['0.5']};
  }

  &[data-disabled="true"] {
    pointer-events: none;
    user-select: none;

    .cm-editor {
      background-color: ${
        consoleDarkTheme.colors.neutral.backgroundWeakDisabled
      };
      color: ${consoleDarkTheme.colors.neutral.textDisabled};
    }

    .cm-line span {
      color: ${consoleDarkTheme.colors.neutral.textDisabled};
    }

    .cm-gutter-Element {
      color: ${consoleDarkTheme.colors.neutral.textWeakDisabled};
    }

    .cm-cursor {
      border-left-color: transparent;
      display: none;
    }

    .cm-selectionMatch {
      background-color: transparent;
    }

    .cm-selectionLayer {
      display: none;
    }

    .cm-editor.cm-focused {
      box-shadow: none;
      border: 1px solid transparent;
    }
  }
`
const StyledStack = styled(Stack)`
  &[data-disabled="true"] {
    cursor: not-allowed;
  }
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
  labelDescription?: ReactNode
  'aria-label'?: string
  'data-testid'?: string
  className?: string
  error?: string
  lineNumbers?: boolean
}

export const CodeEditor = ({
  value,
  onChange,
  extensions = 'js',
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
  'aria-label': ariaLabel,
  'data-testid': dataTestId,
  className,
  error,
  lineNumbers = true,
}: CodeEditorProps) => (
  <StyledStack data-disabled={disabled} gap={0.5}>
    {label ? <Label labelDescription={labelDescription}>{label}</Label> : null}
    <EditorContainer data-disabled={disabled}>
      <CodeMirror
        aria-disabled={disabled}
        aria-label={ariaLabel}
        basicSetup={{
          autocompletion: autoCompletion,
          highlightActiveLine: false,
          highlightActiveLineGutter: false,
          lineNumbers,
        }}
        className={className}
        data-testid={dataTestId}
        editable={!disabled || !readOnly}
        extensions={[langs[extensions]()]}
        height={height}
        id={id}
        onBlur={onBlur}
        onChange={onChange}
        onUpdate={() => {
          if (disabled) {
            document.getSelection()?.empty()
          }
        }}
        readOnly={readOnly || disabled}
        theme={material}
        value={value}
        width="100%"
      />
      {copyButton && !disabled ? (
        <StyledCopyButton
          bordered
          sentiment="neutral"
          size="small"
          value={value}
        >
          {typeof copyButton === 'string' ? copyButton : undefined}
        </StyledCopyButton>
      ) : null}
    </EditorContainer>
    {error && typeof error !== 'boolean' ? (
      <Text as="span" sentiment="danger" variant="caption">
        {error}
      </Text>
    ) : null}
    {!error && helper ? (
      <Text as="span" prominence="weak" sentiment="neutral" variant="caption">
        {helper}
      </Text>
    ) : null}
  </StyledStack>
)
