'use client'

import styled from '@emotion/styled'
import {
  AlertCircleIcon,
  ArrowDownIcon,
  CheckCircleIcon,
  CloseIcon,
  PlusIcon,
} from '@ultraviolet/icons'
import type { RefObject } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '../Button'
import { Stack } from '../Stack'
import { Tag } from '../Tag'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'
import { useSelectInput } from './SelectInputProvider'
import { findOptionInOptions } from './findOptionInOptions'
import type { DataType, OptionType } from './types'
import { INPUT_SIZE_HEIGHT, SIZES_TAG } from './types'

type SelectBarProps = {
  size: 'small' | 'medium' | 'large'
  clearable: boolean
  disabled: boolean
  readOnly: boolean
  placeholder: string
  success?: string
  error?: string | boolean
  autoFocus?: boolean
  innerRef: RefObject<HTMLDivElement | null>
  id?: string
  'data-testid': string
  label?: string
  tooltip?: string
}

type DisplayValuesProps = {
  refTag: RefObject<HTMLDivElement | null>
  nonOverflowedValues: OptionType[]
  disabled: boolean
  readOnly: boolean
  overflowed: boolean
  overflowAmount: number
  size: 'small' | 'medium' | 'large'
}

const StateStack = styled(Stack)`
  padding-right: ${({ theme }) => theme.space['2']};
  display: flex;
`
const Placeholder = styled(Text)`
user-select: none;
`

export const StyledInputWrapper = styled(Stack)<{
  'data-readonly': boolean
  'data-disabled': boolean
  'data-size': 'small' | 'medium' | 'large'
  'data-state': 'neutral' | 'success' | 'danger'
  'data-dropdownvisible': boolean
  'aria-label'?: string
}>`
  display: flex;
  padding: ${({ theme }) => theme.space[1]};
  padding-right: 0;
  padding-left: ${({ theme }) => theme.space[2]};
  cursor: pointer;
  box-shadow: none;
  background: ${({ theme }) => theme.colors.neutral.background};
  border-radius: ${({ theme }) => theme.radii.default};
  width: 100%;
  overflow: hidden;

  &[data-size='small'] {
    height: ${({ theme }) => theme.sizing[INPUT_SIZE_HEIGHT.small]};
    padding-left: ${({ theme }) => theme.space[1]};
  }
  &[data-size='medium'] {
    height: ${({ theme }) => theme.sizing[INPUT_SIZE_HEIGHT.medium]};
  }
  &[data-size='large'] {
    height: ${({ theme }) => theme.sizing[INPUT_SIZE_HEIGHT.large]};
  }
  &[data-state='neutral'] {
    border: 1px solid ${({ theme }) => theme.colors.neutral.border};

    &:not([data-disabled="true"]):not([data-readonly="true"]):active {
      border-color: ${({ theme }) => theme.colors.primary.borderHover};
      box-shadow: ${({ theme }) => theme.shadows.focusPrimary};
    }
    &:not([data-disabled='true']):hover {
      border-color: ${({ theme }) => theme.colors.primary.borderHover};
      outline: none;
    }

    &:not([data-disabled='true']):focus-visible {
      outline: 5px auto Highlight;
      outline: 5px auto -webkit-focus-ring-color;
    }

    &[data-dropdownvisible='true'] {
    border-color: ${({ theme }) => theme.colors.primary.borderHover};
  }
  }

  &[data-state='success'] {
    border: 1px solid ${({ theme }) => theme.colors.success.border};
    &:not([data-disabled="true"]):not([data-readonly="true"]):active {
      border-color: ${({ theme }) => theme.colors.success.borderHover};
      box-shadow: ${({ theme }) => theme.shadows.focusSuccess};
    }

    &[data-dropdownvisible='true'] {
      border-color: ${({ theme }) => theme.colors.success.borderHover};
    }
  }

  &[data-state='danger'] {
    border: 1px solid ${({ theme }) => theme.colors.danger.border};

    &:not([data-disabled="true"]):not([data-readonly="true"]):active {
      border-color: ${({ theme }) => theme.colors.danger.borderHover};
      box-shadow: ${({ theme }) => theme.shadows.focusDanger};
    }

    &[data-dropdownvisible='true'] {
      border-color: ${({ theme }) => theme.colors.danger.borderHover};
    }
  }

  &:not([data-disabled='true']):not([data-readonly]):hover {
    border-color: ${({ theme }) => theme.colors.primary.border};
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
`

const CustomTag = styled(Tag)`
  height: fit-content;
  width: fit-content;
`

const SelectedValues = styled(Text)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

const isValidSelectedValue = (selectedValue: string, options: DataType) =>
  !Array.isArray(options)
    ? Object.keys(options).some(group =>
        options[group].some(
          option => option.value === selectedValue && !option.disabled,
        ),
      )
    : options.some(option => option.value === selectedValue && !option.disabled)

