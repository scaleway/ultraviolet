'use client'

import { CopyButton } from '../../../components/CopyButton'
import type { CodeEditorProps } from '../type'
import { codeEditorStyle } from '../styles.css'

export const CodeEditorCopyButton = ({
  copyButton,
  value,
}: {
  copyButton: CodeEditorProps['copyButton']
  value: CodeEditorProps['value']
}) => (
  <CopyButton bordered className={codeEditorStyle.copyButton} sentiment="neutral" size="small" value={value}>
    {typeof copyButton === 'string' ? copyButton : undefined}
  </CopyButton>
)
