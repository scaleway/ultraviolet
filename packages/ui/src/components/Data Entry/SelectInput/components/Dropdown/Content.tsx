'use client'

import { PlusIcon } from '@ultraviolet/icons/PlusIcon'
import { useEffect, useId, useRef, useState } from 'react'
import type { KeyboardEvent, ReactNode, RefObject } from 'react'
import { Skeleton } from '../../../../Feedback/Skeleton'
import { Stack } from '../../../../Layout/Stack'
import { VisuallyHidden } from '../../../../Other/VisuallyHidden'
import { Text } from '../../../../Typography/Text'
import { OPTION_SELECTOR } from '../../constants'
import { useSelectInput } from '../../SelectInputProvider'
import type { OptionType } from '../../types'
import { AddOption } from './AddOption'
import { Group } from './Group'
import { Item } from './Item'
import { SelectAll } from './SelectAll'
import { selectInputStyle } from '../../styles.css'

type CreateDropdownProps = {
  isEmpty: boolean
  emptyState: ReactNode
  descriptionDirection: 'row' | 'column'
  loadMore?: ReactNode
  optionalInfoPlacement: 'left' | 'right'
  defaultSearchValue: string | null
  isLoading?: boolean
  groupError?: Record<string, ReactNode>
  groupEmptyState?: Record<string, ReactNode>
  addOption?: { text: string; onClick: (searchText: string) => void }
  searchable?: boolean
  initialFocusRef: RefObject<HTMLDivElement | null>
  listboxId: string
  listboxLabelledBy?: string
}

const moveFocusDown = () => {
  const options = document.querySelectorAll<HTMLElement>(OPTION_SELECTOR)
  const activeItem = document.activeElement
  if (options) {
    for (let i = 0; i < options?.length; i += 1) {
      const listLength = options.length
      if (activeItem === options[i] && activeItem !== options[listLength - 1]) {
        options[i + 1].focus()
      }
    }
  }
}
const moveFocusUp = () => {
  const options = document.querySelectorAll<HTMLElement>(OPTION_SELECTOR)
  const activeItem = document.activeElement

  if (options) {
    for (let i = 0; i < options.length; i += 1) {
      if (activeItem === options[i] && activeItem !== options[0]) {
        options[i - 1].focus()
      }
    }
  }
}
const handleKeyDownSelect = (event: KeyboardEvent<HTMLDivElement>) => {
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    moveFocusDown()
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault()
    moveFocusUp()
  }

  if (event.key === ' ') {
    // No scroll
    event.preventDefault()
  }
}

