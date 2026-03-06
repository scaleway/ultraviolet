'use client'

import { langs } from '@uiw/codemirror-extensions-langs'
import { material } from '@uiw/codemirror-theme-material'
import CodeMirror from '@uiw/react-codemirror'
import { cn } from '@ultraviolet/utils'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import { useState } from 'react'
import { Expandable } from '../../Expandable'
import { Label } from '../../Label'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { CodeEditorCopyButton } from './components/CopyButton'
import { CodeEditorExpandable } from './components/Expandable'
import { codeEditorStyle, disabledStack, maxHeightVar } from './styles.css'
import type { CodeEditorProps } from './type'

export const CodeEditor = ({
  value,
  onChange,
  extensions,
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
  expandableHeight,
  hideText = 'Hide',
  showText = 'Show',
  'aria-label': ariaLabel,
  'data-testid': dataTestId,
  className,
  error,
  lineNumbers = true,
  style,
  required,
}: CodeEditorProps) => {
  const [expanded, setExpanded] = useState(false)
  const expandableEnabled = expandableHeight !== undefined

  // Non-editable when disabled, readOnly or not-expanded
  const isEditable = !(disabled && readOnly) && (!expandableEnabled || expanded)

  const content = (
    <>
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
        editable={isEditable}
        extensions={[langs[extensions]?.() ?? langs['sh']]}
        height={expandableEnabled ? undefined : height}
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
        <CodeEditorCopyButton copyButton={copyButton} value={value} />
      ) : null}
    </>
  )

  return (
    <Stack
      className={cn(disabled ? disabledStack : '')}
      gap={0.5}
      style={style}
    >
      {label ? (
        <Label labelDescription={labelDescription} required={required}>
          {label}
        </Label>
      ) : null}
      <div className={codeEditorStyle.wrapper}>
        <div
          className={cn(
            codeEditorStyle.codeEditor[disabled ? 'disabled' : 'default'],
          )}
          style={assignInlineVars({
            [maxHeightVar]:
              !expanded && expandableHeight ? `${expandableHeight}px` : 'none',
          })}
        >
          {expandableEnabled ? (
            <Expandable minHeight={expandableHeight} opened={expanded}>
              {content}
            </Expandable>
          ) : (
            content
          )}
        </div>
        {expandableEnabled ? (
          <CodeEditorExpandable
            expanded={expanded}
            hideText={hideText}
            setExpanded={setExpanded}
            showText={showText}
          />
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
}
