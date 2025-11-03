'use client'

import { PinCategoryIcon } from '@ultraviolet/icons/category'
import { useTheme } from '@ultraviolet/themes'
import { Text } from '@ultraviolet/ui'
import type { CSSProperties, DragEvent, ReactElement } from 'react'
import { useCallback } from 'react'
import { useNavigation } from '../NavigationProvider'
import type { DragNDropData } from '../types'
import { Item } from './Item'
import {
  navigationPinnedItemContainer,
  navigationPinnedItemDropableArea,
  navigationPinnedItemRelativeDiv,
} from './styles.css'

type PinnedItemsProps = {
  /**
   * This prop is used to control if the item is expanded or collapsed
   */
  toggle?: boolean
  /**
   * This function will be triggered on click of the item. If the item is expandable
   * toggle will be passed with it.
   */
  onToggle?: (toggle: boolean) => void
  /**
   * This function will be called when the user reorder the pinned items
   */
  onReorder?: (pinnedItems: string[]) => void
  /**
   * Use this prop if it is needed to wrap each PinnedItem component into another component (eg NavLink)
   */
  itemWrapper?: (item: ReactElement, itemId: string) => ReactElement
  style?: CSSProperties
}

export const PinnedItems = ({
  toggle = true,
  onReorder,
  onToggle,
  itemWrapper,
  style,
}: PinnedItemsProps) => {
  const context = useNavigation()

  if (!context) {
    throw new Error(
      'Navigation.PinnedItems can only be used inside a NavigationProvider.',
    )
  }

  const {
    locales,
    pinnedItems,
    pinnedFeature,
    reorderItems,
    expanded,
    items,
    animation,
  } = context
  const theme = useTheme()

  const onDrop = useCallback(
    (event: DragEvent<HTMLDivElement>, index: number) => {
      event.preventDefault()
      if (event?.dataTransfer) {
        // eslint-disable-next-line no-param-reassign
        event.currentTarget.style.borderColor = 'transparent'
        const data = JSON.parse(
          event.dataTransfer.getData('text'),
        ) as DragNDropData
        if (data.index === index - 1 || index > data.index) {
          const newItems = reorderItems(data.index, index - 1)
          onReorder?.(newItems)

          return
        }
        const newItems = reorderItems(data.index, index)
        onReorder?.(newItems)
      }
    },
    [onReorder, reorderItems],
  )

  const onDragOver = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      // eslint-disable-next-line no-param-reassign
      event.currentTarget.style.borderColor = theme.colors.primary.border
    },
    [theme.colors.primary.border],
  )

  const onDragLeave = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    // eslint-disable-next-line no-param-reassign
    event.currentTarget.style.borderColor = 'transparent'
  }, [])

  if (Object.keys(items).length === 0) {
    return null
  }

  if (pinnedFeature) {
    return (
      <div style={{ width: animation ? '100%' : undefined, ...style }}>
        <Item
          categoryIcon={<PinCategoryIcon variant="neutral" />}
          data-testid="pinned-group"
          id="pinned-group"
          label={locales['navigation.pinned.item.group.label']}
          onToggle={onToggle}
          toggle={toggle}
          type="pinnedGroup"
        >
          {pinnedItems.length > 0 ? (
            pinnedItems.map((itemId, index) => {
              if (items[itemId]?.label) {
                const itemElement = (
                  <Item
                    active={items[itemId]?.active ?? false}
                    id={itemId}
                    index={index}
                    label={items[itemId].label}
                    onClickPinUnpin={
                      items[itemId]?.onClickPinUnpin ?? undefined
                    }
                    onToggle={items[itemId]?.onToggle}
                    toggle={toggle}
                    type="pinned"
                  />
                )

                return (
                  <div className={navigationPinnedItemRelativeDiv} key={itemId}>
                    <div
                      className={navigationPinnedItemDropableArea}
                      onDragLeave={onDragLeave}
                      onDragOver={onDragOver}
                      onDrop={event => onDrop(event, index)}
                    />
                    {itemWrapper
                      ? itemWrapper(itemElement, itemId)
                      : itemElement}
                  </div>
                )
              }

              return null
            })
          ) : (
            <div className={navigationPinnedItemContainer({ expanded })}>
              <Text
                as="p"
                prominence="weak"
                sentiment="neutral"
                variant="caption"
              >
                {locales['navigation.pinned.item.group.empty']}
              </Text>
            </div>
          )}

          <div className={navigationPinnedItemRelativeDiv}>
            <div
              className={navigationPinnedItemDropableArea}
              onDragLeave={onDragLeave}
              onDragOver={onDragOver}
              onDrop={event => onDrop(event, pinnedItems.length)}
            />
          </div>
        </Item>
      </div>
    )
  }

  return null
}
