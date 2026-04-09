'use client'

import { ProseMirror, ProseMirrorDoc } from '@handlewithcare/react-prosemirror'
import { theme } from '@ultraviolet/themes'
import { cn } from '@ultraviolet/utils'
import { useEffect, useId, useMemo, useState } from 'react'

import { Label } from '../Label'
import { Stack } from '../Stack'

import {
  createEditorState,
  docFromHtml,
  editorDocToHtml,
  editorSchema,
} from './editorCore'
import { collapseEmptyRichTextHtml } from './helpers'
import { Notice } from './Notice'
import { richTextEditorStyle } from './styles.css'
import { Toolbar } from './Toolbar'

import type { EditorState, Transaction } from 'prosemirror-state'
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

  useEffect(() => {
    setEditorState(prev => {
      const prevHtml = collapseEmptyRichTextHtml(
        editorDocToHtml(prev.doc, editorSchema),
      )
      const nextValue = collapseEmptyRichTextHtml(value ?? '')

      if (nextValue === prevHtml) {
        return prev
      }

      return createEditorState(docFromHtml(value, editorSchema))
    })
  }, [value])

  const applyCommand = (
    command: (
      state: EditorState,
      dispatch?: (tr: Transaction) => void,
    ) => boolean,
  ) => {
    if (!isEditable) {
      return
    }

    setEditorState(prevState => {
      let nextState = prevState
      command(prevState, tr => {
        nextState = prevState.apply(tr)
      })
      const prevHtml = collapseEmptyRichTextHtml(
        editorDocToHtml(prevState.doc, editorSchema),
      )
      const nextHtml = collapseEmptyRichTextHtml(
        editorDocToHtml(nextState.doc, editorSchema),
      )
      if (nextHtml !== prevHtml) {
        onChange?.(nextHtml)
      }

      return nextState
    })
  }

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
        {isEditable ? (
          <div
            className={richTextEditorStyle.toolbarRow({
              error: !!error && !disabled,
              success: !!success && !error && !disabled,
            })}
          >
            <Toolbar
              applyCommand={applyCommand}
              editorState={editorState}
              showList={showList}
              showMarks={showMarks}
            />
          </div>
        ) : null}
        <ProseMirror
          dispatchTransaction={transaction => {
            if (!isEditable) {
              return
            }

            setEditorState(prev => {
              const next = prev.apply(transaction)
              const prevHtml = collapseEmptyRichTextHtml(
                editorDocToHtml(prev.doc, editorSchema),
              )
              const nextHtml = collapseEmptyRichTextHtml(
                editorDocToHtml(next.doc, editorSchema),
              )
              if (nextHtml !== prevHtml) {
                onChange?.(nextHtml)
              }

              return next
            })
          }}
          state={editorState}
          static={!isEditable}
        >
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
