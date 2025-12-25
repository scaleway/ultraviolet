'use client'

import {
  AlertCircleIcon,
  ArrowDownIcon,
  CheckCircleIcon,
  CloseIcon,
  PlusIcon,
} from '@ultraviolet/icons'
import { cn } from '@ultraviolet/utils'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { ReactNode, RefObject } from 'react'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { Tag } from '../../Tag'
import { Text } from '../../Text'
import { Tooltip } from '../../Tooltip'
import { findOptionInOptions } from '../findOptionInOptions'
import { useSelectInput } from '../SelectInputProvider'
import type { OptionType } from '../types'
import {
  maxWidthTag,
  minWidthTag,
  multiselectStack,
  plusTag,
  selectBar,
  selectBarTags,
  selectbarState,
  selectedValues,
  selectinputPlaceholder,
} from './selectBar.css'

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
    <Stack
      alignItems="center"
      className={multiselectStack}
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
            <Tag
              className={cn(option.value, selectBarTags.hidden)}
              key={option.value}
              onClose={() => {}}
            >
              {option?.label}
            </Tag>
          ))}
        </div>
      ) : null}
      {nonOverflowedValues.map((option, index) => (
        <Tag
          className={selectBarTags.visible}
          data-testid="selected-options-tags"
          disabled={disabled}
          key={option?.value}
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
          style={
            index === nonOverflowedValues.length - 1 && overflow
              ? assignInlineVars({
                  [minWidthTag]: 'auto',
                  [maxWidthTag]: `${lastElementMaxWidth}px`,
                })
              : undefined
          }
        >
          {option?.label}
        </Tag>
      ))}

      {overflowed ? (
        <Stack justifyContent="center" ref={refPlusTag}>
          <Tag
            aria-label="Plus tag"
            className={plusTag}
            data-testid="plus-tag"
            disabled={disabled}
            key="+"
            sentiment="neutral"
          >
            <PlusIcon size="xsmall" />
            {overflowAmount}
          </Tag>
        </Stack>
      ) : null}
    </Stack>
  ) : (
    <Text
      as="span"
      className={selectedValues}
      disabled={disabled}
      prominence="default"
      sentiment="neutral"
      variant={size === 'large' ? 'body' : 'bodySmall'}
    >
      {selectedData.selectedValues[0]
        ? findOptionInOptions(options, selectedData.selectedValues[0])?.label
        : null}
    </Text>
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
    <Tooltip disableAnimation text={tooltip}>
      <div
        aria-controls={dropdownId}
        aria-expanded={isDropdownVisible}
        aria-label={label}
        autoFocus={autoFocus}
        className={selectBar({
          disabled,
          dropdownVisible: isDropdownVisible,
          readOnly,
          size,
          state,
        })}
        data-disabled={disabled}
        data-readonly={readOnly}
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
          <Text
            as="span"
            className={selectinputPlaceholder}
            disabled={disabled}
            prominence="weak"
            sentiment="neutral"
            variant={size === 'large' ? 'body' : 'bodySmall'}
          >
            {placeholder}
          </Text>
        )}
        <Stack
          alignItems="center"
          className={selectbarState}
          direction="row"
          gap={1}
          ref={arrowRef}
        >
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
              size={size === 'large' ? 'small' : 'xsmall'}
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
        </Stack>
      </div>
    </Tooltip>
  )
}

export { SelectBar }
