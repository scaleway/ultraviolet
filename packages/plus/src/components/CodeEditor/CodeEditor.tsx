'use client'

import styled from '@emotion/styled'
import { langs } from '@uiw/codemirror-extensions-langs'
import { material } from '@uiw/codemirror-theme-material'
import CodeMirror from '@uiw/react-codemirror'
import { Text } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'

const StyledText = styled(Text)`
  background-color: ${({ theme }) => theme.colors.neutral.backgroundStrong};
  padding: ${({ theme }) => `${theme.space['1']} ${theme.space['2']}`};
  border-radius: ${({ theme }) => `${theme.radii.default}`};
  width: 100%;
`

type CodeEditorProps = {
  title?: string
  value: string
  onChange: ComponentProps<typeof CodeMirror>['onChange']
  extensions: keyof typeof langs
  onBlur?: () => void
  height?: string
  readOnly?: boolean
  autoCompletion?: boolean
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
}: CodeEditorProps) => (
  <div>
    {title ? (
      <StyledText as="h3" variant="headingSmall">
        {title}
      </StyledText>
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
  </div>
)
