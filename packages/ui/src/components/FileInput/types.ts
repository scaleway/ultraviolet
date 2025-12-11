import type {
  CSSProperties,
  Dispatch,
  DragEvent,
  ReactNode,
  SetStateAction,
} from 'react'

type ChildrenType = ReactNode | ((inputId: string) => ReactNode)

export type FilesType = {
  fileName: string
  file: string
  size: number
  lastModified: number
  type: string
  loading?: boolean
  error?: string
}

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
  listPosition?: 'top' | 'bottom'
}

export type DropzoneVariantProps = {
  variant?: 'dropzone'
  /** Size of the dropzone. When set to small, the component can be used inline */
  size?: 'small' | 'medium'
  children?: ChildrenType
  /** Main text to display in the dropzone */
  title?: ChildrenType
  listPosition?: never
}

export type FileInputProps = {
  style?: CSSProperties
  className?: string
  label?: string
  labelDescription?: ReactNode
  helper?: string
  onDrop?: (event: DragEvent<HTMLDivElement>) => void
  disabled?: boolean
  accept?: HTMLInputElement['accept']
  list?: boolean
  onChangeFiles?: (files: FilesType[]) => void
  defaultFiles?: FilesType[]
  /** When set to true, multiple files can be added */
  multiple?: boolean
  'data-testid'?: string
} & (OverlayVariantProps | DropzoneVariantProps) &
  LabelType

export type ListFilesProps = {
  files: FilesType[]
  setFiles: Dispatch<SetStateAction<FilesType[]>>
  onChangeFiles?: (files: FilesType[]) => void
}
