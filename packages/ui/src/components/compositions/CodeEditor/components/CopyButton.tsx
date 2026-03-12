'use client'

import { CopyButton } from '../../../CopyButton'
import { codeEditorStyle } from '../styles.css'
import type { CodeEditorProps } from '../type'

export const CodeEditorCopyButton = ({
  copyButton,
  value,
}: {
  copyButton: CodeEditorProps['copyButton']
  value: CodeEditorProps['value']
}) => (
  <CopyButton
    bordered
    className={codeEditorStyle.copyButton}
    sentiment="neutral"
    size="small"
    value={value}
  >
    {typeof copyButton === 'string' ? copyButton : undefined}
  </CopyButton>
)