export const CreateDropdown = ({
  isEmpty,
  emptyState,
  descriptionDirection,
  loadMore,
  optionalInfoPlacement,
  defaultSearchValue,
  isLoading,
  groupEmptyState,
  groupError,
  addOption,
  searchable,
  initialFocusRef,
  listboxId,
  listboxLabelledBy,
}: CreateDropdownProps) => {
  const { displayedOptions, searchInput, size, selectedData } = useSelectInput()
  const focusedItemRef = useRef<HTMLDivElement>(null)
  const [focusedOptionValue, setFocusedOptionValue] = useState<string | null>(null)
  const initialFocusOptions = Array.isArray(displayedOptions)
    ? displayedOptions
    : Object.entries(displayedOptions).flatMap(([group, groupOptions]) => (groupError?.[group] ? [] : groupOptions))
  const initialFocusOption =
    initialFocusOptions.find(option => !option.disabled && selectedData.selectedValues.includes(option.value)) ??
    initialFocusOptions.find(option => !option.disabled)

  const listBoxLabelId = useId()
  useEffect(() => {
    if (defaultSearchValue && focusedItemRef?.current) {
      focusedItemRef.current.focus()
    }
  }, [defaultSearchValue])

  const textVariant = size === 'large' ? 'body' : 'bodySmall'

  const sizeVariantIcon = size === 'small' ? 'xsmall' : 'small'

  const getItemRef = (option: OptionType, isFirstSelected: boolean) => {
    if (option.value === defaultSearchValue || option.searchText === defaultSearchValue) {
      return focusedItemRef
    }

    return isFirstSelected ? initialFocusRef : undefined
  }

  const computedEmptyState = emptyState ?? (
    <Text as="p" variant={size === 'small' ? 'bodySmallStrong' : 'bodyStrong'}>
      No options
    </Text>
  )

  const addOptionLabel = (
    <Stack alignItems="center" direction="row" gap="1">
      <PlusIcon sentiment="primary" size={sizeVariantIcon} />
      <Text as="span" sentiment="primary" variant="bodySmallStrong">
        {addOption?.text} {searchInput}
      </Text>
    </Stack>
  )

  if (isLoading) {
    return (
      <Stack
        className={selectInputStyle.dropdownContainer}
        id={listboxId}
        aria-labelledby={listboxLabelledBy ?? listBoxLabelId}
        onKeyDown={handleKeyDownSelect}
        role="listbox"
      >
        {!listBoxLabelId ? <VisuallyHidden id={listBoxLabelId}>Options</VisuallyHidden> : null}
        <Skeleton variant="block" />
      </Stack>
    )
  }

  if (isEmpty && !addOption) {
    return (
      <Stack
        alignItems="center"
        className={selectInputStyle.dropdownEmptyState}
        gap={2}
        id={listboxId}
        aria-labelledby={listboxLabelledBy ?? listBoxLabelId}
        role="listbox"
      >
        {!listBoxLabelId ? <VisuallyHidden id={listBoxLabelId}>Options</VisuallyHidden> : null}
        {computedEmptyState}
      </Stack>
    )
  }

  if (isEmpty && addOption && searchable) {
    const option = {
      label: addOptionLabel,
      searchText: searchInput,
      value: `${addOption.text} ${searchInput}`,
    }

    return (
      <Stack id={listboxId} aria-labelledby={listboxLabelledBy ?? listBoxLabelId} role="listbox">
        {!listBoxLabelId ? <VisuallyHidden id={listBoxLabelId}>Options</VisuallyHidden> : null}
        <AddOption
          addOption={addOption}
          isEmpty={isEmpty}
          option={option}
          searchable={searchable}
          textVariant={textVariant}
        />
      </Stack>
    )
  }

  return Array.isArray(displayedOptions) ? (
    <Stack
      className={selectInputStyle.dropdownContainer}
      id={listboxId}
      aria-labelledby={listboxLabelledBy ?? listBoxLabelId}
      onKeyDown={handleKeyDownSelect}
      role="listbox"
    >
      {!listBoxLabelId ? <VisuallyHidden id={listBoxLabelId}>Options</VisuallyHidden> : null}
      <AddOption
        addOption={addOption}
        option={{
          label: addOptionLabel,
          searchText: searchInput,
          value: `${addOption?.text} ${searchInput}`,
        }}
        searchable={searchable}
        textVariant={textVariant}
      />
      <SelectAll textVariant={textVariant} />

      <Stack gap={0.25} data-type="items" className={selectInputStyle.dropdownSection}>
        {displayedOptions.map((option, index) => {
          const isFirstSelected = option.value === selectedData.selectedValues[0]
          return (
            <Item
              descriptionDirection={descriptionDirection}
              defaultSearchValue={defaultSearchValue}
              focusedItemRef={focusedItemRef}
              indexOption={index}
              isActive={focusedOptionValue === option.value}
              initialFocusRef={isFirstSelected ? initialFocusRef : undefined}
              key={option.value}
              onFocus={() => setFocusedOptionValue(option.value)}
              option={option}
              optionalInfoPlacement={optionalInfoPlacement}
              ref={getItemRef(option, isFirstSelected)}
              textVariant={textVariant}
            />
          )
        })}
        {loadMore ? <Stack className={selectInputStyle.dropdownLoadMore}>{loadMore}</Stack> : null}
      </Stack>
    </Stack>
  ) : (
    <Stack
      className={selectInputStyle.dropdownContainer}
      data-grouped
      id={listboxId}
      aria-labelledby={listboxLabelledBy ?? listBoxLabelId}
      onKeyDown={handleKeyDownSelect}
      role="listbox"
    >
      {!listBoxLabelId ? <VisuallyHidden id={listBoxLabelId}>Options</VisuallyHidden> : null}
      <AddOption
        addOption={addOption}
        option={{
          label: addOptionLabel,
          searchText: searchInput,
          value: `${addOption?.text} ${searchInput}`,
        }}
        searchable={searchable}
        textVariant={textVariant}
      />
      <SelectAll textVariant={textVariant} />

      {Object.keys(displayedOptions).map((group, index) => {
        const hasElements = displayedOptions[group].length > 0
        const emptyStateGroup = groupEmptyState?.[group] ?? null
        const errorGroup = groupError?.[group] ?? null

        return hasElements || emptyStateGroup ? (
          <Stack gap={0.25} key={group} className={selectInputStyle.dropdownSection}>
            <Group group={group} index={index} />
            <Stack gap="0.25" data-type="items">
              {!hasElements && emptyStateGroup ? (
                <Text
                  as="span"
                  className={selectInputStyle.emptyStateGroupStyle}
                  prominence="weak"
                  sentiment="neutral"
                  variant={textVariant}
                >
                  {emptyStateGroup}
                </Text>
              ) : null}
              {errorGroup ? (
                <Text
                  as="span"
                  className={selectInputStyle.emptyStateGroupStyle}
                  sentiment="danger"
                  variant={textVariant}
                >
                  {errorGroup}
                </Text>
              ) : null}
              {displayedOptions[group].map((option, indexOption) =>
                errorGroup ? null : (
                  <Item
                    descriptionDirection={descriptionDirection}
                    group={group}
                    indexOption={indexOption}
                    isActive={focusedOptionValue === option.value}
                    initialFocusRef={initialFocusOption?.value === option.value ? initialFocusRef : undefined}
                    key={option.value}
                    onFocus={() => setFocusedOptionValue(option.value)}
                    option={option}
                    optionalInfoPlacement={optionalInfoPlacement}
                    ref={getItemRef(option, isFirstSelected)}
                    textVariant={textVariant}
                  />
                ),
              )}
            </Stack>
          </Stack>
        ) : null
      })}
      {loadMore ? <Stack className={selectInputStyle.dropdownLoadMore}>{loadMore}</Stack> : null}
    </Stack>
  )
}
