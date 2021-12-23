import { Theme } from '@emotion/react'
import styled from '@xstyled/emotion'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, {
  ChangeEvent,
  ClipboardEventHandler,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react'
import { getUUID } from '../../utils'
import Tag from '../Tag'

const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
} as const

type Keys = keyof typeof STATUS
type StatusValue = typeof STATUS[Keys]

const variants = {
  base: ({ theme: { colors } }: { theme: Theme }) => `
    padding: 8px;
    border-radius: 4px;
    border: 1px solid ${colors.neutral.borderWeak};
    &:focus-within {
      border: 1px solid ${colors.primary.borderWeak};
      box-shadow: 0 0 1px 2px ${transparentize(
        0.75,
        colors.primary.borderWeak,
      )};
    }

    & > * {
      margin: 6px;
    }
  `,
  bordered: ({ theme: { colors } }: { theme: Theme }) => `
    margin-top: 0;
    padding: 8px 0;

    > input:focus {
      box-shadow: 0 0 1px 2px ${transparentize(0.6, colors.primary.borderWeak)};
    }

    > * {
      margin-bottom: 6px;
      &:not(:last-child) {
        margin-right: 6px;
      }
    }
  `,
  'no-border': ({ theme: { colors } }: { theme: Theme }) => `
    &:focus-within {
      box-shadow: 0 0 2px 4px ${transparentize(
        0.75,
        colors.primary.borderWeak,
      )};
    }

    > * {
      margin-right: 6px;
      margin-bottom: 6px;
    }
  `,
} as const

type Variant = keyof typeof variants
const keysVariant = Object.keys(variants) as Variant[]

interface TagsContainersProps {
  variant: Variant
}

const TagsContainer = styled('div', {
  shouldForwardProp: props => !['variant'].includes(props.toString()),
})<TagsContainersProps>`
  display: flex;
  flex-wrap: wrap;
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

const convertTagArrayToTagStateArray = (tags: TagsProp = []) =>
  tags.map((tag, index) =>
    typeof tag === 'object'
      ? { ...tag, index: getUUID(`tag-${index}`) }
      : { index: getUUID(`tag-${index}`), label: tag },
  )

type TagsProp = (string | { label: string; index: string })[]

type TagsProps = {
  disabled?: boolean
  id?: string
  manualInput?: boolean
  name?: string
  onChange?: (tags: string[]) => void
  onChangeError?: (error: Error | string) => void
  placeholder?: string
  tags?: TagsProp
  variant?: Variant
}

const Tags = ({
  disabled = false,
  id,
  manualInput = true,
  name,
  onChange,
  onChangeError,
  placeholder,
  tags,
  variant = 'base',
  ...props
}: TagsProps): JSX.Element => {
  const [tagsState, setTags] = useState(convertTagArrayToTagStateArray(tags))
  const [input, setInput] = useState<string>('')
  const [status, setStatus] = useState<{ [key: string]: StatusValue }>({})

  useEffect(() => {
    setTags(convertTagArrayToTagStateArray(tags))
  }, [tags, setTags])

  const inputRef = useRef<HTMLInputElement>(null)

  const dispatchOnChange = (newState: TagsProp) => {
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
    const newTags = input
      ? [...tagsState, { index: getUUID('tag'), label: input }]
      : tagsState
    setInput('')
    setTags(newTags)
    if (newTags.length !== tagsState.length) {
      setStatus({ [newTags[newTags.length - 1].index]: STATUS.LOADING })
    }
    try {
      dispatchOnChange(newTags)
      setStatus({ [newTags[newTags.length - 1].index]: STATUS.IDLE })
    } catch (error) {
      onChangeError?.(error as Error)
      setTags(tagsState)
    }
  }

  const deleteTag = (tagIndex: string) => {
    setStatus({ [tagIndex]: STATUS.LOADING })
    const findIndex = tagsState.findIndex(({ index }) => index === tagIndex)
    const newTags = [...tagsState]
    newTags.splice(findIndex, 1)
    try {
      dispatchOnChange(newTags)
      setTags(newTags)
      setStatus({ [tagIndex]: STATUS.IDLE })
    } catch (error) {
      onChangeError?.(error as Error)
      setTags(tagsState)
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
      tagsState.length
    ) {
      e.preventDefault()
      deleteTag(tagsState[tagsState.length - 1].index)
    }
  }

  const handlePaste: ClipboardEventHandler<HTMLInputElement> = e => {
    e.preventDefault()
    const newTags = [
      ...tagsState,
      { index: getUUID('tag'), label: e?.clipboardData?.getData('Text') },
    ]
    setTags(newTags)
    setStatus({ [newTags.length - 1]: STATUS.LOADING })
    try {
      dispatchOnChange(newTags)
      setStatus({ [newTags.length - 1]: STATUS.IDLE })
    } catch (error) {
      onChangeError?.(error as Error)
      setTags(tagsState)
    }
  }

  return (
    <TagsContainer
      onClick={handleContainerClick}
      variant={variant}
      onBlur={addTag}
      {...props}
    >
      {tagsState.map(tag => (
        <Tag
          variant={variant === 'no-border' ? 'base' : variant}
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
          placeholder={!tagsState.length ? placeholder : ''}
          value={input}
          onChange={onInputChange}
          onKeyDown={handleInputKeydown}
          onPaste={handlePaste}
          ref={inputRef}
        />
      ) : null}
    </TagsContainer>
  )
}

Tags.defaultProps = {
  tags: [],
}

Tags.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string,
  manualInput: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onChangeError: PropTypes.func,
  placeholder: PropTypes.string,
  tags: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.string,
      }),
    ]),
  ),
  variant: PropTypes.oneOf(keysVariant),
}

export default Tags
