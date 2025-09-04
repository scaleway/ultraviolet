'use client'

import styled from '@emotion/styled'
import {
  AlertCircleIcon,
  ArrowDownIcon,
  CheckCircleIcon,
  CloseIcon,
  PlusIcon,
} from '@ultraviolet/icons'
import type { ReactNode, RefObject } from 'react'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Button } from '../Button'
import { Stack } from '../Stack'
import { Tag } from '../Tag'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'
import { findOptionInOptions } from './findOptionInOptions'
import { useSelectInput } from './SelectInputProvider'
import type { OptionType } from './types'
import { INPUT_SIZE_HEIGHT } from './types'

const SIZES_TAG = {
  gap: 8,
  paddings: 16,
  plusTag: 48,
}

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
  dropdownId?: string
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
  refPlusTag: RefObject<HTMLDivElement | null>
  displayShadowCopy?: boolean
}

const StateStack = styled(Stack)`
  padding-right: ${({ theme }) => theme.space['2']};
  display: flex;
`
const Placeholder = styled(Text)`
user-select: none;
align-self: center;
`

const StyledInputWrapper = styled.div<{
  'data-readonly': boolean
  'data-disabled': boolean
  'data-size': 'small' | 'medium' | 'large'
  'data-state': 'neutral' | 'success' | 'danger'
  'data-dropdownvisible': boolean
  'aria-label'?: string
}>`
  display: grid;
  width: 100%;
  gap: ${({ theme }) => theme.space[1]};
  grid-template-columns: 1fr auto ;
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
  shouldForwardProp: prop => !['lastElementMaxWidth', 'hidden'].includes(prop),
})<{
  lastElementMaxWidth?: number
  hidden?: boolean
}>`
  height: max-content;
  width: fit-content;
  min-width: ${({ lastElementMaxWidth }) =>
    lastElementMaxWidth ? 'auto' : 'fit-content'};

  max-width: ${({ lastElementMaxWidth, hidden }) =>
    lastElementMaxWidth && !hidden ? `${lastElementMaxWidth}px` : '100%'};

  ${({ hidden }) =>
    hidden
      ? 'visibility: hidden;'
      : `
  text-overflow: ellipsis;
  overflow: hidden;`}
`

const SelectedValues = styled(Text)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  align-self: center;
`
const PlusTag = styled(Tag)`
width: ${({ theme }) => theme.sizing[500]};
;
`

