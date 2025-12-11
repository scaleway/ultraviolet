'use client'

import { UploadIcon } from '@ultraviolet/icons'
import type { ChangeEvent, DragEvent } from 'react'
import { useEffect, useId, useState } from 'react'
import { Label } from '../Label'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { FileInputButton } from './components/Button'
import { ListFiles } from './components/List'
import { FileInputContext } from './FileInputProvider'
import { dropzone, dropzoneOverlay, fileInput, titleSmall } from './styles.css'
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
  list,
  listPosition = 'bottom',
  'aria-label': ariaLabel,
  defaultFiles,
  onChangeFiles,
  helper,
  multiple = false,
  'data-testid': dataTestid,
}: FileInputProps) => {
  const [dragState, setDragState] = useState<'over' | 'default' | 'page'>(
    'default',
  )
  const [files, setFiles] = useState<FilesType[]>(defaultFiles ?? [])

  const inputId = useId()

  const onDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragState(disabled ? 'default' : 'over')
  }

  const onDragPage = () => setDragState('page')

  const handleDrop = () => setDragState('default')
  const handleDragLeave = (event: Event) => {
    const dragEvent = event as unknown as DragEvent

    if (event.type === 'dragend' || dragEvent.relatedTarget === null) {
      setDragState('default')
    }
  }

  useEffect(() => {
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

  const manageDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
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

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

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

  if (variant === 'overlay') {
    return (
      <Stack direction="column" gap="1.5">
        {list && listPosition === 'top' ? (
          <ListFiles
            files={files}
            onChangeFiles={onChangeFiles}
            setFiles={setFiles}
          />
        ) : null}

        <div
          className={className}
          data-testid="drag-container"
          onDragOver={onDragOver}
        >
          {disabled ? null : (
            <input
              accept={accept}
              className={fileInput}
              data-testid={dataTestid}
              disabled={disabled}
              id={inputId}
              multiple={multiple}
              name={label ?? ariaLabel}
              onChange={onChange}
              type="file"
            />
          )}
          <div
            className={dropzoneOverlay[dragState]}
            onDragOver={event => event.preventDefault()}
            onDrop={event => {
              if (!disabled) {
                onDrop?.(event)
                manageDrop(event)
              }
            }}
            style={style}
          >
            {title && typeof title === 'string' && dragState !== 'default' ? (
              title
            ) : (
              <>
                {typeof children === 'function' ? children(inputId) : children}
              </>
            )}
          </div>
        </div>
        {list && listPosition === 'bottom' ? (
          <ListFiles
            files={files}
            onChangeFiles={onChangeFiles}
            setFiles={setFiles}
          />
        ) : null}
      </Stack>
    )
  }

  const isSmall = size === 'small'

  return (
    <FileInputContext.Provider value={{ disabled, inputId }}>
      <Stack className={className} direction="column" gap={0.5}>
        {label || labelDescription ? (
          <Label labelDescription={labelDescription} size={size}>
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
                type="file"
              />
            )}
            <UploadIcon
              disabled={disabled}
              sentiment={isSmall ? 'neutral' : 'primary'}
              size={isSmall ? 'small' : 'xlarge'}
            />
            <Text
              as={isSmall ? 'label' : 'p'}
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
              {typeof title === 'function' ? title(inputId) : title}
            </Text>
            {typeof children === 'function' ? children(inputId) : children}
          </Stack>
        </Text>
        {helper ? (
          <Text as="p" prominence="weak" sentiment="neutral" variant="caption">
            {helper}
          </Text>
        ) : null}
        {list ? (
          <ListFiles
            files={files}
            onChangeFiles={onChangeFiles}
            setFiles={setFiles}
          />
        ) : null}
      </Stack>
    </FileInputContext.Provider>
  )
}

export const FileInput = Object.assign(FileInputBase, {
  Button: FileInputButton,
})
