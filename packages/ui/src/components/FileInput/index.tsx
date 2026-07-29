'use client'

import type { ChangeEvent, DragEvent as DragEventReact } from 'react'
import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { hasHelperText } from '../../helpers/hasHelperText'
import { Description } from '../Description'
import { Label } from '../Label'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { FileInputButton } from './components/Button'
import { ListFiles } from './components/List'
import { DropzoneContent } from './DropzoneContent'
import { FileInputContext } from './FileInputProvider'
import { fileIsAccepted, readTransferredFiles } from './helpers'
import type { ErrorType, FileInputProps } from './types'
import { fileInputStyle } from './styles.css'

const defaultOnDropError = (e: unknown) => {
  if (e instanceof Error) {
    throw e
  }
}

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
  id,
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
  onDropError = defaultOnDropError,
  'data-testid': dataTestid,
  'aria-describedby': ariaDescribedBy,
  allowDirectories,
}: FileInputProps) => {
  const [dragState, setDragState] = useState<'over' | 'default' | 'page'>('default')
  const [files, setFiles] = useState(defaultFiles ?? [])

  const generatedId = useId()
  const inputId = id ?? generatedId
  const helperId = useId()
  const inputRef = useRef<HTMLInputElement>(null)

  // When we allow folder, we should allow to add multiple files
  const computedMultiple = allowDirectories || multiple
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
      const isAccepted = fileIsAccepted(file, accept)
      const customError = validator?.(file)

      if (isAccepted && !customError) {
        newFiles.push(file)
      } else {
        const acceptArray = accept?.split(',')
        const defaultMessage = acceptArray
          ? `File type must be ${acceptArray.length > 1 ? `one of ${acceptArray.join(', ')}` : acceptArray[0]}`
          : 'Error'

        errorFiles.push({
          fileName: file.name,
          error: customError ?? defaultMessage,
        })
      }
    }

    const formattedNewFiles = newFiles.map(file =>
      Object.assign(file, {
        file: URL.createObjectURL(file),
      }),
    )

    const formattedFiles = (computedMultiple ? [...files, ...formattedNewFiles] : [formattedNewFiles[0]]).filter(
      Boolean,
    )

    setFiles(formattedFiles)
    onChangeFiles?.(formattedFiles)

    if (addedFiles && onChange) {
      const dataTransfer = new DataTransfer()
      formattedFiles.forEach(formattedFile => {
        // Since File type is included in FileType
        dataTransfer.items.add(formattedFile satisfies File)
      })
      onChange(dataTransfer.files)
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

  const onDropComputed = async (event: DragEventReact<HTMLElement>) => {
    event.preventDefault()

    if (disabled || disabledDragndrop) {
      return
    }

    const fileList = allowDirectories ? await readTransferredFiles(event.dataTransfer) : event.dataTransfer?.files
    const [acceptedFiles, errorFiles] = addFiles(fileList)
    onDrop?.(event, acceptedFiles, errorFiles)
  }

  const computedChildren = typeof children === 'function' ? children(inputId, inputRef) : children

  const computedHelper = (
    <Description error={error} helper={helper} id={ariaDescribedBy ?? helperId} disabled={disabled} />
  )

  const input = (
    <input
      accept={accept}
      aria-describedby={ariaDescribedBy || (hasHelperText(helper, error) ? helperId : undefined)}
      aria-label={ariaLabel}
      className={fileInputStyle.fileInput}
      data-testid={dataTestid}
      disabled={disabled}
      id={inputId}
      multiple={computedMultiple}
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
    <Text as="div" disabled={disabled} prominence="weak" sentiment="neutral" variant="caption">
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
                  onDropComputed(event).catch(onDropError)
                }}
                style={style}
              >
                {title && typeof title !== 'function' && dragState !== 'default' ? (
                  <Text as="div" disabled={disabled} sentiment="primary" variant="bodySmallStrong">
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
            <Label labelDescription={labelDescription} required={required} size={size} htmlFor={inputId}>
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
            onDrop={event => {
              onDropComputed(event).catch(onDropError)
            }}
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

FileInputBase.displayName = 'FileInput'

export const FileInput = Object.assign(FileInputBase, {
  Button: FileInputButton,
  List: ListFiles,
})