const MultiselectStack = styled(Stack)`
overflow: hidden;
max-width: 100%;
height: 100%;
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
  refPlusTag,
  displayShadowCopy,
}: DisplayValuesProps) => {
  const { multiselect, selectedData, setSelectedData, options, onChange } =
    useSelectInput()

  return multiselect ? (
    <MultiselectStack
      alignItems="center"
      direction="row"
      gap="1"
      ref={refTag}
      wrap="nowrap"
    >
      {/* Hidden div to measure the width of the tags */}
      {displayShadowCopy ? (
        <div
          ref={measureRef}
          style={{
            position: 'absolute',
          }}
        >
          {potentiallyNonOverflowedValues.map(option => (
            <CustomTag
              className={option.value}
              hidden
              key={option.value}
              onClose={() => {}}
            >
              {option?.label}
            </CustomTag>
          ))}
        </div>
      ) : null}
      {nonOverflowedValues.map((option, index) => (
        <CustomTag
          data-testid="selected-options-tags"
          disabled={disabled}
          key={option?.value}
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
                    clickedOption: option,
                    type: 'selectOption',
                  })
                  const newSelectedValues = selectedData.selectedValues?.filter(
                    val => val !== option.value,
                  )
                  onChange?.(newSelectedValues)
                }
              : undefined
          }
          sentiment="neutral"
        >
          {option?.label}
        </CustomTag>
      ))}

      {overflowed ? (
        <Stack justifyContent="center" ref={refPlusTag}>
          <PlusTag
            aria-label="Plus tag"
            data-testid="plus-tag"
            disabled={disabled}
            key="+"
            sentiment="neutral"
          >
            <PlusIcon size="xsmall" />
            {overflowAmount}
          </PlusTag>
        </Stack>
      ) : null}
    </MultiselectStack>
  ) : (
    <SelectedValues
      as="div"
      disabled={disabled}
      prominence="default"
      sentiment="neutral"
      variant={size === 'large' ? 'body' : 'bodySmall'}
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
  dropdownId,
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
  const [displayShadowCopy, setDisplayShadowCopy] = useState(false)
  const refTag = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)
  const refPlusTag = useRef<HTMLDivElement>(null)
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

  const potentiallyNonOverflowedValues = useMemo(
    () =>
      selectedData.selectedValues
        .map(selectedValue => findOptionInOptions(options, selectedValue))
        .filter((option): option is OptionType => !!option),
    [options, selectedData.selectedValues],
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

  // First we display shadow copy of tags to render it
  useEffect(() => {
    setDisplayShadowCopy(true)
  }, [selectedData.selectedValues.length])

  const getWidth = useCallback(() => {
    if (refTag.current) {
      return refTag.current.offsetWidth
    }

    return (
      innerRef.current?.offsetWidth ??
      0 - (arrowRef.current?.offsetWidth ?? 0) - SIZES_TAG.paddings
    )
  }, [innerRef.current?.offsetWidth])
  // We then want to measure the tags length before displaying them
  // so we can determine if there is an overflow or not
  // We use useLayoutEffect to ensure the measurement is done before the browser paints
  useLayoutEffect(() => {
    if (selectedData.selectedValues.length === 0) {
      setOverflowAmount(0)
      setNonOverFlowedValues([])
    }

    if (measureRef.current && selectedData.selectedValues.length > 0) {
      const toMeasureElements: HTMLCollection = measureRef.current.children
      const toMeasureElementsArray = [...toMeasureElements]
      const innerWidth = getWidth()

      const {
        measuredVisibleTags,
        measuredHiddenTags,
        accumulatedWidth,
        lastVisibleElementWidth,
        lastVisibleLabel,
      } = toMeasureElementsArray.reduce(
        (
          accumulator: {
            measuredVisibleTags: OptionType[]
            measuredHiddenTags: number
            accumulatedWidth: number
            lastVisibleElementWidth: number
            lastVisibleLabel: ReactNode
          },
          currentValue,
          index,
        ) => {
          const elementWidth = (currentValue as HTMLDivElement).offsetWidth

          const newAccumulatedWidth =
            accumulator.accumulatedWidth + elementWidth + SIZES_TAG.gap

          const canBeVisible = newAccumulatedWidth <= innerWidth

          return {
            accumulatedWidth: !canBeVisible
              ? accumulator.accumulatedWidth
              : newAccumulatedWidth,
            lastVisibleElementWidth: canBeVisible
              ? elementWidth
              : accumulator.lastVisibleElementWidth,
            lastVisibleLabel: canBeVisible
              ? potentiallyNonOverflowedValues[index].label
              : accumulator.lastVisibleLabel,
            measuredHiddenTags:
              accumulator.measuredHiddenTags + (!canBeVisible ? 1 : 0),
            measuredVisibleTags: [
              ...accumulator.measuredVisibleTags,
              canBeVisible && potentiallyNonOverflowedValues[index],
            ].filter(Boolean) as OptionType[],
          }
        },
        {
          accumulatedWidth: 0,
          lastVisibleElementWidth: 0,
          lastVisibleLabel: '',
          measuredHiddenTags: 0,
          measuredVisibleTags: [],
        },
      )

      const additionnalElementsWidth =
        SIZES_TAG.paddings + (refPlusTag.current?.offsetWidth ?? 0)
      const finalWidth =
        accumulatedWidth + (measuredHiddenTags ? additionnalElementsWidth : 0)

      const overflowPx = finalWidth - innerWidth
      const hasOverflow = overflowPx > 0
      const hasHiddenTags = measuredHiddenTags > 0
      const lastVisibleElementMaxSize = lastVisibleElementWidth - overflowPx

      // If only one element is selected and it is hidden, we need to show it
      if (measuredHiddenTags === 1 && measuredVisibleTags.length === 0) {
        setOverflowAmount(0)
        setNonOverFlowedValues([potentiallyNonOverflowedValues[0]])

        const newOverflowPx =
          lastVisibleElementWidth +
          (measuredHiddenTags > 1 ? additionnalElementsWidth : 0) -
          innerWidth
        setLastElementMaxWidth(lastVisibleElementWidth - newOverflowPx)
        setOverflow(true)
      }

      // If it overflows with the last tag, we need to add an ellipsis to the last element if there is enough space (>60px)
      // and if it is a string (do not cut ReactNode label)
      // else we hide it completely and add it to the overflow amount
      else if (
        hasOverflow &&
        hasHiddenTags &&
        (lastVisibleElementMaxSize > 65 ||
          (measuredVisibleTags.length === 1 &&
            lastVisibleElementMaxSize > 65)) &&
        typeof lastVisibleLabel === 'string'
      ) {
        setLastElementMaxWidth(lastVisibleElementMaxSize)
        setOverflow(true)
        setOverflowAmount(measuredHiddenTags)
        setNonOverFlowedValues(measuredVisibleTags)
      } else if (hasOverflow && hasHiddenTags) {
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
    setDisplayShadowCopy(false)
  }, [
    displayShadowCopy,
    potentiallyNonOverflowedValues,
    selectedData.selectedValues.length,
    getWidth,
  ])

  useEffect(() => {
    setSelectedData({ type: 'update' })
  }, [setSelectedData, options])

  const shouldDisplayValues = useMemo(() => {
    if (multiselect) {
      return (
        potentiallyNonOverflowedValues.length > 0 ||
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
    options,
    potentiallyNonOverflowedValues.length,
    selectedData.selectedValues,
  ])

  return (
    <Tooltip text={tooltip}>
      <StyledInputWrapper
        aria-controls={dropdownId}
        aria-expanded={isDropdownVisible}
        aria-label={label}
        autoFocus={autoFocus}
        data-disabled={disabled}
        data-dropdownvisible={isDropdownVisible}
        data-readonly={readOnly}
        data-size={size}
        data-state={state}
        data-testid={dataTestId}
        id={id}
        onClick={
          openable ? () => setIsDropdownVisible(!isDropdownVisible) : undefined
        }
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
        role="combobox"
        tabIndex={0}
      >
        {shouldDisplayValues ? (
          <DisplayValues
            disabled={disabled}
            displayShadowCopy={displayShadowCopy}
            lastElementMaxWidth={lastElementMaxWidth}
            measureRef={measureRef}
            nonOverflowedValues={nonOverflowedValues}
            overflow={overflow}
            overflowAmount={overflowAmount}
            overflowed={!!overflowAmount}
            potentiallyNonOverflowedValues={potentiallyNonOverflowedValues}
            readOnly={readOnly}
            refPlusTag={refPlusTag}
            refTag={refTag}
            size={size}
          />
        ) : (
          <Placeholder
            as="p"
            disabled={disabled}
            prominence="weak"
            sentiment="neutral"
            variant={size === 'large' ? 'body' : 'bodySmall'}
          >
            {placeholder}
          </Placeholder>
        )}
        <StateStack alignItems="center" direction="row" gap={1} ref={arrowRef}>
          {error ? <AlertCircleIcon sentiment="danger" /> : null}
          {success && !error ? <CheckCircleIcon sentiment="success" /> : null}
          {clearable && selectedData.selectedValues.length > 0 ? (
            <Button
              aria-label="clear value"
              data-testid="clear-all"
              disabled={disabled || !selectedData.selectedValues[0] || readOnly}
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
              size="small"
              variant="ghost"
            >
              <CloseIcon />
            </Button>
          ) : null}
          <ArrowDownIcon
            aria-label="show dropdown"
            disabled={disabled || readOnly}
            sentiment="neutral"
            size="small"
          />
        </StateStack>
      </StyledInputWrapper>
    </Tooltip>
  )
}

export { SelectBar, StyledInputWrapper }
