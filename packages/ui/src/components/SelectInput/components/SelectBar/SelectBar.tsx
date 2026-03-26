'use client'

import { AlertCircleIcon } from '@ultraviolet/icons/AlertCircleIcon'
import { ArrowDownIcon } from '@ultraviolet/icons/ArrowDownIcon'
import { CheckCircleIcon } from '@ultraviolet/icons/CheckCircleIcon'
import { CloseIcon } from '@ultraviolet/icons/CloseIcon'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { Button } from '../../../Button'
import { Stack } from '../../../Stack'
import { Text } from '../../../Text'
import { Tooltip } from '../../../Tooltip'
import { SIZES_TAG } from '../../constants'
import { findOptionInOptions } from '../../findOptionInOptions'
import { useSelectInput } from '../../SelectInputProvider'
import { selectInputStyle } from '../../styles.css'
import { computeOverflowVars, getTagsWidth } from '../helpers'

import { DisplayValues } from './Values'

import type { OptionType } from '../../types'
import type { RefObject } from 'react'

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
      const innerWidth = getWidth()
      const tagsWidth = getTagsWidth(
        [...measureRef.current.children],
        innerWidth,
        potentiallyNonOverflowedValues,
      )

      const additionnalElementsWidth =
        SIZES_TAG.paddings + (refPlusTag.current?.offsetWidth ?? 0)

      const overflowPx =
        tagsWidth.accumulatedWidth +
        (tagsWidth.measuredHiddenTags ? additionnalElementsWidth : 0) -
        innerWidth

      const hasOverflow = overflowPx > 0
      const hasHiddenTags = tagsWidth.measuredHiddenTags > 0
      const lastVisibleElementMaxSize =
        tagsWidth.lastVisibleElementWidth - overflowPx

      const overflowVars = computeOverflowVars(
        tagsWidth,
        hasOverflow,
        lastVisibleElementMaxSize,
        hasHiddenTags,
        potentiallyNonOverflowedValues,
        additionnalElementsWidth,
      )
      setOverflowAmount(overflowVars.overflowAmount)
      setNonOverFlowedValues(overflowVars.nonOverflowedValues)
      setLastElementMaxWidth(overflowVars.lastElementMaxWidth)
      setOverflow(overflowVars.hasOverflow)
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

  const textVariant = useMemo(() => {
    if (size === 'large') {
      return 'body'
    }
    if (size === 'medium') {
      return 'bodySmall'
    }

    return 'caption'
  }, [size])

  return (
    <Tooltip disableAnimation text={tooltip}>
      <div
        aria-controls={dropdownId}
        aria-expanded={isDropdownVisible}
        aria-label={label}
        // oxlint-disable-next-line jsx_a11y/no-autofocus
        autoFocus={autoFocus}
        className={selectInputStyle.selectBar({
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
            if (isDropdownVisible) {
              document.getElementById('option-0')?.focus()
            } else {
              setIsDropdownVisible(true)
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
            textVariant={textVariant}
          />
        ) : (
          <Text
            as="span"
            className={selectInputStyle.placeholder}
            disabled={disabled}
            prominence="weak"
            sentiment="neutral"
            variant={textVariant}
          >
            {placeholder}
          </Text>
        )}
        <Stack
          alignItems="center"
          className={
            selectInputStyle.selectbarState[size === 'medium' ? 'small' : size]
          }
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
