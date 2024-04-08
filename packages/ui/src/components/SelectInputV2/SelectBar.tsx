import styled from '@emotion/styled'
import { Icon } from '@ultraviolet/icons'
import type { Dispatch, RefObject, SetStateAction } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '../Button'
import { Stack } from '../Stack'
import { Tag } from '../Tag'
import { Text } from '../Text'
import { INPUT_SIZE_HEIGHT, type OptionType, SIZES_TAG } from './types'

type SelectBarProps = {
  size: 'small' | 'medium' | 'large'
  clearable: boolean
  disabled: boolean
  readOnly: boolean
  value: OptionType | undefined
  placeholder: string
  multiselect: boolean
  success?: string
  error?: string
  onChange?: (value: (string | undefined)[]) => void
  autoFocus?: boolean
  innerRef: RefObject<HTMLDivElement>
  selectedValues: (OptionType | undefined)[]
  setSelectedValues: Dispatch<SetStateAction<(OptionType | undefined)[]>>
  isDropdownVisible: boolean
  setIsDropdownVisible: Dispatch<SetStateAction<boolean>>
}

type StyledInputWrapperProps = {
  size: 'small' | 'medium' | 'large'
  isDropdownVisible: boolean
  state: 'neutral' | 'danger' | 'success'
  openable: boolean
}

type DisplayValuesProps = {
  multiselect: boolean
  refTag: RefObject<HTMLDivElement>
  width?: number
  nonOverflowedValues: (OptionType | undefined)[]
  disabled: boolean
  readOnly: boolean
  selectedValues: (OptionType | undefined)[]
  setSelectedValues: Dispatch<SetStateAction<(OptionType | undefined)[]>>
  onChange?: (value: (string | undefined)[]) => void
  overflowed: boolean
  overflowAmount: number
}
const StateStack = styled(Stack)`
  padding-right: ${({ theme }) => theme.space['2']};
  right: 0px;
  display: flex;
`

const StackTags = styled(Stack, {
  shouldForwardProp: prop => !['width'].includes(prop),
})<{ width: number | undefined }>`
  max-width: ${({ width }) => width}px;
  overflow: scroll;
`
const StyledInputWrapper = styled(Stack, {
  shouldForwardProp: prop =>
    !['size', 'isDropdownVisible', 'state', 'openable'].includes(prop),
})<StyledInputWrapperProps>`
  display: flex;
  height: ${({ size }) => INPUT_SIZE_HEIGHT[size]}px;
  padding: ${({ theme }) => theme.space[1]};
  padding-right: 0;
  padding-left: ${({ theme }) => theme.space[2]};

  background: ${({ theme }) => theme.colors.neutral.background};
  border: 1px solid ${({ theme, state }) => theme.colors[state].border};
  border-radius: ${({ theme }) => theme.radii.default};

  &:hover,
  :focus {
    border-color: ${({ theme }) => theme.colors.primary.borderHover};
    outline: none;
  }
  &[data-readonly='true'] {
    background: ${({ theme }) => theme.colors.neutral.backgroundWeak};
    border-color: ${({ theme }) => theme.colors.neutral.border};
  }

  &[data-disabled='true'] {
    background: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
    border-color: ${({ theme }) => theme.colors.neutral.borderDisabled};
  }

  &:not([data-disabled='true']):not([data-readonly]):hover {
    border-color: ${({ theme }) => theme.colors.primary.border};
  }

  &:active {
    box-shadow: ${({ theme, openable }) =>
      openable ? theme.shadows.focusPrimary : 'none'};
  }

  ${({ theme, isDropdownVisible }) =>
    !isDropdownVisible
      ? ''
      : `
          box-shadow: ${theme.shadows.focusPrimary};
          border-color: ${theme.colors.primary.borderHover};
          }
        `}
`
const CustomTag = styled(Tag)`
  height: fit-content;
  width: fit-content;
`

const StyledPlaceholder = styled(Text)`
  color: ${({ theme }) => theme.colors.neutral.textWeak};
  text-size: ${({ theme }) => theme.typography.body.fontSize};
  display: flex;
  flex: 1;
  align-self: center;
`

const DisplayValues = ({
  multiselect,
  refTag,
  width,
  nonOverflowedValues,
  disabled,
  readOnly,
  selectedValues,
  setSelectedValues,
  onChange,
  overflowed,
  overflowAmount,
}: DisplayValuesProps) =>
  multiselect ? (
    <StackTags
      direction="row"
      gap="1"
      wrap="nowrap"
      ref={refTag}
      width={width}
      alignItems="center"
    >
      {nonOverflowedValues.map((option, index) => (
        <CustomTag
          key={option ? option.value : index}
          sentiment="neutral"
          disabled={disabled}
          onClose={
            !readOnly
              ? event => {
                  event.stopPropagation()
                  const newSelectedValues = selectedValues
                    ?.filter(val => val !== option)
                    .map(val => val?.value)
                  setSelectedValues(
                    selectedValues?.filter(val => val !== option),
                  )
                  onChange?.(newSelectedValues)
                }
              : undefined
          }
        >
          {option?.label}
        </CustomTag>
      ))}
      {overflowed ? (
        <Tag
          sentiment="neutral"
          disabled={disabled}
          key="+"
          data-testid="plus-tag"
          aria-label="Plus tag"
        >
          <Icon name="plus" />
          {overflowAmount}
        </Tag>
      ) : null}
    </StackTags>
  ) : (
    selectedValues[0]?.label
  )

