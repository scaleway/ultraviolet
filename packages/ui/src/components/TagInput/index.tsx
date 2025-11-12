'use client'

import {
  AlertCircleIcon,
  CheckCircleOutlineIcon,
  CloseIcon,
} from '@ultraviolet/icons'
import type {
  ChangeEvent,
  CSSProperties,
  KeyboardEventHandler,
  ReactNode,
} from 'react'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { getUUID } from '../../utils'
import { Button } from '../Button'
import { Label } from '../Label'
import { Stack } from '../Stack'
import { Tag } from '../Tag'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'
import type { TAGINPUT_SIZE_PADDING } from './styles.css'
import {
  tagInput,
  tagInputContainer,
  tagInputDataContainer,
  tagInputStateContainer,
} from './styles.css'

type TagInputSize = keyof typeof TAGINPUT_SIZE_PADDING

const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
} as const

type Keys = keyof typeof STATUS
type StatusValue = (typeof STATUS)[Keys]

const convertTagArrayToTagStateArray = (tags?: TagInputProp) =>
  (tags ?? [])?.map((tag, index) =>
    typeof tag === 'object'
      ? { ...tag, index: getUUID(`tag-${index}`) }
      : { index: getUUID(`tag-${index}`), label: tag },
  )

type TagInputProp = (string | { label: string; index: string })[]

type TagInputProps = {
  disabled?: boolean
  id?: string
  name?: string
  onChange?: (tags: string[]) => void
  placeholder?: string
  value?: TagInputProp
  className?: string
  'data-testid'?: string
  label?: string
  /**
   * Label description displayed right next to the label. It allows you to customize the label content.
   */
  labelDescription?: ReactNode
  'aria-label'?: string
  required?: boolean
  size?: TagInputSize
  error?: string
  success?: string | boolean
  helper?: ReactNode
  readOnly?: boolean
  tooltip?: string
  clearable?: boolean
  style?: CSSProperties
}

/**
 * TagInput is a component that allows users to input tags.
 */
