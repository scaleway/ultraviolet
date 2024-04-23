import styled from '@emotion/styled'
import { Icon } from '@ultraviolet/icons'
import type { Dispatch, RefObject } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '../Button'
import { Stack } from '../Stack'
import { Tag } from '../Tag'
import { Text } from '../Text'
import { useSelectInput } from './SelectInputProvider'
import type { DataType, OptionType, ReducerAction, ReducerState } from './types'
import { INPUT_SIZE_HEIGHT, SIZES_TAG } from './types'

type SelectBarProps = {
  size: 'small' | 'medium' | 'large'
  clearable: boolean
  disabled: boolean
  readOnly: boolean
  placeholder: string
  success?: string
  error?: string
  onChange?: (value: string[]) => void
  autoFocus?: boolean
  innerRef: RefObject<HTMLDivElement>
}

type DisplayValuesProps = {
  multiselect: boolean
  refTag: RefObject<HTMLDivElement>
  nonOverflowedValues: OptionType[]
  disabled: boolean
  readOnly: boolean
  onChange?: (value: string[]) => void
  overflowed: boolean
  overflowAmount: number
  selectedData: ReducerState
  setSelectedData: Dispatch<ReducerAction>
  size: 'small' | 'medium' | 'large'
}
const StateStack = styled(Stack)`
  padding-right: ${({ theme }) => theme.space['2']};
  display: flex;
`

const StyledInputWrapper = styled(Stack)<{
  'data-readonly': boolean
  'data-disabled': boolean
  'data-size': 'small' | 'medium' | 'large'
  'data-state': 'neutral' | 'success' | 'danger'
  'data-dropdownvisible': boolean
}>`
  display: flex;
  padding: ${({ theme }) => theme.space[1]};
  padding-right: 0;
  padding-left: ${({ theme }) => theme.space[2]};
  cursor: pointer;
  box-shadow: none;
  background: ${({ theme }) => theme.colors.neutral.background};
  border-radius: ${({ theme }) => theme.radii.default};

  &:hover,
  :focus {
    border-color: ${({ theme }) => theme.colors.primary.borderHover};
    outline: none;
  }
  &[data-readonly='true'] {
    background: ${({ theme }) => theme.colors.neutral.backgroundWeak};
    border-color: ${({ theme }) => theme.colors.neutral.border};
    cursor: default;
  }

  &[data-disabled='true'] {
    background: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
    border-color: ${({ theme }) => theme.colors.neutral.borderDisabled};
    cursor: not-allowed;
  }
  &[data-size='small'] {
    height: ${INPUT_SIZE_HEIGHT.small}px;
  }
  &[data-size='medium'] {
    height: ${INPUT_SIZE_HEIGHT.medium}px;
  }
  &[data-size='larger'] {
    height: ${INPUT_SIZE_HEIGHT.large}px;
  }
  &[data-state='neutral'] {
    border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  }
  &[data-state='success'] {
    border: 1px solid ${({ theme }) => theme.colors.success.border};
  }
  &[data-state='danger'] {
    border: 1px solid ${({ theme }) => theme.colors.danger.border};
  }

  &:not([data-disabled='true']):not([data-readonly]):hover {
    border-color: ${({ theme }) => theme.colors.primary.border};
  }

  &:not([data-disabled='true']):not([data-readonly]):active {
    box-shadow: ${({ theme }) => theme.shadows.focusPrimary};
  }

  &[data-dropdownvisible='true'] {
    box-shadow: ${({ theme }) => theme.shadows.focusPrimary};
    border-color: ${({ theme }) => theme.colors.primary.borderHover};
  }
`
const CustomTag = styled(Tag)`
  height: fit-content;
  width: fit-content;
`

const StyledPlaceholder = styled(Text)<{ 'data-disabled': boolean }>`
  color: ${({ theme }) => theme.colors.neutral.textWeak};
  text-size: ${({ theme }) => theme.typography.body.fontSize};
  display: flex;
  flex: 1;
  align-self: center;

  &[data-disabled='true'] {
    color: ${({ theme }) => theme.colors.neutral.textWeakDisabled};
  }
`
const isValidSelectedValue = (selectedValue: OptionType, options: DataType) =>
  !Array.isArray(options)
    ? Object.keys(options).some(group =>
        options[group].some(
          option => option === selectedValue && !option.disabled,
        ),
      )
    : options.some(option => option === selectedValue && !option.disabled)

