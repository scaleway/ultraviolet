import styled from '@xstyled/emotion'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { getUUID } from '../../utils/ids'
import Tag, { variantsContainer } from '../Tag'

const variants = {
  base: ({ theme: { colors } }) => `
    padding: 8px;
    border-radius: 4px;
    border: 1px solid ${colors.gray350};
    &:focus-within {
      border: 1px solid ${colors.primary};
      box-shadow: 0 0 1px 2px ${transparentize(0.75, colors.primary)};
    }

    & > * {
      margin: 6px;
    }
  `,
  bordered: ({ theme: { colors } }) => `
    margin-top: 0;
    padding: 8px 0;

    > input:focus {
      box-shadow: 0 0 1px 2px ${transparentize(0.6, colors.primary)};
    }

    > * {
      margin-bottom: 6px;
      &:not(:last-child) {
        margin-right: 6px;
      }
    }
  `,
  'no-border': ({ theme: { colors } }) => `
    &:focus-within {
      box-shadow: 0 0 2px 4px ${transparentize(0.75, colors.primary)};
    }

    > * {
      margin-right: 6px;
      margin-bottom: 6px;
    }
  `,
}

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${({ variant, theme }) =>
    variants[variant] ? variants[variant]({ theme }) : variants.base({ theme })}
`

const StyledInput = styled.input`
  font-size: 16px;
  color: ${({ theme: { colors } }) => colors.gray700};
  border: none;
  outline: none;
  background-color: ${({ theme: { colors } }) => colors.white};
  &::placeholder {
    color: ${({ theme: { colors } }) => colors.gray550};
  }
`

const convertTagArrayToTagStateArray = tags =>
  tags.map(tag =>
    typeof tag === 'object'
      ? { ...tag, index: getUUID('tag') }
      : { index: getUUID('tag'), label: tag },
  )

const Tags = ({
  areTagsObject,
  disabled,
  id,
  manualInput,
  name,
  onChange,
  onChangeError,
  placeholder,
  tags,
  variant,
  ...props
}) => {
  const [tagsState, setTags] = useState(convertTagArrayToTagStateArray(tags))
  const [input, setInput] = useState('')
  const [status, setStatus] = useState({})

  useEffect(() => {
    setTags(convertTagArrayToTagStateArray(tags))
  }, [tags])

  const inputRef = useRef(null)

  const dispatchOnChange = newState => {
    onChange(
      areTagsObject
        ? newState.map(({ index, ...tag }) => tag)
        : newState.map(({ label }) => label),
    )
  }

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const onInputChange = e => {
    setInput(e.target.value)
  }

  const addTag = async () => {
    const newTags = input
      ? [...tagsState, { index: getUUID('tag'), label: input }]
      : tagsState
    setInput('')
    setTags(newTags)
    if (newTags.length !== tagsState.length) {
      setStatus({ [newTags[newTags.length - 1].index]: 'loading' })
    }
    try {
      await dispatchOnChange(newTags)
      setStatus({ [newTags[newTags.length - 1].index]: 'idle' })
    } catch (e) {
      onChangeError(e)
      setTags(tagsState)
    }
  }

  const deleteTag = async tagIndex => {
    setStatus({ [tagIndex]: 'loading' })
    const index = tagsState.findIndex(tag => tag.index === tagIndex)
    const newTags = [...tagsState]
    newTags.splice(index, 1)
    try {
      await dispatchOnChange(newTags)
      setTags(newTags)
      setStatus({ [tagIndex]: 'idle' })
    } catch (e) {
      onChangeError(e)
      setTags(tagsState)
    }
  }

  const handleInputKeydown = e => {
    // 32 = Space | 13 = Enter | 8 = backspace
    if (e.keyCode === 32 || e.keyCode === 13) {
      addTag()
      e.preventDefault()
    }
    if (
      e.keyCode === 8 &&
      inputRef.current.selectionStart === 0 &&
      tagsState.length
    ) {
      e.preventDefault()
      deleteTag(tagsState[tagsState.length - 1].index)
    }
  }

  const handlePaste = async e => {
    e.preventDefault()
    const newTags = [
      ...tagsState,
      { index: getUUID('tag'), label: e.clipboardData.getData('Text') },
    ]
    setTags(newTags)
    setStatus({ [newTags.length - 1]: 'loading' })
    try {
      await dispatchOnChange(newTags)
      setStatus({ [newTags.length - 1]: 'idle' })
    } catch (error) {
      onChangeError(error)
      setTags(tagsState)
    }
  }

  return (
    !(variant === 'bordered' && !tagsState.length) && (
      <TagsContainer
        onClick={handleContainerClick}
        variant={variant}
        onBlur={addTag}
        {...props}
      >
        {tagsState.map(tag => (
          <Tag
            variant={
              Object.keys(variantsContainer).includes(variant)
                ? variant
                : 'base'
            }
            disabled={disabled}
            key={`tag-${tag.index}`}
            isLoading={status[tag.index] === 'loading'}
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
  )
}

Tags.defaultProps = {
  areTagsObject: false,
  disabled: false,
  id: undefined,
  manualInput: true,
  onChange: () => {},
  onChangeError: () => {},
  placeholder: undefined,
  tags: [],
  variant: 'base',
}

Tags.propTypes = {
  areTagsObject: PropTypes.bool,
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
  variant: PropTypes.oneOf(Object.keys(variants)),
}

export default Tags