export const SelectBar = ({
  size,
  clearable,
  disabled,
  readOnly,
  value,
  placeholder,
  multiselect,
  success,
  error,
  onChange,
  autoFocus,
  innerRef,
  selectedValues,
  setSelectedValues,
  isDropdownVisible,
  setIsDropdownVisible,
}: SelectBarProps) => {
  const openable = !(readOnly || disabled)
  const refTag = useRef<HTMLDivElement>(null)
  const width = innerRef.current?.offsetWidth
  const [overflowed, setOverflowed] = useState(false)
  const [overflowAmount, setOverflowAmount] = useState(0)
  const [nonOverflowedValues, setNonOverFlowedValues] = useState<
    (OptionType | undefined)[]
  >([value])

  const state = useMemo(() => {
    if (error) {
      return 'danger'
    }
    if (success) {
      return 'success'
    }

    return 'neutral'
  }, [error, success])
  useEffect(() => {
    let tagsWidth = 0
    let computedOverflowAmount = 0
    let computedNonOverflowedValues: (OptionType | undefined)[] = []

    for (const selectedValue of selectedValues) {
      if (selectedValue && selectedValue.label && width) {
        const lengthValue = selectedValue.value.length // Better way to find the number of displayed characters?
        const totalTagWidth =
          SIZES_TAG.tagWidth + SIZES_TAG.letterWidth * lengthValue
        if (totalTagWidth + tagsWidth > width - 100) {
          computedOverflowAmount += 1
          setOverflowAmount(computedOverflowAmount)
        } else {
          computedNonOverflowedValues = [
            ...computedNonOverflowedValues,
            selectedValue,
          ]
          setNonOverFlowedValues(computedNonOverflowedValues)
          tagsWidth += totalTagWidth
        }
      }
    }
    if (computedOverflowAmount === 0) {
      setOverflowed(false)
    } else {
      setOverflowed(true)
    }
    setOverflowAmount(computedOverflowAmount)
  }, [selectedValues, width])

  return (
    <StyledInputWrapper
      data-disabled={disabled}
      data-readonly={readOnly}
      size={size}
      isDropdownVisible={isDropdownVisible}
      state={state}
      direction="row"
      wrap="nowrap"
      gap="1"
      justifyContent="space-between"
      alignItems="center"
      onClick={
        openable ? () => setIsDropdownVisible(!isDropdownVisible) : undefined
      }
      data-testid="select-bar"
      autoFocus={autoFocus}
      onKeyDown={event => {
        if (event.key === 'ArrowDown') {
          setIsDropdownVisible(true)
        }

        return ['Enter', ' '].includes(event.key) && openable
          ? setIsDropdownVisible(!isDropdownVisible)
          : null
      }}
      ref={innerRef}
      openable={!(readOnly || disabled)}
      aria-labelledby="select bar"
      aria-haspopup="listbox"
      aria-expanded={isDropdownVisible}
      aria-controls="select-dropdown"
      tabIndex={0}
    >
      {selectedValues.length > 0 ? (
        <DisplayValues
          multiselect={multiselect}
          refTag={refTag}
          width={width}
          nonOverflowedValues={nonOverflowedValues}
          disabled={disabled}
          readOnly={readOnly}
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
          onChange={onChange}
          overflowed={overflowed}
          overflowAmount={overflowAmount}
        />
      ) : (
        <StyledPlaceholder as="p" variant="body">
          {placeholder}
        </StyledPlaceholder>
      )}
      <StateStack direction="row" gap={1} alignItems="center">
        {error ? <Icon name="alert" sentiment="danger" /> : null}
        {success && !error ? (
          <Icon name="checkbox-circle-outline" sentiment="success" />
        ) : null}
        {clearable && selectedValues.length > 0 ? (
          <Button
            aria-label="clear value"
            disabled={disabled || !value || readOnly}
            variant="ghost"
            size={size === 'small' ? 'xsmall' : 'small'}
            icon="close"
            onClick={event => {
              event.stopPropagation()
              setSelectedValues([])
              onChange?.([])
            }}
            sentiment="neutral"
            data-testid="clear-all"
          />
        ) : null}
        <Icon
          aria-label="show dropdown"
          size={size === 'small' ? 'xsmall' : 'small'}
          name="arrow-down"
          sentiment="neutral"
          disabled={disabled || readOnly}
        />
      </StateStack>
    </StyledInputWrapper>
  )
}
