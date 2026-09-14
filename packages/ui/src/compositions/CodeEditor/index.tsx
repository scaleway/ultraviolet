'use client'

import { languages } from '@codemirror/language-data'
import { material } from '@uiw/codemirror-theme-material'
import CodeMirror from '@uiw/react-codemirror'
import { cn } from '@ultraviolet/utils'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import { useEffect, useId, useState } from 'react'
import { Expandable } from '../../components/Action/Expandable'
import { Stack } from '../../components/Layout/Stack'
import { Description } from '../../components/Typography/Description'
import { Label } from '../../components/Typography/Label'
import { hasHelperText } from '../../helpers/hasHelperText'
import { CodeEditorCopyButton } from './components/CopyButton'
import { CodeEditorExpandable } from './components/Expandable'
import type { CodeEditorProps } from './type'
import { codeEditorStyle, disabledStack, maxHeightVar } from './styles.css'

type LoadedLanguage = Awaited<ReturnType<(typeof languages)[number]['load']>>

const loadLanguage = (name: string): Promise<LoadedLanguage> => {
  switch (name.toLowerCase()) {
    case 'nix':
      return import('@replit/codemirror-lang-nix').then(({ nix }) => nix())
    case 'svelte':
      return import('@replit/codemirror-lang-svelte').then(({ svelte }) => svelte())
    case 'solidity':
      return import('@replit/codemirror-lang-solidity').then(({ solidity }) => solidity)
    default:
      return (
        languages.find(lang => lang.extensions.some(ext => ext.toLowerCase() === name.toLowerCase())) ??
        languages.find(lang => lang.name.toLowerCase() === 'shell')!
      ).load()
  }
}

/**
 * A code editor is a specialized tool designed to help developers write, edit, and manage code efficiently.
 */
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
  onFocus,
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
  'aria-describedby': ariaDescribedBy,
}: CodeEditorProps) => {
  const [expanded, setExpanded] = useState(false)
  const [language, setLanguage] = useState<LoadedLanguage | null>(null)
  const expandableEnabled = expandableHeight !== undefined

  const helperId = useId()

  useEffect(() => {
    let cancelled = false
    loadLanguage(extensions)
      .then(loaded => {
        if (!cancelled) setLanguage(loaded)
      })
      .catch(() => undefined)
    return () => {
      cancelled = true
    }
  }, [extensions])

  // Non-editable when disabled, readOnly or not-expanded
  const isEditable = !(disabled && readOnly) && (!expandableEnabled || expanded)

  const content = (
    <>
      <CodeMirror
        aria-describedby={ariaDescribedBy || (hasHelperText(helper, error) ? helperId : undefined)}
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
        extensions={language ? [language] : []}
        height={expandableEnabled ? undefined : height}
        id={id}
        onBlur={onBlur}
        onFocus={onFocus}
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
      {copyButton && !disabled ? <CodeEditorCopyButton copyButton={copyButton} value={value} /> : null}
    </>
  )

  return (
    <Stack className={cn(disabled ? disabledStack : '')} gap={0.5} style={style}>
      {label ? (
        <Label labelDescription={labelDescription} required={required}>
          {label}
        </Label>
      ) : null}
      <div className={codeEditorStyle.wrapper}>
        <div
          className={cn(codeEditorStyle.codeEditor[disabled ? 'disabled' : 'default'])}
          style={assignInlineVars({
            [maxHeightVar]: !expanded && expandableHeight ? `${expandableHeight}px` : 'none',
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
          <CodeEditorExpandable expanded={expanded} hideText={hideText} setExpanded={setExpanded} showText={showText} />
        ) : null}
      </div>
      <Description error={error} helper={helper} disabled={disabled} id={ariaDescribedBy ?? helperId} />
    </Stack>
  )
}

CodeEditor.displayName = 'CodeEditor'
