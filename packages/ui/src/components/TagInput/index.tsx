import type { Theme } from '@emotion/react'
import styled from '@emotion/styled'
import type {
  ChangeEvent,
  ClipboardEventHandler,
  KeyboardEventHandler,
} from 'react'
import { useEffect, useRef, useState } from 'react'
import { getUUID } from '../../utils'
import { Tag } from '../Tag'

const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
} as const

type Keys = keyof typeof STATUS
type StatusValue = typeof STATUS[Keys]

const variants = {
  base: ({ theme: { colors, shadows } }: { theme: Theme }) => `
    padding: 8px;
    border-radius: 4px;
    border: 1px solid ${colors.neutral.borderWeak};
    &:focus-within {
      border: 1px solid ${colors.primary.borderWeak};
      box-shadow: ${shadows.focusPrimary};
    }

    & > * {
      margin: 6px;
    }
  `,
  bordered: ({ theme: { shadows } }: { theme: Theme }) => `
    margin-top: 0;
    padding: 8px 0;

    > input:focus {
      box-shadow: ${shadows.focusPrimary};
    }

    > * {
      margin-bottom: 6px;
      &:not(:last-child) {
        margin-right: 6px;
      }
    }
  `,
  'no-border': ({ theme: { shadows } }: { theme: Theme }) => `
    &:focus-within {
      box-shadow: ${shadows.focusPrimary};
    }

    > * {
      margin-right: 6px;
      margin-bottom: 6px;
    }
  `,
} as const

type Variant = keyof typeof variants

type TagInputContainersProps = {
  variant: Variant
}

const TagInputContainer = styled('div', {
  shouldForwardProp: prop => !['variant'].includes(prop),
})<TagInputContainersProps>`
  display: flex;
  flex-wrap: wrap;
  background-color: ${({ theme: { colors } }) => colors.neutral.backgroundWeak};
  ${({ variant, theme }) =>
    variants[variant] ? variants[variant]({ theme }) : variants.base({ theme })}
`

const StyledInput = styled.input`
  font-size: 16px;
  color: ${({ theme: { colors } }) => colors.neutral.text};
  border: none;
  outline: none;
  background-color: ${({ theme: { colors } }) => colors.neutral.backgroundWeak};
  &::placeholder {
    color: ${({ theme: { colors } }) => colors.neutral.textWeak};
  }
`

const convertTagArrayToTagStateArray = (tags?: TagInputProp) =>
  (tags || [])?.map((tag, index) =>
    typeof tag === 'object'
      ? { ...tag, index: getUUID(`tag-${index}`) }
      : { index: getUUID(`tag-${index}`), label: tag },
  )

type TagInputProp = (string | { label: string; index: string })[]

type TagInputProps = {
  disabled?: boolean
  id?: string
  manualInput?: boolean
  name?: string
  onChange?: (tags: string[]) => void
  onChangeError?: (error: Error | string) => void
  placeholder?: string
  tags?: TagInputProp
  variant?: Variant
  className?: string
}

export const TagInput = ({
  disabled = false,
  id,
  manualInput = true,
  name,
  onChange,
  onChangeError,
  placeholder,
  tags,
  variant = 'base',
  className,
}: TagInputProps): JSX.Element => {
  const [tagInputState, setTagInput] = useState(
    convertTagArrayToTagStateArray(tags ?? []),
  )
  const [input, setInput] = useState<string>('')
  const [status, setStatus] = useState<{ [key: string]: StatusValue }>({})

  useEffect(() => {
    setTagInput(convertTagArrayToTagStateArray(tags))
  }, [tags, setTagInput])

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

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value)

  const addTag = () => {
    const newTagInput = input
      ? [...tagInputState, { index: getUUID('tag'), label: input }]
      : tagInputState
    setInput('')
    setTagInput(newTagInput)
    if (newTagInput.length !== tagInputState.length) {
      setStatus({ [newTagInput[newTagInput.length - 1].index]: STATUS.LOADING })
    }
    try {
      dispatchOnChange(newTagInput)
      setStatus({ [newTagInput[newTagInput.length - 1].index]: STATUS.IDLE })
    } catch (error) {
      onChangeError?.(error as Error)
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
    } catch (error) {
      onChangeError?.(error as Error)
      setTagInput(tagInputState)
    }
  }

  const handleInputKeydown: KeyboardEventHandler<HTMLInputElement> = e => {
    // 32 = Space | 13 = Enter | 8 = Backspace
    // https://www.w3.org/TR/uievents-key/#control
    const key = e.key || e.keyCode
    const space = [' ', 32]
    const enter = ['Enter', 13]
    const tab = ['Tab', 9]
    const backspace = ['Backspace', 8]

    if (space.includes(key) || enter.includes(key) || tab.includes(key)) {
      addTag()
      e.preventDefault()
    }
    if (
      backspace.includes(key) &&
      inputRef?.current?.selectionStart === 0 &&
      tagInputState.length
    ) {
      e.preventDefault()
      deleteTag(tagInputState[tagInputState.length - 1].index)
    }
  }

  const handlePaste: ClipboardEventHandler<HTMLInputElement> = e => {
    e.preventDefault()
    const newTagInput = [
      ...tagInputState,
      { index: getUUID('tag'), label: e?.clipboardData?.getData('Text') },
    ]
    setTagInput(newTagInput)
    setStatus({ [newTagInput.length - 1]: STATUS.LOADING })
    try {
      dispatchOnChange(newTagInput)
      setStatus({ [newTagInput.length - 1]: STATUS.IDLE })
    } catch (error) {
      onChangeError?.(error as Error)
      setTagInput(tagInputState)
    }
  }

  return (
    <TagInputContainer
      onClick={handleContainerClick}
      variant={variant}
      onBlur={addTag}
      className={className}
    >
      {tagInputState.map(tag => (
        <Tag
          variant="neutral"
          disabled={disabled}
          key={tag.index}
          isLoading={status[tag.index] === STATUS.LOADING}
          onClose={e => {
            e.stopPropagation()
            deleteTag(tag.index)
          }}
        >
          {tag.label}
        </Tag>
      ))}
      {!disabled && manualInput ? (
        <StyledInput
          id={id}
          name={name}
          aria-label={name}
          type="text"
          placeholder={!tagInputState.length ? placeholder : ''}
          value={input}
          onChange={onInputChange}
          onKeyDown={handleInputKeydown}
          onPaste={handlePaste}
          ref={inputRef}
        />
      ) : null}
    </TagInputContainer>
  )
}
