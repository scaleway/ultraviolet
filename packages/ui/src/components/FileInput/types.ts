import type {
  DragEvent,
  InputHTMLAttributes,
  ReactNode,
  RefObject,
} from 'react'

type ChildrenType =
  | ReactNode
  | ((
      inputId: string,
      inputRef: RefObject<HTMLInputElement | null>,
    ) => ReactNode)

export type FilesType = {
  fileName: string
  file: string
  size: number
  lastModified: number
  type: string
  loading?: boolean
  error?: string
}

export type ErrorType = { fileName?: string; error: string }
/**
 * See https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME_types#types
 */
export type MimeType =
  | 'application'
  | 'audio'
  | 'example'
  | 'font'
  | 'image'
  | 'model'
  | 'text'
  | 'video'

type LabelType =
  | { label: string; 'aria-label'?: never }
  | { label?: never; 'aria-label': string }

/**
 * Add the dropzone inside any content: when hovering, replace the content with the dropzone overlay
 */
type OverlayVariantProps = {
  variant?: 'overlay'
  /** Size of the dropzone. When set to small, the component can be used inline */
  size?: never
  /** Main text to display in the dropzone */
  title?: ReactNode
  children: ChildrenType
  bottom?: never
}

export type DropzoneVariantProps = {
  variant?: 'dropzone'
  /** Size of the dropzone. When set to small, the component can be used inline */
  size?: 'small' | 'medium'
  children?: ChildrenType
  /** Main text to display in the dropzone */
  title?: ChildrenType
  /** Content to add outside the container */
  bottom?: ReactNode
}

export type FileInputProps = {
  className?: string
  labelDescription?: ReactNode
  helper?: string
  onDrop?: (
    event: DragEvent<HTMLElement>,
    accetedFiles: File[],
    errorFiles?: ErrorType[],
  ) => void
  accept?: HTMLInputElement['accept']
  onChangeFiles?: (files: FilesType[]) => void
  defaultFiles?: FilesType[]
  /** When set to true, multiple files can be added */
  multiple?: boolean
  'data-testid'?: string
  error?: boolean | string
  disabledDragndrop?: boolean
  onChange?: (files: FileList) => void
  validator?: (file: File) => string
  /**
   * Allow to drag and drop folders in the dropzone. When set to true:
   * - `multiple` will automatically be set to `true`
   * - The files are all flattened and returned as a list. It is possible to use a path to reconstruct the folder
   * (`file.webkitpath`)
   */
  allowDirectories?: boolean
} & (OverlayVariantProps | DropzoneVariantProps) &
  LabelType &
  Pick<
    InputHTMLAttributes<HTMLInputElement>,
    | 'onFocus'
    | 'onBlur'
    | 'name'
    | 'disabled'
    | 'required'
    | 'onKeyDown'
    | 'onKeyUp'
    | 'style'
  >

type LimitType =
  | { limit: number; textLimit: string }
  | { limit?: never; textLimit?: never }

export type ListProps = {
  prominence?: 'default' | 'strong'
  onDelete?: (name: string) => void
} & LimitType
