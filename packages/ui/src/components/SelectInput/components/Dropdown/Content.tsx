'use client'

import { PlusIcon } from '@ultraviolet/icons/PlusIcon'
import { cn } from '@ultraviolet/utils'
import { useEffect, useMemo, useRef } from 'react'

import { Skeleton } from '../../../Skeleton'
import { Stack } from '../../../Stack'
import { Text } from '../../../Text'
import { OPTION_SELECTOR } from '../../constants'
import { useSelectInput } from '../../SelectInputProvider'
import { selectInputStyle } from '../../styles.css'

import { AddOption } from './AddOption'
import { Group } from './Group'
import { Item } from './Item'
import { SelectAll } from './SelectAll'

import type { KeyboardEvent, ReactNode } from 'react'

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
}

const moveFocusDown = () => {
  const options = document.querySelectorAll(OPTION_SELECTOR)
  const activeItem = document.activeElement
  if (options) {
    for (let i = 0; i < options?.length; i += 1) {
      const listLength = options.length
      if (activeItem === options[i] && activeItem !== options[listLength - 1]) {
        ;(options[i + 1] as HTMLElement).focus()
      }
    }
  }
}
const moveFocusUp = () => {
  const options = document.querySelectorAll(OPTION_SELECTOR)
  const activeItem = document.activeElement

  if (options) {
    for (let i = 0; i < options.length; i += 1) {
      if (activeItem === options[i] && activeItem !== options[0]) {
        ;(options[i - 1] as HTMLElement).focus()
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
}: CreateDropdownProps) => {
  const { displayedOptions, searchInput, size } = useSelectInput()
  const focusedItemRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (defaultSearchValue && focusedItemRef?.current) {
      focusedItemRef.current.focus()
    }
  }, [defaultSearchValue])

  const textVariant = useMemo(() => {
    if (size === 'large') {
      return 'body'
    }
    if (size === 'medium') {
      return 'bodySmall'
    }

    return 'caption'
  }, [size])

  const textVariantSmall =
    size === 'small' ? 'captionStrong' : 'bodySmallStrong'
  const sizeVariantIcon = size === 'small' ? 'xsmall' : 'small'

  const computedEmptyState = emptyState ?? (
    <Text as="p" variant={size === 'small' ? 'bodySmallStrong' : 'bodyStrong'}>
      No options
    </Text>
  )

  const addOptionLabel = (
    <Stack alignItems="center" direction="row" gap="1">
      <PlusIcon sentiment="primary" size={sizeVariantIcon} />
      <Text as="span" sentiment="primary" variant={textVariantSmall}>
        {addOption?.text} {searchInput}
      </Text>
    </Stack>
  )

  if (isEmpty && !addOption) {
    return (
      <Stack
        alignItems="center"
        className={selectInputStyle.dropdownEmptyState}
        gap={2}
      >
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
      <AddOption
        addOption={addOption}
        isEmpty={isEmpty}
        option={option}
        searchable={searchable}
        textVariant={textVariant}
      />
    )
  }

  return Array.isArray(displayedOptions) ? (
    <Stack
      className={cn(
        selectInputStyle.dropdownContainer,
        selectInputStyle.dropdownContainerUnGrouped,
      )}
      gap={0.25}
      id="select-dropdown"
      onKeyDown={handleKeyDownSelect}
      role="listbox"
    >
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
      <Stack gap={0.25} id="items">
        {isLoading ? (
          <Skeleton variant="block" />
        ) : (
          displayedOptions.map((option, index) => (
            <Item
              defaultSearchValue={defaultSearchValue}
              descriptionDirection={descriptionDirection}
              focusedItemRef={focusedItemRef}
              indexOption={index}
              key={option.value}
              option={option}
              optionalInfoPlacement={optionalInfoPlacement}
              textVariant={textVariant}
            />
          ))
        )}
        {loadMore ? (
          <Stack className={selectInputStyle.dropdownLoadMore}>
            {loadMore}
          </Stack>
        ) : null}
      </Stack>
    </Stack>
  ) : (
    <Stack
      className={selectInputStyle.dropdownContainer}
      data-grouped
      id="select-dropdown"
      onKeyDown={handleKeyDownSelect}
      role="listbox"
    >
      {isLoading ? (
        <Skeleton variant="block" />
      ) : (
        <>
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

            return (
              <Stack gap={0.25} key={group}>
                {hasElements || emptyStateGroup ? (
                  <Group group={group} index={index} />
                ) : null}
                <Stack gap="0.25" id="items">
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
                        defaultSearchValue={defaultSearchValue}
                        descriptionDirection={descriptionDirection}
                        focusedItemRef={focusedItemRef}
                        group={group}
                        indexOption={indexOption}
                        key={option.value}
                        option={option}
                        optionalInfoPlacement={optionalInfoPlacement}
                        textVariant={textVariant}
                      />
                    ),
                  )}
                </Stack>
              </Stack>
            )
          })}
        </>
      )}
      {loadMore ? (
        <Stack className={selectInputStyle.dropdownLoadMore}>{loadMore}</Stack>
      ) : null}
    </Stack>
  )
}
