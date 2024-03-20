import styled from '@emotion/styled'
import { type Dispatch, type SetStateAction, useContext } from 'react'
import { Button } from '../Button'
import { Tag } from '../Tag'
import {
  type DataType,
  INPUT_SIZE_HEIGHT,
  ValueInput,
  handleChange,
  handleKeyDown,
} from './helper'

type SearchBarMultiProps = {
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

type MultiSearchBarWrapperProps = {
  size: 'small' | 'medium' | 'large'
}
const MultiSearchBarWrapper = styled('div', {
  shouldForwardProp: prop => !['size'].includes(prop),
})<MultiSearchBarWrapperProps>`
  display: flex;
  gap: ${({ theme }) => theme.space['1']};
  background-color: ${({ theme: { colors } }) => colors.neutral.background};
  height: ${({ size }) => INPUT_SIZE_HEIGHT[size]}px;

  padding: ${({ theme }) =>
    `calc(${theme.space[1]} - 1px) ${theme.space['2']}`};
  cursor: text;

  background: ${({ theme }) => theme.colors.neutral.background};
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  border-radius: ${({ theme }) => theme.radii.default};

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary.borderHover};
    box-shadow: ${({ theme }) => theme.shadows.focusPrimary};
  }

  &[data-success='true'] {
    border-color: ${({ theme }) => theme.colors.success.border};
  }

  &[data-error='true'] {
    border-color: ${({ theme }) => theme.colors.danger.border};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.borderHover};
  }

  &[data-readonly='true'] {
    border-color: ${({ theme }) => theme.colors.neutral.border};
    background: ${({ theme }) => theme.colors.neutral.backgroundWeak};
  }

  &[data-disabled='true'] {
    border-color: ${({ theme }) => theme.colors.neutral.borderDisabled};
    background: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
    cursor: not-allowed;
  }
`

const DataContainer = styled('div')`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.space['1']};
  flex: 1;
`
const StyledInput = styled.input`
  display: flex;
  flex: 1;
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  background: inherit;
  color: ${({ theme }) => theme.colors.neutral.textWeak};
  border: none;
  outline: none;
  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral.textWeak};
  }
  height: 100%;
`

export const SearchBarMulti = ({
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
}: SearchBarMultiProps) => {
  console.log(size)
  const { setSearchInput, searchInput } = useContext(ValueInput)

  return (
    <MultiSearchBarWrapper size={size}>
      <DataContainer onFocus={() => setIsDropdownVisible(true)}>
        {selectedValues.map(selectedValue => (
          <Tag
            key={selectedValue}
            sentiment="neutral"
            disabled={disabled}
            onClose={
              !readOnly
                ? event => {
                    event.stopPropagation()
                    setSelectedValues(
                      selectedValues?.filter(val => val !== selectedValue),
                    )
                  }
                : undefined
            }
          >
            {selectedValue}
          </Tag>
        ))}
        {!disabled && searchable ? (
          <StyledInput
            name={name}
            aria-label={name}
            type="text"
            placeholder={selectedValues ? placeholder : undefined}
            value={value}
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
            readOnly={readOnly}
          />
        ) : null}
      </DataContainer>
      {clearable ? (
        <Button
          aria-label="clear value"
          disabled={disabled}
          variant="ghost"
          size="xsmall"
          icon="close"
          onClick={() => setSelectedValues([])}
          sentiment="neutral"
        />
      ) : null}
    </MultiSearchBarWrapper>
  )
}
