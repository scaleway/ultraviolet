'use client'

import { langs } from '@uiw/codemirror-extensions-langs'
import { material } from '@uiw/codemirror-theme-material'
import CodeMirror from '@uiw/react-codemirror'
import { CopyButton, Label, Stack, Text } from '@ultraviolet/ui'
import { cn } from '@ultraviolet/utils'
import type { ComponentProps, CSSProperties, ReactNode } from 'react'
import {
  codeEditor,
  copyButton as copyButtonStyle,
  disabledStack,
} from './styles.css'

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
  style?: CSSProperties
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
  style,
}: CodeEditorProps) => (
  <Stack className={cn(disabled ? disabledStack : '')} gap={0.5} style={style}>
    {label ? <Label labelDescription={labelDescription}>{label}</Label> : null}
    <div className={cn(codeEditor[disabled ? 'disabled' : 'default'])}>
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
        editable={!(disabled && readOnly)}
        extensions={[langs[extensions]?.() ?? langs.sh]}
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
        <CopyButton
          bordered
          className={copyButtonStyle}
          sentiment="neutral"
          size="small"
          value={value}
        >
          {typeof copyButton === 'string' ? copyButton : undefined}
        </CopyButton>
      ) : null}
    </div>
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
  </Stack>
)