const DisplayValues = ({
  multiselect,
  refTag,
  nonOverflowedValues,
  disabled,
  readOnly,
  onChange,
  overflowed,
  overflowAmount,
  setSelectedData,
  selectedData,
  size,
}: DisplayValuesProps) =>
  multiselect ? (
    <Stack
      direction="row"
      gap="1"
      wrap="nowrap"
      ref={refTag}
      alignItems="center"
    >
      {nonOverflowedValues.map(option => (
        <CustomTag
          data-testid="selected-options-tags"
          key={option?.value}
          sentiment="neutral"
          disabled={disabled}
          onClose={
            !readOnly
              ? event => {
                  event.stopPropagation()
                  setSelectedData({
                    type: 'selectOption',
                    clickedOption: option,
                  })
                  const newSelectedValues = selectedData.selectedValues?.filter(
                    val => val !== option,
                  )
                  onChange?.(newSelectedValues.map(val => val?.value))
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
    </Stack>
  ) : (
    <Text as="p" variant={size === 'large' ? 'body' : 'bodySmall'}>
      {selectedData.selectedValues[0]?.label}
    </Text>
  )

export const SelectBar = ({
  size,
  clearable,
  disabled,
  readOnly,
  placeholder,
  success,
  error,
  onChange,
  autoFocus,
  innerRef,
}: SelectBarProps) => {
  const {
    isDropdownVisible,
    setIsDropdownVisible,
    options,
    multiselect,
    selectedData,
    setSelectedData,
  } = useSelectInput()
  const openable = !(readOnly || disabled)
  const refTag = useRef<HTMLDivElement>(null)
  const width = innerRef.current?.offsetWidth
  const [overflowed, setOverflowed] = useState(false)
  const [overflowAmount, setOverflowAmount] = useState(0)
  const [nonOverflowedValues, setNonOverFlowedValues] = useState<OptionType[]>(
    selectedData.selectedValues[0] ? [selectedData.selectedValues[0]] : [],
  )

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
    // When too many items are selected, too avoid overflow, compute the number of tags to display and add a + tag
    let tagsWidth = 0
    let computedOverflowAmount = 0
    let computedNonOverflowedValues: OptionType[] = []
    const newSelectedValues = selectedData.selectedValues.filter(
      selectedValue => isValidSelectedValue(selectedValue, options),
    )
    for (const selectedValue of newSelectedValues) {
      if (
        selectedValue &&
        selectedValue.label &&
        width &&
        isValidSelectedValue(selectedValue, options)
      ) {
        const lengthValue = selectedValue.value.length // Find a better way to find the number of displayed characters?
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
  }, [options, selectedData.selectedValues, width])

  useEffect(() => {
    setSelectedData({ type: 'update' })
  }, [setSelectedData, options])

  return (
    <StyledInputWrapper
      data-disabled={disabled}
      data-readonly={readOnly}
      data-size={size}
      data-dropdownvisible={isDropdownVisible}
      data-state={state}
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
          if (!isDropdownVisible) {
            setIsDropdownVisible(true)
          } else {
            document.getElementById(`option-0`)?.focus()
          }
        }

        return ['Enter', ' '].includes(event.key) && openable
          ? setIsDropdownVisible(!isDropdownVisible)
          : null
      }}
      ref={innerRef}
      aria-labelledby="select bar"
      aria-haspopup="listbox"
      aria-expanded={isDropdownVisible}
      aria-controls="select-dropdown"
      tabIndex={0}
    >
      {selectedData.selectedValues.length > 0 ? (
        <DisplayValues
          multiselect={multiselect}
          refTag={refTag}
          nonOverflowedValues={nonOverflowedValues}
          disabled={disabled}
          readOnly={readOnly}
          selectedData={selectedData}
          setSelectedData={setSelectedData}
          onChange={onChange}
          overflowed={overflowed}
          overflowAmount={overflowAmount}
          size={size}
        />
      ) : (
        <StyledPlaceholder
          as="p"
          variant={size === 'large' ? 'body' : 'bodySmall'}
          data-disabled={disabled}
        >
          {placeholder}
        </StyledPlaceholder>
      )}
      <StateStack direction="row" gap={1} alignItems="center">
        {error ? <Icon name="alert" sentiment="danger" /> : null}
        {success && !error ? (
          <Icon name="checkbox-circle-outline" sentiment="success" />
        ) : null}
        {clearable && selectedData.selectedValues.length > 0 ? (
          <Button
            aria-label="clear value"
            disabled={disabled || ![selectedData.selectedValues[0]] || readOnly}
            variant="ghost"
            size="small"
            icon="close"
            onClick={event => {
              event.stopPropagation()
              setSelectedData({ type: 'clearAll' })
              onChange?.([])
            }}
            sentiment="neutral"
            data-testid="clear-all"
          />
        ) : null}
        <Icon
          aria-label="show dropdown"
          size="small"
          name="arrow-down"
          sentiment="neutral"
          disabled={disabled || readOnly}
        />
      </StateStack>
    </StyledInputWrapper>
  )
}
