import type { ReactNode } from 'react'
import { SIZES_TAG } from '../constants'
import type {
  DataType,
  OptionType,
  ReducerAction,
  ReducerState,
} from '../types'

export const getTagsWidth = (
  toMeasureElementsArray: Element[],
  innerWidth: number,
  potentiallyNonOverflowedValues: OptionType[],
) =>
  toMeasureElementsArray.reduce(
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
      // oxlint-disable-next-line typescript/no-unsafe-type-assertion
      const elementWidth = (currentValue as HTMLDivElement).offsetWidth

      const newAccumulatedWidth =
        accumulator.accumulatedWidth + elementWidth + SIZES_TAG.gap

      const canBeVisible = newAccumulatedWidth <= innerWidth

      return {
        accumulatedWidth: canBeVisible
          ? newAccumulatedWidth
          : accumulator.accumulatedWidth,
        lastVisibleElementWidth: canBeVisible
          ? elementWidth
          : accumulator.lastVisibleElementWidth,
        lastVisibleLabel: canBeVisible
          ? potentiallyNonOverflowedValues[index].label
          : accumulator.lastVisibleLabel,
        measuredHiddenTags:
          accumulator.measuredHiddenTags + (canBeVisible ? 0 : 1),
        measuredVisibleTags: [
          ...accumulator.measuredVisibleTags,
          ...(canBeVisible ? [potentiallyNonOverflowedValues[index]] : []),
        ],
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

export const computeOverflowVars = (
  tagsWidth: ReturnType<typeof getTagsWidth>,
  hasOverflow: boolean,
  lastVisibleElementMaxSize: number,
  hasHiddenTags: boolean,
  potentiallyNonOverflowedValues: OptionType[],
  additionnalElementsWidth: number,
) => {
  // If only one element is selected and it is hidden, we need to show it
  if (
    tagsWidth.measuredHiddenTags === 1 &&
    tagsWidth.measuredVisibleTags.length === 0
  ) {
    const newOverflowPx =
      tagsWidth.lastVisibleElementWidth +
      (tagsWidth.measuredHiddenTags > 1 ? additionnalElementsWidth : 0) -
      innerWidth
    return {
      overflowAmount: 0,
      nonOverflowedValues: [potentiallyNonOverflowedValues[0]],
      lastElementMaxWidth: tagsWidth.lastVisibleElementWidth - newOverflowPx,
      hasOverflow: true,
    }
  }

  // If it overflows with the last tag, we need to add an ellipsis to the last element if there is enough space (>60px)
  // and if it is a string (do not cut ReactNode label)
  // else we hide it completely and add it to the overflow amount
  if (
    hasOverflow &&
    hasHiddenTags &&
    (lastVisibleElementMaxSize > 65 ||
      (tagsWidth.measuredVisibleTags.length === 1 &&
        lastVisibleElementMaxSize > 65)) &&
    typeof tagsWidth.lastVisibleLabel === 'string'
  ) {
    return {
      overflowAmount: tagsWidth.measuredHiddenTags,
      nonOverflowedValues: tagsWidth.measuredVisibleTags,
      lastElementMaxWidth: lastVisibleElementMaxSize,
      hasOverflow: true,
    }
  }

  if (hasOverflow && hasHiddenTags) {
    return {
      overflowAmount: tagsWidth.measuredHiddenTags + 1,
      nonOverflowedValues: tagsWidth.measuredVisibleTags.slice(0, -1),
      lastElementMaxWidth: 0,
      hasOverflow: false,
    }
  }

  // Otherwise, we have enough space to show all tags
  return {
    overflowAmount: tagsWidth.measuredHiddenTags,
    nonOverflowedValues: tagsWidth.measuredVisibleTags,
    lastElementMaxWidth: lastVisibleElementMaxSize,
    hasOverflow: false,
  }
}

export const computeSelectedDataMultiselect = (
  closestOption: OptionType,
  options: DataType,
  selectedData: ReducerState,
): { computedData: ReducerAction; onChangeData: string[] } => ({
  computedData: {
    clickedOption: closestOption,
    group: Array.isArray(options)
      ? undefined
      : Object.keys(options).find(group =>
          options[group].includes(closestOption),
        ),
    type: 'selectOption',
  },
  onChangeData: selectedData.selectedValues.includes(closestOption.value)
    ? selectedData.selectedValues
    : [...selectedData.selectedValues, closestOption.value],
})

export const computeSelectedDataSingleSelect = (
  closestOption: OptionType,
  selectedData: ReducerState,
): { computedData: ReducerAction; onChangeData: string } => ({
  computedData: {
    clickedOption: closestOption,
    type: 'selectOption',
  },
  onChangeData: selectedData.selectedValues[0] ?? '',
})
