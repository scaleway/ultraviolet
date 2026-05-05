'use client'

import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { hasHelperText } from '../../helpers/hasHelperText'
import { Helper } from '../Helper'
import { Label } from '../Label'
import { Stack } from '../Stack'
import { Text } from '../Text'

import { FileInputButton } from './components/Button'
import { ListFiles } from './components/List'
import { DropzoneContent } from './DropzoneContent'
import { FileInputContext } from './FileInputProvider'
import { fileIsAccepted } from './helpers'
import { fileInputStyle } from './styles.css'

import type { ErrorType, FileInputProps } from './types'
import type { ChangeEvent, DragEvent as DragEventReact } from 'react'

/**
 * FileInput allow user to drag & drop and upload one or multiple files.
 */
const FileInputBase = ({
  style,
  className,
  variant = 'dropzone',
  size = 'medium',
  title,
  children,
  onDrop,
  label,
  labelDescription,
  disabled,
  accept,
  'aria-label': ariaLabel,
  defaultFiles,
  onChangeFiles,
  helper,
  multiple = false,
  bottom,
  required,
  error,
  onChange,
  onFocus,
  onBlur,
  name,
  onKeyDown,
  onKeyUp,
  disabledDragndrop = false,
  validator,
  'data-testid': dataTestid,
  'aria-describedby': ariaDescribedBy,
}: FileInputProps) => {
  const [dragState, setDragState] = useState<'over' | 'default' | 'page'>(
    'default',
  )
  const [files, setFiles] = useState(defaultFiles ?? [])

  const inputId = useId()
  const helperId = useId()
  const inputRef = useRef<HTMLInputElement>(null)

  const onDragOver = (event: DragEventReact) => {
    event.preventDefault()
    event.stopPropagation()
    setDragState('over')
  }

  const onDragPage = () => {
    setDragState('page')
  }

  const handleDrop = () => setDragState('default')
  const handleDragLeave = (event: DragEvent) => {
    const dragEvent = event

    if (event.type === 'dragend' || dragEvent.relatedTarget === null) {
      setDragState('default')
    }
  }

  useLayoutEffect(() => {
    if (!disabledDragndrop) {
      window.addEventListener('dragenter', onDragPage)
      window.addEventListener('dragend', handleDragLeave)
      window.addEventListener('drop', handleDrop)
      window.addEventListener('dragleave', handleDragLeave)
    }
    return () => {
      window.removeEventListener('dragenter', onDragPage)
      window.removeEventListener('dragend', handleDragLeave)
      window.removeEventListener('drop', handleDrop)
      window.removeEventListener('dragleave', handleDragLeave)
    }
  }, [disabledDragndrop])

  useEffect(() => {
    if (defaultFiles) {
      setFiles(defaultFiles)
    }
  }, [defaultFiles])

  const addFiles = (addedFiles: FileList | null): [File[], ErrorType[]] => {
    const droppedFiles = [...(addedFiles ?? [])]
    const newFiles: File[] = []
    const errorFiles: ErrorType[] = []

    for (const file of droppedFiles) {
      const isAccepted = fileIsAccepted(file.type, accept)
      const customError = validator?.(file)

      if (isAccepted && !customError) {
        newFiles.push(file)
      } else {
        const acceptArray = accept?.split(',')
        const defaultMessage = acceptArray
          ? `File type must be ${acceptArray.length > 1 ? `one of ${acceptArray.join(', ')}` : acceptArray[0]}`
          : 'Error'

        errorFiles.push({
          fileName: name,
          error: customError ?? defaultMessage,
        })
      }
    }

    const formattedNewFiles = newFiles.map(file => ({
      file: URL.createObjectURL(file),
      fileName: file.name,
      lastModified: file.lastModified,
      size: file.size,
      type: file.type,
    }))

    const formattedFiles = multiple
      ? [...files, ...formattedNewFiles]
      : [formattedNewFiles[0]]
    setFiles(formattedFiles)
    onChangeFiles?.(formattedFiles)

    if (addedFiles) {
      onChange?.(addedFiles)
    }

    if (inputRef.current) {
      inputRef.current.value = ''
    }

    return [newFiles, errorFiles]
  }

  const onChangeLocal = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    if (!disabled) {
      addFiles(event.target.files)
    }
  }

  const onDropComputed = (event: DragEventReact<HTMLElement>) => {
    event.preventDefault()

    if (!disabled) {
      const [acceptedFiles, errorFiles] = addFiles(event.dataTransfer?.files)
      onDrop?.(event, acceptedFiles, errorFiles)
    }
  }

  const computedChildren =
    typeof children === 'function' ? children(inputId, inputRef) : children

  const computedHelper = (
    <Helper
      error={error}
      helper={helper}
      id={ariaDescribedBy ?? helperId}
      size={size}
      disabled={disabled}
    />
  )

  const input = (
    <input
      accept={accept}
      aria-describedby={
        hasHelperText(helper, error) && !ariaDescribedBy
          ? helperId
          : ariaDescribedBy
      }
      aria-label={ariaLabel}
      className={fileInputStyle.fileInput}
      data-testid={dataTestid}
      disabled={disabled}
      id={inputId}
      multiple={multiple}
      name={name ?? label ?? ariaLabel}
      onChange={onChangeLocal}
      ref={inputRef}
      required={required}
      type="file"
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
    />
  )

  const bottomComputed = bottom ? (
    <Text
      as="div"
      disabled={disabled}
      prominence="weak"
      sentiment="neutral"
      variant="caption"
    >
      {bottom}
    </Text>
  ) : null

  const value = useMemo(
    () => ({
      disabled,
      error: !!error,
      files,
      inputRef,
      onChangeFiles,
      setFiles,
    }),
    [disabled, error, files, onChangeFiles],
  )

  if (variant === 'overlay') {
    return (
      <FileInputContext.Provider value={value}>
        <Stack direction="column" gap={1}>
          {/** oxlint-disable jsx_a11y/no-static-element-interactions: needed for drag and drop */}
          <div
            className={className}
            data-testid="drag-container"
            onDragOver={event => {
              if (!disabledDragndrop) {
                onDragOver(event)
              }
            }}
          >
            {input}
            <div className={fileInputStyle.overlayWrapper}>
              {computedChildren}
              {/** oxlint-disable jsx_a11y/no-static-element-interactions: needed for drag and drop */}
              <div
                className={
                  disabled
                    ? fileInputStyle.dropzoneOverlayDisabled[dragState]
                    : fileInputStyle.dropzoneOverlay[dragState]
                }
                onDragOver={event => event.preventDefault()}
                onDrop={event => {
                  if (!disabledDragndrop) {
                    onDropComputed(event)
                  }
                }}
                style={style}
              >
                {title &&
                typeof title !== 'function' &&
                dragState !== 'default' ? (
                  <Text
                    as="div"
                    disabled={disabled}
                    sentiment="primary"
                    variant="bodySmallStrong"
                  >
                    {title}
                  </Text>
                ) : null}
              </div>
            </div>
          </div>
          {bottomComputed}
          {computedHelper}
        </Stack>
      </FileInputContext.Provider>
    )
  }

  const isSmall = size === 'small'
  const Container = isSmall ? 'button' : 'div'

  return (
    <FileInputContext.Provider value={value}>
      <Stack direction="column" gap={1} width="100%">
        <Stack className={className} direction="column" gap={0.5}>
          {label || labelDescription ? (
            <Label
              labelDescription={labelDescription}
              required={required}
              size={size}
              htmlFor={inputId}
            >
              {label}
            </Label>
          ) : null}
          {disabled ? null : input}
          <Container
            disabled={disabled}
            className={fileInputStyle.dropzone({
              disabled,
              size,
              state: dragState,
            })}
            onClick={() => {
              if (isSmall) {
                inputRef.current?.click()
              }
            }}
            {...(isSmall ? { type: 'button' } : undefined)}
            data-testid="drag-container"
            onDragOver={onDragOver}
            onDrop={onDropComputed}
          >
            <DropzoneContent
              disabled={disabled}
              inputId={inputId}
              inputRef={inputRef}
              isSmall={isSmall}
              title={title}
            />
            {computedChildren}
          </Container>
          {computedHelper}
        </Stack>
        {bottomComputed}
      </Stack>
    </FileInputContext.Provider>
  )
}

export const FileInput = Object.assign(FileInputBase, {
  Button: FileInputButton,
  List: ListFiles,
})
