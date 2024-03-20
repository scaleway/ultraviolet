import styled from '@emotion/styled'
import { useContext, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { Button } from '../Button'
import { Stack } from '../Stack'
import {
  type DataType,
  INPUT_SIZE_HEIGHT,
  ValueInput,
  handleChange,
  handleKeyDown,
} from './helper'

type SearchBarProps = {
  name: string
  placeholder: string
  options: DataType
  onSearch: Dispatch<SetStateAction<DataType>>
  size: 'small' | 'medium' | 'large'
  clearable: boolean
  setIsDropdownVisible: Dispatch<SetStateAction<boolean>>
  searchable: boolean
  disabled: boolean
  readOnly: boolean
  value: string | undefined
  selectedValues: (string | undefined)[]
  setSelectedValues: Dispatch<SetStateAction<(string | undefined)[]>>
}

type StyledInputWrapperProps = {
  hasFocus: boolean
  size: 'small' | 'medium' | 'large'
}

type StyledInputProps = {
  clearable: boolean
  searchable: boolean
}

const StateStack = styled(Stack)`
  padding: ${({ theme }) => `0 ${theme.space['2']}`};
`
const StyledInput = styled('input', {
  shouldForwardProp: prop => !['clearable', 'searchable'].includes(prop),
})<StyledInputProps>`
  flex: 1;
  border: none;
  outline: none;
  height: 100%;
  padding-left: ${({ theme }) => theme.space['2']};
  background: transparent;
  cursor: ${({ searchable }) => (searchable ? 'auto' : 'default')};
  pointer-events: ${({ searchable }) => (searchable ? 'auto' : 'none')};
`

const StyledInputWrapper = styled('div', {
  shouldForwardProp: prop => !['hasFocus', 'size'].includes(prop),
})<StyledInputWrapperProps>`
  display: flex;
  flex-direction: row;
  height: ${({ size }) => INPUT_SIZE_HEIGHT[size]}px;

  background: ${({ theme }) => theme.colors.neutral.background};
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  border-radius: ${({ theme }) => theme.radii.default};

  & > ${StyledInput} {
    color: ${({ theme }) => theme.colors.neutral.text};

    &::placeholder {
      color: ${({ theme }) => theme.colors.neutral.textWeak};
    }
  }

  &[data-readOnly='true'] {
    background: ${({ theme }) => theme.colors.neutral.backgroundWeak};
    border-color: ${({ theme }) => theme.colors.neutral.border};
  }

  &[data-disabled='true'] {
    background: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
    border-color: ${({ theme }) => theme.colors.neutral.borderDisabled};

    & > ${StyledInput} {
      color: ${({ theme }) => theme.colors.neutral.textDisabled};

      &::placeholder {
        color: ${({ theme }) => theme.colors.neutral.textWeakDisabled};
      }
    }
  }

  &:not([data-disabled='true']):not([data-readOnly]):hover {
    border-color: ${({ theme }) => theme.colors.primary.border};
  }

  ${({ theme, hasFocus }) =>
    hasFocus
      ? `
  box-shadow: ${theme.shadows.focusPrimary};
  border: 1px solid ${theme.colors.primary.border};
`
      : null};
`

export const SearchBar2 = ({
  name,
  placeholder,
  size,
  options,
  onSearch,
  clearable,
  setIsDropdownVisible,
  searchable,
  disabled,
  readOnly,
  value,
  selectedValues,
  setSelectedValues,
}: SearchBarProps) => {
  const { setSearchInput, searchInput } = useContext(ValueInput)
  const [hasFocus, setHasFocus] = useState(false)

  return (
    <StyledInputWrapper
      hasFocus={hasFocus}
      data-disabled={disabled}
      data-readOnly={readOnly}
      size={size}
      onFocus={() => setIsDropdownVisible(true)}
    >
      <StyledInput
        disabled={disabled}
        type="text"
        value={searchInput ?? selectedValues[0]}
        clearable={clearable}
        placeholder={placeholder}
        name={name}
        onBlur={() => setHasFocus(false)}
        onFocus={() => setHasFocus(true)}
        readOnly={readOnly}
        searchable={searchable}
        onChange={event =>
          handleChange({
            search: event.currentTarget.value,
            options,
            onSearch,
            setSearchInput,
          })
        }
        onKeyDown={event =>
          handleKeyDown({
            key: event.key,
            search: searchInput,
            setSelectedValues,
          })
        }
      />
      {clearable && searchInput ? (
        <StateStack direction="row" gap={1} alignItems="center">
          <Button
            aria-label="clear value"
            disabled={disabled || !value}
            variant="ghost"
            size={size === 'small' ? 'xsmall' : 'small'}
            icon="close"
            onClick={() => setSearchInput('')}
            sentiment="neutral"
          />
        </StateStack>
      ) : null}
    </StyledInputWrapper>
  )
}
