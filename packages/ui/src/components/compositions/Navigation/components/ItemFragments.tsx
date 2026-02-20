import { PinOutlineIcon } from '@ultraviolet/icons/PinOutlineIcon'
import { UnpinIcon } from '@ultraviolet/icons/UnpinIcon'
import type { MouseEvent } from 'react'
import { useMemo } from 'react'
import { Badge } from '../../../Badge'
import { Tooltip } from '../../../Tooltip'
import { useNavigation } from '../NavigationProvider'
import type { ItemExpandedType } from './ComponentsTypes'
import {
  navigationItemBadge,
  navigationItemPinIcon,
  navigationItemPinnedButton,
  navigationItemRelative,
} from './items.css'

export const ItemBadge = ({
  badgeText,
  animation,
  disabled,
  badgeSentiment,
}: Pick<ItemExpandedType, 'badgeText' | 'badgeSentiment' | 'disabled'> & {
  animation: boolean
}) =>
  badgeText && !animation ? (
    <Badge
      className={navigationItemBadge}
      disabled={disabled}
      prominence="strong"
      sentiment={badgeSentiment}
      size="small"
    >
      {badgeText}
    </Badge>
  ) : null

export const ItemPinnedButton = ({
  shouldShowPinnedButton,
  isItemPinned,
  pinTooltipLocale,
  isPinDisabled,
  id,
  active,
  onClickPinUnpin,
}: Pick<
  ItemExpandedType,
  | 'shouldShowPinnedButton'
  | 'isItemPinned'
  | 'pinTooltipLocale'
  | 'isPinDisabled'
  | 'id'
  | 'active'
  | 'onClickPinUnpin'
>) => {
  const context = useNavigation()
  if (!context) {
    throw new Error(
      'Navigation.Item can only be used inside a NavigationProvider.',
    )
  }

  const { locales, pinItem, unpinItem, pinnedItems, pinLimit } = context

  const PinUnpinIcon = useMemo(
    () => (isItemPinned ? UnpinIcon : PinOutlineIcon),
    [isItemPinned],
  )

  return shouldShowPinnedButton ? (
    <Tooltip
      placement="right"
      tabIndex={-1}
      text={
        isItemPinned ? locales['navigation.unpin.tooltip'] : pinTooltipLocale
      }
    >
      <div className={navigationItemRelative}>
        <button
          aria-disabled={isItemPinned ? false : isPinDisabled}
          aria-label={isItemPinned ? 'unpin' : 'pin'}
          className={navigationItemPinnedButton}
          onClick={(event: MouseEvent<HTMLButtonElement>) => {
            if (pinnedItems.length < pinLimit || isItemPinned) {
              event.preventDefault()
              event.stopPropagation() // This is to avoid click spread to the parent and change the routing
              let newValue: string[] | undefined
              if (isItemPinned) {
                newValue = unpinItem(id)
              } else {
                newValue = pinItem(id)
              }

              onClickPinUnpin?.({
                id,
                state: isItemPinned ? 'unpin' : 'pin',
                totalPinned: newValue,
              })
            }
          }}
          onKeyDown={() => {}}
          type="button"
        >
          <PinUnpinIcon
            className={navigationItemPinIcon[active ? 'active' : 'inactive']}
            disabled={isItemPinned ? false : isPinDisabled}
            sentiment={active ? 'primary' : 'neutral'}
            size="medium"
          />
        </button>
      </div>
    </Tooltip>
  ) : null
}
