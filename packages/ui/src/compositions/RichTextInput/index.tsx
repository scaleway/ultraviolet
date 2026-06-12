'use client'

import { ProseMirror, ProseMirrorDoc } from '@handlewithcare/react-prosemirror'
import { AlertCircleIcon, CheckCircleIcon } from '@ultraviolet/icons'
import { theme } from '@ultraviolet/themes'
import { cn } from '@ultraviolet/utils'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { EditorState } from 'prosemirror-state'
import { useEffect, useId, useState } from 'react'
import type { CSSProperties, DOMAttributes, ReactNode } from 'react'
import { Description } from '../../components/Description'
import { Label } from '../../components/Label'
import { Stack } from '../../components/Stack'
import { hasHelperText } from '../../helpers/hasHelperText'
import { createEditorState, docFromHtml, editorDocToHtml, editorSchema } from './editorCore'
import { Toolbar } from './Toolbar'
import { docRegionMaxHeightVar, docRegionMinHeightVar, richTextInputStyle } from './styles.css'

const RICH_TEXT_EDITOR_LINE_HEIGHT_EM = 1.5

export type RichTextInputProps = {
  'aria-label'?: string
  'aria-describedby'?: string
  className?: string
  'data-testid'?: string
  disabled?: boolean
  readOnly?: boolean
  error?: string
  helper?: ReactNode
  label?: string
  labelDescription?: ReactNode
  id?: string
  rows?: number
  size?: 'large' | 'medium' | 'small'
  maxRows?: number
  required?: boolean
  onBlur?: DOMAttributes<HTMLElement>['onBlur']
  onChange?: (value: string) => void
  onFocus?: DOMAttributes<HTMLElement>['onFocus']
  style?: CSSProperties
  success?: string
  value?: string
  showList?: boolean
  showMarks?: boolean
}

export const RichTextInput = ({
  value = '',
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  readOnly = false,
  error,
  helper,
  success,
  className,
  style,
  size = 'large',
  label,
  labelDescription,
  rows = 5,
  maxRows = 10,
  id,
  'data-testid': dataTestId,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  showMarks = true,
  showList = true,
  required = false,
}: RichTextInputProps) => {
  const localId = useId()
  const inputId = id ?? `rich-text-input-${localId}`
  const descriptionId = `${inputId}-description`
  const labelId = `${inputId}-label`
  const isEditable = !disabled && !readOnly
  const lineHeightEm = RICH_TEXT_EDITOR_LINE_HEIGHT_EM
  const padding = theme.space[1]
  const minHeight = `calc(${lineHeightEm}em * ${rows} + 2 * ${padding})`
  const maxHeight = typeof maxRows === 'number' ? `calc(${lineHeightEm}em * ${maxRows} + 2 * ${padding})` : 'none'

  const [editorState, setEditorState] = useState<EditorState>(() => createEditorState(docFromHtml(value, editorSchema)))

  useEffect(() => {
    setEditorState(prev => {
      const currentValue = prev.doc.textContent.trim() === '' ? '' : editorDocToHtml(prev.doc, editorSchema)

      if (value === currentValue) {
        return prev
      }

      return createEditorState(docFromHtml(value, editorSchema))
    })
  }, [value])

  return (
    <Stack gap="0.5">
      {label ? (
        <Label htmlFor={inputId} id={labelId} required={required} labelDescription={labelDescription}>
          {label}
        </Label>
      ) : null}
      <Stack
        className={cn(
          richTextInputStyle.editorSurface({
            disabled,
            readonly: readOnly,
            error: !!error && !disabled,
            success: !!success && !error && !disabled,
          }),
          className,
        )}
        style={style}
      >
        <ProseMirror
          dispatchTransaction={transaction => {
            if (!isEditable) {
              return
            }

            setEditorState(prev => {
              const next = prev.apply(transaction)
              if (!prev.doc.eq(next.doc)) {
                const isEmpty = next.doc.textContent.trim() === ''
                onChange?.(isEmpty ? '' : editorDocToHtml(next.doc, editorSchema))
              }

              return next
            })
          }}
          state={editorState}
          static={!isEditable}
        >
          <div className={richTextInputStyle.toolbarRow}>
            <Toolbar showList={showList} showMarks={showMarks} disabled={disabled || readOnly} size={size} />
          </div>
          <div className={richTextInputStyle.wrapper}>
            <ProseMirrorDoc
              aria-labelledby={labelId}
              aria-describedby={ariaDescribedBy || (hasHelperText(helper, error, success) ? descriptionId : undefined)}
              aria-invalid={error ? 'true' : undefined}
              aria-disabled={disabled ? 'true' : undefined}
              aria-readonly={readOnly ? 'true' : undefined}
              aria-label={ariaLabel}
              className={richTextInputStyle.docRegion}
              data-testid={dataTestId}
              id={inputId}
              role="textbox"
              style={{
                ...assignInlineVars({
                  [docRegionMaxHeightVar]: maxHeight ?? 'none',
                  [docRegionMinHeightVar]: minHeight,
                }),
              }}
              onBlur={onBlur}
              onFocus={onFocus}
            />
            {error ? <AlertCircleIcon className={richTextInputStyle.statusIcon} sentiment="danger" /> : null}
            {success ? <CheckCircleIcon className={richTextInputStyle.statusIcon} sentiment="success" /> : null}
          </div>
        </ProseMirror>
      </Stack>

      <Description id={descriptionId} error={error} success={success} disabled={disabled} helper={helper} />
    </Stack>
  )
}
