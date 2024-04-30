import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import type { DragEvent } from 'react'
import { useCallback } from 'react'
import { useNavigation } from '../NavigationProvider'
import type { DragNDropData } from '../constants'
import { Item } from './Item'

const DropableArea = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  height: 2px;
  border-top: 2px solid;
  border-color: transparent;
  padding: 4px 0;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: -4px;
    height: 0px;
    width: 0px;
    border: 3px solid;
    border-color: inherit;
    border-radius: ${({ theme }) => theme.radii.circle};
  }
`

type PinnedItemsProps = {
  /**
   * This prop is used to control if the item is expanded or collapsed
   */
  toggle?: boolean
}

export const PinnedItems = ({ toggle = true }: PinnedItemsProps) => {
  const context = useNavigation()

  if (!context) {
    throw new Error(
      'Navigation.PinnedItems can only be used inside a NavigationProvider.',
    )
  }

  const { locales, pinnedItems, pinnedFeature, reorderItems, expanded, items } =
    context
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
          reorderItems(data.index, index - 1)

          return
        }
        reorderItems(data.index, index)
      }
    },
    [reorderItems],
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

  console.log('itemssss:', items)

  if (Object.keys(items).length === 0) {
    return null
  }

  if (pinnedItems.length > 0 && pinnedFeature) {
    return (
      <div>
        <Item
          label={locales['navigation.pinned.item.group.label']}
          categoryIcon="pin"
          categoryIconVariant="neutral"
          toggle={toggle}
          type="pinnedGroup"
          id="pinned-group"
        >
          {pinnedItems.map((itemId, index) => (
            <div
              style={{ position: expanded ? 'relative' : undefined }}
              key={itemId}
            >
              {expanded ? (
                <DropableArea
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={event => onDrop(event, index)}
                />
              ) : null}
              <Item
                label={items[itemId]?.label ?? 'Unknown navigation item'}
                type="pinned"
                index={index}
                toggle={toggle}
                id={itemId}
                active={items[itemId]?.active ?? false}
                onClick={items[itemId]?.onClick ?? undefined}
                hasParents
              />
            </div>
          ))}
          {expanded ? (
            <div style={{ position: 'relative' }}>
              <DropableArea
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={event => onDrop(event, pinnedItems.length)}
              />
            </div>
          ) : null}
        </Item>
      </div>
    )
  }

  return null
}