export const TagInput = ({
  disabled = false,
  id,
  name,
  onChange,
  placeholder,
  value,
  className,
  'data-testid': dataTestId,
  'aria-label': ariaLabel,
  label,
  labelDescription,
  required = false,
  size = 'large',
  error,
  success,
  helper,
  readOnly = false,
  tooltip,
  clearable = false,
  style,
}: TagInputProps) => {
  const [tagInputState, setTagInput] = useState(
    convertTagArrayToTagStateArray(value),
  )
  const [input, setInput] = useState<string>('')
  const [status, setStatus] = useState<{ [key: string]: StatusValue }>({})

  const uniqueId = useId()
  const localId = id ?? uniqueId

  useEffect(() => {
    setTagInput(convertTagArrayToTagStateArray(value))
  }, [value, setTagInput])

  const inputRef = useRef<HTMLInputElement>(null)

  const dispatchOnChange = (newState: TagInputProp) => {
    const changes = newState.map(tag =>
      typeof tag === 'object' ? tag?.label : tag,
    )

    onChange?.(changes)
  }

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef?.current?.focus()
    }
  }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const addTag = () => {
    const newTagInput = input
      ? [...tagInputState, { index: getUUID('tag'), label: input }]
      : tagInputState
    setInput('')
    setTagInput(newTagInput)
    if (newTagInput.length !== tagInputState.length && newTagInput) {
      setStatus({
        [newTagInput?.at(-1)!.index]: STATUS.LOADING,
      })
    }
    try {
      dispatchOnChange(newTagInput)
      if (newTagInput) {
        setStatus({ [newTagInput.at(-1)!.index]: STATUS.IDLE })
      }
    } catch {
      setTagInput(tagInputState)
    }
  }

  const deleteTag = (tagIndex: string) => {
    setStatus({ [tagIndex]: STATUS.LOADING })
    const findIndex = tagInputState.findIndex(({ index }) => index === tagIndex)
    const newTagInput = [...tagInputState]
    newTagInput.splice(findIndex, 1)
    try {
      dispatchOnChange(newTagInput)
      setTagInput(newTagInput)
      setStatus({ [tagIndex]: STATUS.IDLE })
    } catch {
      setTagInput(tagInputState)
    }
  }

  const handleInputKeydown: KeyboardEventHandler<HTMLInputElement> = event => {
    if (event.key === ' ' || event.key === 'Enter') {
      addTag()
      event.preventDefault()
    }
    if (
      event.key === 'Backspace' &&
      inputRef?.current?.selectionStart === 0 &&
      tagInputState.length > 0
    ) {
      event.preventDefault()
      if (tagInputState) {
        deleteTag(tagInputState.at(-1)!.index)
      }
    }
  }

  const clearAll = () => {
    setInput('')
    setTagInput([])
    dispatchOnChange([])
  }

  const helperSentiment = useMemo(() => {
    if (error) {
      return 'danger'
    }

    if (success) {
      return 'success'
    }

    return 'neutral'
  }, [error, success])

  const computedClearable = clearable && tagInputState.length > 0

  return (
    <Stack className={className} gap="0.5">
      {label || labelDescription ? (
        <Label
          htmlFor={id ?? localId}
          labelDescription={labelDescription}
          required={required}
          size={size}
        >
          {label}
        </Label>
      ) : null}
      <div>
        <Tooltip text={tooltip}>
          <div
            className={`${className ? `${className} ` : ''}${tagInputContainer({ size })}`}
            data-disabled={disabled}
            data-error={!!error}
            data-readonly={readOnly}
            data-success={!!success}
            data-testid={dataTestId}
            onClick={handleContainerClick}
            onKeyDown={event => {
              if ([' ', 'Enter'].includes(event.key)) {
                handleContainerClick()
              }
            }}
          >
            <div className={tagInputDataContainer}>
              {tagInputState.map(tag => (
                <Tag
                  disabled={disabled}
                  isLoading={status[tag.index] === STATUS.LOADING}
                  key={tag.index}
                  onClose={
                    !readOnly
                      ? e => {
                          e.stopPropagation()
                          deleteTag(tag.index)
                        }
                      : undefined
                  }
                  sentiment="neutral"
                >
                  {tag.label}
                </Tag>
              ))}
              {!disabled ? (
                <input
                  aria-label={ariaLabel}
                  className={tagInput}
                  data-size={size}
                  id={localId}
                  name={name}
                  onBlur={addTag}
                  onChange={onInputChange}
                  onKeyDown={handleInputKeydown}
                  placeholder={tagInputState.length === 0 ? placeholder : ''}
                  readOnly={readOnly}
                  ref={inputRef}
                  style={style}
                  type="text"
                  value={input}
                />
              ) : null}
            </div>
            {computedClearable || success || error ? (
              <div className={tagInputStateContainer}>
                {computedClearable ? (
                  <Button
                    aria-label="clear value"
                    disabled={disabled}
                    onClick={clearAll}
                    sentiment="neutral"
                    size="xsmall"
                    variant="ghost"
                  >
                    <CloseIcon />
                  </Button>
                ) : null}
                {success ? (
                  <CheckCircleOutlineIcon
                    disabled={disabled}
                    sentiment="success"
                    size="small"
                  />
                ) : null}
                {error ? (
                  <AlertCircleIcon
                    disabled={disabled}
                    sentiment="danger"
                    size="small"
                  />
                ) : null}
              </div>
            ) : null}
          </div>
        </Tooltip>
      </div>
      {error || typeof success === 'string' || helper ? (
        <Text
          as="span"
          disabled={disabled || readOnly}
          prominence={!error && !success ? 'weak' : undefined}
          sentiment={helperSentiment}
          variant="caption"
        >
          {error || success || helper}
        </Text>
      ) : null}
    </Stack>
  )
}
