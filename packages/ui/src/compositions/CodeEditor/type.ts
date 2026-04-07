import type { langs } from '@uiw/codemirror-extensions-langs'
import type { ReactCodeMirrorProps } from '@uiw/react-codemirror'
import type { CSSProperties, ReactNode } from 'react'

export type CodeEditorProps = {
  value: string
  onChange: ReactCodeMirrorProps['onChange']
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
  required?: boolean
}