const DisplayValues = ({
  refTag,
  nonOverflowedValues,
  disabled,
  readOnly,
  overflowed,
  overflowAmount,
  size,
}: DisplayValuesProps) => {
  const { multiselect, selectedData, setSelectedData, options, onChange } =
    useSelectInput()

  return multiselect ? (
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
                    val => val !== option.value,
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
          <PlusIcon />
          {overflowAmount}
        </Tag>
      ) : null}
    </Stack>
  ) : (
    <SelectedValues
      as="div"
      variant={size === 'large' ? 'body' : 'bodySmall'}
      disabled={disabled}
      prominence="default"
      sentiment="neutral"
    >
      {selectedData.selectedValues[0]
        ? findOptionInOptions(options, selectedData.selectedValues[0])?.label
        : null}
    </SelectedValues>
  )
}

export const SelectBar = ({
  size,
  clearable,
  disabled,
  readOnly,
  placeholder,
  success,
  error,
  autoFocus,
  tooltip,
  innerRef,
  id,
  'data-testid': dataTestId,
  label,
}: SelectBarProps) => {
  const {
    isDropdownVisible,
    onChange,
    setIsDropdownVisible,
    options,
    selectedData,
    setSelectedData,
    multiselect,
  } = useSelectInput()
  const openable = !(readOnly || disabled)
  const refTag = useRef<HTMLDivElement>(null)
  const width = innerRef.current?.offsetWidth
  const [overflowAmount, setOverflowAmount] = useState(0)
  const [nonOverflowedValues, setNonOverFlowedValues] = useState<OptionType[]>(
    () => {
      if (selectedData.selectedValues[0]) {
        const firstSelectOption = findOptionInOptions(
          options,
          selectedData.selectedValues[0],
        )

        return firstSelectOption ? [firstSelectOption] : []
      }

      return []
    },
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
      const selectedOption = findOptionInOptions(options, selectedValue)
      if (
        selectedOption?.label &&
        width &&
        isValidSelectedValue(selectedValue, options)
      ) {
        const lengthValue = selectedOption.value.length // Find a better way to find the number of displayed characters?
        const totalTagWidth =
          SIZES_TAG.tagWidth + SIZES_TAG.letterWidth * lengthValue
        if (totalTagWidth + tagsWidth > width - 100) {
          computedOverflowAmount += 1
        } else {
          computedNonOverflowedValues = [
            ...computedNonOverflowedValues,
            selectedOption,
          ]
          tagsWidth += totalTagWidth
        }
      }
    }
    setNonOverFlowedValues(computedNonOverflowedValues)
    setOverflowAmount(computedOverflowAmount)
  }, [options, selectedData.selectedValues, width])

  useEffect(() => {
    setSelectedData({ type: 'update' })
  }, [setSelectedData, options])

  const shouldDisplayValues = useMemo(() => {
    if (multiselect) {
      return (
        nonOverflowedValues.length > 0 ||
        selectedData.selectedValues.some(
          selectedValue =>
            findOptionInOptions(options, selectedValue) !== undefined,
        )
      )
    }

    return (
      selectedData.selectedValues[0] !== undefined &&
      findOptionInOptions(options, selectedData.selectedValues[0]) !== undefined
    )
  }, [
    multiselect,
    nonOverflowedValues.length,
    options,
    selectedData.selectedValues,
  ])

  return (
    <Tooltip text={tooltip}>
      <StyledInputWrapper
        role="combobox"
        id={id}
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
        data-testid={dataTestId}
        autoFocus={autoFocus}
        onKeyDown={event => {
          if (event.key === 'ArrowDown') {
            if (!isDropdownVisible) {
              setIsDropdownVisible(true)
            } else {
              document.getElementById(`option-0`)?.focus()
            }
          }
          if (event.key === ' ') {
            event.preventDefault()
          }

          return ['Enter', ' '].includes(event.key) && openable
            ? setIsDropdownVisible(!isDropdownVisible)
            : null
        }}
        ref={innerRef}
        aria-haspopup="listbox"
        aria-expanded={isDropdownVisible}
        tabIndex={0}
        aria-label={label}
      >
        {shouldDisplayValues ? (
          <DisplayValues
            refTag={refTag}
            nonOverflowedValues={nonOverflowedValues}
            disabled={disabled}
            readOnly={readOnly}
            overflowed={!!overflowAmount}
            overflowAmount={overflowAmount}
            size={size}
          />
        ) : (
          <Placeholder
            as="p"
            variant={size === 'large' ? 'body' : 'bodySmall'}
            sentiment="neutral"
            disabled={disabled}
            prominence="weak"
          >
            {placeholder}
          </Placeholder>
        )}
        <StateStack direction="row" gap={1} alignItems="center">
          {error ? <AlertCircleIcon sentiment="danger" /> : null}
          {success && !error ? <CheckCircleIcon sentiment="success" /> : null}
          {clearable && selectedData.selectedValues.length > 0 ? (
            <Button
              aria-label="clear value"
              disabled={disabled || !selectedData.selectedValues[0] || readOnly}
              variant="ghost"
              size="small"
              onClick={event => {
                event.stopPropagation()
                setSelectedData({ type: 'clearAll' })
                if (multiselect) {
                  onChange?.([])
                } else {
                  onChange?.('')
                }
              }}
              sentiment="neutral"
              data-testid="clear-all"
            >
              <CloseIcon />
            </Button>
          ) : null}
          <ArrowDownIcon
            aria-label="show dropdown"
            size="small"
            sentiment="neutral"
            disabled={disabled || readOnly}
          />
        </StateStack>
      </StyledInputWrapper>
    </Tooltip>
  )
}
