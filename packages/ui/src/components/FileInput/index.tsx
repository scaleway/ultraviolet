'use client'

import { UploadIcon } from '@ultraviolet/icons'
import type { ChangeEvent, DragEvent } from 'react'
import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { Label } from '../Label'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { FileInputButton } from './components/Button'
import { ListFiles } from './components/List'
import { FileInputContext } from './FileInputProvider'
import {
  dropzone,
  dropzoneOverlay,
  dropzoneOverlayDisabled,
  fileInput,
  overlayWrapper,
  titleSmall,
} from './styles.css'
import type { FileInputProps, FilesType } from './types'

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
  'data-testid': dataTestid,
}: FileInputProps) => {
  const [dragState, setDragState] = useState<'over' | 'default' | 'page'>(
    'default',
  )
  const [files, setFiles] = useState<FilesType[]>(defaultFiles ?? [])

  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)

  const onDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setDragState('over')
  }

  const onDragPage = () => setDragState('page')

  const handleDrop = () => setDragState('default')
  const handleDragLeave = (event: Event) => {
    const dragEvent = event as unknown as DragEvent

    if (event.type === 'dragend' || dragEvent.relatedTarget === null) {
      setDragState('default')
    }
  }

  useLayoutEffect(() => {
    window.addEventListener('dragenter', onDragPage)
    window.addEventListener('dragend', handleDragLeave)
    window.addEventListener('drop', handleDrop)
    window.addEventListener('dragleave', handleDragLeave)

    return () => {
      window.removeEventListener('dragenter', onDragPage)
      window.removeEventListener('dragend', handleDragLeave)
      window.removeEventListener('drop', handleDrop)
      window.removeEventListener('dragleave', handleDragLeave)
    }
  }, [])

  useEffect(() => {
    if (defaultFiles) {
      setFiles(defaultFiles)
    }
  }, [defaultFiles])

  const manageDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()

    if (!disabled) {
      const droppedFiles = [...(event.dataTransfer?.files ?? [])]
      const newFiles = droppedFiles.map(file => ({
        file: URL.createObjectURL(file),
        fileName: file.name,
        lastModified: file.lastModified,
        size: file.size,
        type: file.type,
      }))
      const formattedFiles = multiple ? [...files, ...newFiles] : newFiles

      setFiles(formattedFiles)
      onDrop?.(event)
      onChangeFiles?.(formattedFiles)
    }
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    if (!disabled) {
      const addedFiles = [...(event.target.files ?? [])]
      const newFiles = addedFiles.map(file => ({
        file: URL.createObjectURL(file),
        fileName: file.name,
        lastModified: file.lastModified,
        size: file.size,
        type: file.type,
      }))

      const formattedFiles = multiple ? [...files, ...newFiles] : newFiles
      setFiles(formattedFiles)
      onChangeFiles?.(formattedFiles)
    }
  }
  if (variant === 'overlay') {
    return (
      <FileInputContext.Provider
        value={{
          disabled,
          error: !!error,
          files,
          inputRef,
          onChangeFiles,
          setFiles,
        }}
      >
        <Stack direction="column" gap={1}>
          <div
            className={className}
            data-testid="drag-container"
            onDragOver={onDragOver}
          >
            <input
              accept={accept}
              className={fileInput}
              data-testid={dataTestid}
              id={inputId}
              multiple={multiple}
              name={label ?? ariaLabel}
              onChange={onChange}
              ref={inputRef}
              required={required}
              type="file"
            />
            <div className={overlayWrapper}>
              {typeof children === 'function'
                ? children(inputId, inputRef)
                : children}
              <div
                className={
                  disabled
                    ? dropzoneOverlayDisabled[dragState]
                    : dropzoneOverlay[dragState]
                }
                onDragOver={event => event.preventDefault()}
                onDrop={event => {
                  if (!disabled) {
                    onDrop?.(event)
                    manageDrop(event)
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
          {bottom ? (
            <Text
              as="div"
              disabled={disabled}
              prominence="weak"
              sentiment="neutral"
              variant="caption"
            >
              {bottom}
            </Text>
          ) : null}
          {error && typeof error === 'string' ? (
            <Text as="p" sentiment="danger" variant="bodySmall">
              {error}
            </Text>
          ) : null}
        </Stack>
      </FileInputContext.Provider>
    )
  }

  const isSmall = size === 'small'

  return (
    <FileInputContext.Provider
      value={{
        disabled,
        error: !!error,
        files,
        inputRef,
        onChangeFiles,
        setFiles,
      }}
    >
      <Stack direction="column" gap={1}>
        <Stack className={className} direction="column" gap={0.5}>
          {label || labelDescription ? (
            <Label
              labelDescription={labelDescription}
              required={required}
              size={size}
            >
              {label}
            </Label>
          ) : null}
          <Text as="div" disabled={disabled} sentiment="neutral" variant="body">
            <Stack
              alignItems="center"
              className={dropzone({ disabled, size, state: dragState })}
              data-testid="drag-container"
              direction={isSmall ? 'row' : 'column'}
              gap={isSmall ? 1 : 2}
              justifyContent="center"
              onDragOver={onDragOver}
              onDrop={event => {
                if (!disabled) {
                  onDrop?.(event)
                  manageDrop(event)
                }
              }}
              style={style}
            >
              {disabled ? null : (
                <input
                  accept={accept}
                  className={fileInput}
                  data-testid={dataTestid}
                  disabled={disabled}
                  id={inputId}
                  name={label ?? ariaLabel}
                  onChange={onChange}
                  ref={inputRef}
                  required={required}
                  type="file"
                />
              )}
              <UploadIcon
                disabled={disabled}
                sentiment={isSmall ? 'neutral' : 'primary'}
                size={isSmall ? 'small' : 'xlarge'}
              />
              <Text
                as={isSmall ? 'label' : 'div'}
                className={
                  isSmall
                    ? titleSmall[disabled ? 'disabled' : 'default']
                    : undefined
                }
                disabled={disabled}
                htmlFor={inputId}
                placement="left"
                sentiment="neutral"
                variant={isSmall ? 'bodySmallStrong' : 'headingSmallStrong'}
              >
                {typeof title === 'function' ? title(inputId, inputRef) : title}
              </Text>
              {typeof children === 'function'
                ? children(inputId, inputRef)
                : children}
            </Stack>
          </Text>
          {helper ? (
            <Text
              as="p"
              prominence="weak"
              sentiment="neutral"
              variant="caption"
            >
              {helper}
            </Text>
          ) : null}
        </Stack>
        {error && typeof error === 'string' ? (
          <Text as="p" sentiment="danger" variant="bodySmall">
            {error}
          </Text>
        ) : null}
        {bottom ? (
          <Text
            as="div"
            disabled={disabled}
            prominence="weak"
            sentiment="neutral"
            variant="caption"
          >
            {bottom}
          </Text>
        ) : null}
      </Stack>
    </FileInputContext.Provider>
  )
}

export const FileInput = Object.assign(FileInputBase, {
  Button: FileInputButton,
  List: ListFiles,
})
