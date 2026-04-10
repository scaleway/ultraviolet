'use client'

import { ProseMirror, ProseMirrorDoc } from '@handlewithcare/react-prosemirror'
import { theme } from '@ultraviolet/themes'
import { cn } from '@ultraviolet/utils'
import { useId, useMemo, useState } from 'react'

import { Label } from '../../components/Label'
import { Stack } from '../../components/Stack'

import {
  createEditorState,
  docFromHtml,
  editorDocToHtml,
  editorSchema,
} from './editorCore'
import { Notice } from './Notice'
import { richTextEditorStyle } from './styles.css'
import { Toolbar } from './Toolbar'

import type { EditorState } from 'prosemirror-state'
import type { CSSProperties, DOMAttributes, ReactNode } from 'react'

const RICH_TEXT_EDITOR_LINE_HEIGHT_EM = 1.5

export type RichTextEditorProps = {
  'aria-label'?: string
  className?: string
  'data-testid'?: string
  disabled?: boolean
  error?: string
  helper?: ReactNode
  label?: string
  id?: string
  rows?: number
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

export const RichTextEditor = ({
  value = '',
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  error,
  helper,
  success,
  className,
  style,
  label,
  rows = 5,
  maxRows = 10,
  id,
  'data-testid': dataTestId,
  'aria-label': ariaLabel,
  showMarks = true,
  showList = true,
  required = false,
}: RichTextEditorProps) => {
  const localId = useId()
  const isEditable = !disabled
  const lineHeightEm = RICH_TEXT_EDITOR_LINE_HEIGHT_EM
  const padding = theme.space[1]
  const minHeight = `calc(${lineHeightEm}em * ${rows} + 2 * ${padding})`
  const maxHeight =
    typeof maxRows === 'number'
      ? `calc(${lineHeightEm}em * ${maxRows} + 2 * ${padding})`
      : undefined

  const sentiment = useMemo(() => {
    if (error) {
      return 'danger'
    }

    if (success) {
      return 'success'
    }

    return 'neutral'
  }, [error, success])

  const notice = success || error || helper

  const [editorState, setEditorState] = useState<EditorState>(() =>
    createEditorState(docFromHtml(value, editorSchema)),
  )

  return (
    <Stack gap="0.5">
      {label ? (
        <Label htmlFor={id ?? localId} required={required}>
          {label}
        </Label>
      ) : null}
      <Stack
        className={cn(
          richTextEditorStyle.editorSurface({
            disabled,
            error: !!error && !disabled,
            success: !!success && !error && !disabled,
          }),
          className,
        )}
        data-disabled={disabled ? 'true' : undefined}
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
                onChange?.(
                  isEmpty ? '' : editorDocToHtml(next.doc, editorSchema),
                )
              }

              return next
            })
          }}
          state={editorState}
          static={!isEditable}
        >
          {isEditable ? (
            <div
              className={richTextEditorStyle.toolbarRow({
                error: !!error && !disabled,
                success: !!success && !error && !disabled,
              })}
            >
              <Toolbar showList={showList} showMarks={showMarks} />
            </div>
          ) : null}
          <ProseMirrorDoc
            aria-invalid={!!error}
            aria-label={ariaLabel}
            className={richTextEditorStyle.docRegion}
            data-testid={dataTestId}
            id={id}
            style={{
              minHeight,
              ...(maxHeight ? { maxHeight } : {}),
            }}
            onBlur={onBlur}
            onFocus={onFocus}
          />
        </ProseMirror>
      </Stack>
      {notice ? (
        <Notice
          disabled={disabled}
          error={error}
          helper={helper}
          sentiment={sentiment}
          success={success}
        />
      ) : null}
    </Stack>
  )
}
