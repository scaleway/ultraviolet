'use client'

import { PlusIcon } from '@ultraviolet/icons/PlusIcon'
import { cn } from '@ultraviolet/utils'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { RefObject } from 'react'
import { Stack } from '../../../Stack'
import { Tag } from '../../../Tag'
import { Text } from '../../../Text'
import { findOptionInOptions } from '../../findOptionInOptions'
import { useSelectInput } from '../../SelectInputProvider'
import { selectInputStyle } from '../../styles.css'
import type { OptionType } from '../../types'
import { maxWidthTag, minWidthTag } from './selectBar.css'

type DisplayValuesProps = {
  refTag: RefObject<HTMLDivElement | null>
  nonOverflowedValues: OptionType[]
  potentiallyNonOverflowedValues: OptionType[]
  disabled: boolean
  readOnly: boolean
  overflowed: boolean
  overflowAmount: number
  measureRef: RefObject<HTMLDivElement | null>
  lastElementMaxWidth: number
  overflow?: boolean
  refPlusTag: RefObject<HTMLDivElement | null>
  displayShadowCopy?: boolean
  textVariant: 'body' | 'bodySmall' | 'caption'
}

export const DisplayValues = ({
  refTag,
  nonOverflowedValues,
  potentiallyNonOverflowedValues,
  disabled,
  readOnly,
  overflowed,
  overflowAmount,
  measureRef,
  lastElementMaxWidth,
  overflow,
  refPlusTag,
  displayShadowCopy,
  textVariant,
}: DisplayValuesProps) => {
  const { multiselect, selectedData, setSelectedData, options, onChange } =
    useSelectInput()

  return multiselect ? (
    <Stack
      alignItems="center"
      className={selectInputStyle.multiselectStack}
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
              className={cn(
                option.value,
                selectInputStyle.selectBarTags.hidden,
              )}
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
          className={selectInputStyle.selectBarTags.visible}
          data-testid="selected-options-tags"
          disabled={disabled}
          key={option?.value}
          onClose={
            readOnly
              ? undefined
              : event => {
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
            className={selectInputStyle.plusTag}
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
      className={selectInputStyle.selectedValues}
      disabled={disabled}
      prominence="default"
      sentiment="neutral"
      variant={textVariant}
    >
      {selectedData.selectedValues[0]
        ? findOptionInOptions(options, selectedData.selectedValues[0])?.label
        : null}
    </Text>
  )
}
