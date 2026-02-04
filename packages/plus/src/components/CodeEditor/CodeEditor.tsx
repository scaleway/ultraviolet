'use client'

import { langs } from '@uiw/codemirror-extensions-langs'
import { material } from '@uiw/codemirror-theme-material'
import CodeMirror from '@uiw/react-codemirror'
import { ArrowDownIcon } from '@ultraviolet/icons/ArrowDownIcon'
import { CopyButton, Expandable, Label, Stack, Text } from '@ultraviolet/ui'
import { cn } from '@ultraviolet/utils'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { ComponentProps, CSSProperties, ReactNode } from 'react'
import { useMemo, useState } from 'react'
import {
  animatedArrowIcon,
  centeredText,
  codeEditor,
  codeEditorWrapper,
  copyButton as copyButtonStyle,
  disabledStack,
  maxHeightVar,
  showMoreButton,
  showMoreContainer,
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
  /**
   * Defines a max height and adds an expand button to see the full content of the component
   */
  expandableHeight?: number
  /** Text for the "show" button when maxLines is defined */
  showText?: string
  /** Text for the "hide" button when maxLines is defined */
  hideText?: string
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
  expandableHeight,
  hideText = 'Hide',
  showText = 'Show',
  'aria-label': ariaLabel,
  'data-testid': dataTestId,
  className,
  error,
  lineNumbers = true,
  style,
}: CodeEditorProps) => {
  const [expanded, setExpanded] = useState(false)
  const expandableEnabled = expandableHeight !== undefined

  const expandableHeightComputed = useMemo(() => {
    if (!expanded && expandableHeight) {
      return typeof expandableHeight === 'string'
        ? expandableHeight
        : `${expandableHeight}px`
    }

    return 'none'
  }, [expandableHeight, expanded])

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
    </>
  )

  return (
    <Stack
      className={cn(disabled ? disabledStack : '')}
      gap={0.5}
      style={style}
    >
      {label ? (
        <Label labelDescription={labelDescription}>{label}</Label>
      ) : null}
      <div className={codeEditorWrapper}>
        <div
          className={cn(codeEditor[disabled ? 'disabled' : 'default'])}
          style={assignInlineVars({
            [maxHeightVar]: expandableHeightComputed,
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
          <div className={showMoreContainer[expanded ? 'true' : 'false']}>
            <button
              aria-expanded={expanded}
              className={showMoreButton}
              onClick={() => setExpanded(prevState => !prevState)}
              type="button"
            >
              <Text
                as="span"
                className={centeredText}
                sentiment="neutral"
                variant="bodySmallStrong"
              >
                {expanded ? hideText : showText}
                &nbsp;
                <ArrowDownIcon
                  className={animatedArrowIcon[expanded ? 'true' : 'false']}
                />
              </Text>
            </button>
          </div>
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
