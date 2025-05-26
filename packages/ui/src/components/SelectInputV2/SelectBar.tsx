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
import type { OptionType } from './types'
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
  potentiallyNonOverflowedValues: OptionType[]
  disabled: boolean
  readOnly: boolean
  overflowed: boolean
  overflowAmount: number
  measureRef: RefObject<HTMLDivElement | null>
  size: 'small' | 'medium' | 'large'
  lastElementMaxWidth: number
  overflow?: boolean
}

const StateStack = styled(Stack)`
  padding-right: ${({ theme }) => theme.space['2']};
  display: flex;
`
const Placeholder = styled(Text)`
user-select: none;
`

const StyledInputWrapper = styled(Stack)<{
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

const CustomTag = styled(Tag, {
  shouldForwardProp: prop => !['lastElementMaxWidth'].includes(prop),
})<{
  lastElementMaxWidth?: number
}>`
  height: fit-content;
  width: fit-content;

  max-width: ${({ lastElementMaxWidth }) =>
    lastElementMaxWidth ? `${lastElementMaxWidth}px` : '100%'};
  text-overflow: ellipsis;
`

const SelectedValues = styled(Text)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`
const PlusTag = styled(Tag)`
width: ${({ theme }) => theme.sizing[500]};
`

const DisplayValues = ({
  refTag,
  nonOverflowedValues,
  potentiallyNonOverflowedValues,
  disabled,
  readOnly,
  overflowed,
  overflowAmount,
  size,
  measureRef,
  lastElementMaxWidth,
  overflow,
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
      {nonOverflowedValues.map((option, index) => (
        <CustomTag
          data-testid="selected-options-tags"
          sentiment="neutral"
          key={option?.value}
          disabled={disabled}
          lastElementMaxWidth={
            index === nonOverflowedValues.length - 1 && overflow
              ? lastElementMaxWidth
              : 0
          }
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
      {/* Hidden div to measure the width of the tags */}
      <div
        ref={measureRef}
        style={{
          visibility: 'hidden',
          position: 'absolute',
        }}
      >
        {potentiallyNonOverflowedValues.map(option => (
          <CustomTag
            onClose={() => {}}
            className={option.value}
            key={option.value}
          >
            {option?.label}
          </CustomTag>
        ))}
      </div>
      {overflowed ? (
        <PlusTag
          sentiment="neutral"
          disabled={disabled}
          key="+"
          data-testid="plus-tag"
          aria-label="Plus tag"
        >
          <PlusIcon size="xsmall" />
          {overflowAmount}
        </PlusTag>
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

const SelectBar = ({
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
  const measureRef = useRef<HTMLDivElement>(null)
  const width = innerRef.current?.offsetWidth
  // width - width of the arrow (in px) - padding between tags (in px)
  const innerWidth = (width ?? 0) - SIZES_TAG.arrow - SIZES_TAG.paddings

  const [overflowAmount, setOverflowAmount] = useState(0)
  const [overflow, setOverflow] = useState(false)
  const [lastElementMaxWidth, setLastElementMaxWidth] = useState(0)
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

  const potentiallyNonOverflowedValues = selectedData.selectedValues
    .map(selectedValue => findOptionInOptions(options, selectedValue))
    .filter((option): option is OptionType => !!option)

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
    if (selectedData.selectedValues.length === 0) {
      setOverflowAmount(0)
      setNonOverFlowedValues([])
    }
    if (
      measureRef.current &&
      innerWidth > 0 &&
      selectedData.selectedValues.length > 0
    ) {
      const toMeasureElements: HTMLCollection = measureRef.current.children
      const toMeasureElementsArray = [...toMeasureElements]

      const {
        measuredVisibleTags,
        measuredHiddenTags,
        accumulatedWidth,
        lastElementWidth,
      } = toMeasureElementsArray.reduce(
        (
          accumulator: {
            measuredVisibleTags: OptionType[]
            measuredHiddenTags: number
            accumulatedWidth: number
            lastElementWidth: number
          },
          currentValue,
          index,
        ) => {
          const elementWidth = (currentValue as HTMLDivElement).offsetWidth
          const newAccumulatedWidth =
            accumulator.accumulatedWidth + elementWidth + SIZES_TAG.gap

          return {
            measuredVisibleTags: [
              ...accumulator.measuredVisibleTags,
              newAccumulatedWidth <= innerWidth &&
                potentiallyNonOverflowedValues[index],
            ].filter(Boolean) as OptionType[],
            measuredHiddenTags:
              accumulator.measuredHiddenTags +
              (newAccumulatedWidth > innerWidth ? 1 : 0),
            accumulatedWidth:
              newAccumulatedWidth > innerWidth
                ? accumulator.accumulatedWidth
                : newAccumulatedWidth,
            lastElementWidth:
              index === toMeasureElementsArray.length - 1 ? elementWidth : 0,
          }
        },
        {
          measuredVisibleTags: [],
          measuredHiddenTags: 0,
          accumulatedWidth: 0,
          lastElementWidth: 0,
        },
      )

      const finalWidth =
        accumulatedWidth +
        (measuredHiddenTags ? SIZES_TAG.paddings + SIZES_TAG.plusTag : 0)
      const overflowPx = finalWidth - innerWidth

      // If only one element is selected and it is hidden, we need to show it
      if (measuredHiddenTags === 1 && measuredVisibleTags.length === 0) {
        setOverflowAmount(0)
        setNonOverFlowedValues([potentiallyNonOverflowedValues[0]])

        const newOverflowPx =
          lastElementWidth +
          (measuredHiddenTags - 1 > 0
            ? SIZES_TAG.paddings + SIZES_TAG.plusTag
            : 0) -
          innerWidth
        setLastElementMaxWidth(lastElementWidth - newOverflowPx)
        setOverflow(true)
      }

      // If it overflows with the last tag, we need to add an ellipsis to the last element if there is enough space (>60px)
      // else we hide it completely and add it to the overflow amount
      else if (lastElementWidth - overflowPx > 60 && measuredHiddenTags > 0) {
        setLastElementMaxWidth(lastElementWidth - overflowPx)
        setOverflow(true)
        setOverflowAmount(measuredHiddenTags)
        setNonOverFlowedValues(measuredVisibleTags)
      } else if (overflowPx > 0 && measuredHiddenTags > 0) {
        setLastElementMaxWidth(0)
        setOverflow(false)
        setOverflowAmount(measuredHiddenTags + 1)
        setNonOverFlowedValues(measuredVisibleTags.slice(0, -1))
      }
      // Otherwise, we have enough space to show all tags
      else {
        setOverflow(false)
        setOverflowAmount(measuredHiddenTags)
        setNonOverFlowedValues(measuredVisibleTags)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedData.selectedValues.length, innerWidth])

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
            potentiallyNonOverflowedValues={potentiallyNonOverflowedValues}
            disabled={disabled}
            readOnly={readOnly}
            overflowed={!!overflowAmount}
            overflowAmount={overflowAmount}
            size={size}
            measureRef={measureRef}
            lastElementMaxWidth={lastElementMaxWidth}
            overflow={overflow}
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

export { SelectBar, StyledInputWrapper }
