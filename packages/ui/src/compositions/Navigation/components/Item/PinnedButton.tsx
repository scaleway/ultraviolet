import { PinOutlineIcon } from '@ultraviolet/icons/PinOutlineIcon'
import { UnpinIcon } from '@ultraviolet/icons/UnpinIcon'
import { useMemo } from 'react'

import { Tooltip } from '../../../../components/Tooltip'
import { useNavigation } from '../../NavigationProvider'
import { navigationStyle } from '../../styles.css'

import type { ItemExpandedType } from '../ComponentsTypes'
import type { MouseEvent } from 'react'

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
      <div className={navigationStyle.itemRelative}>
        <button
          aria-disabled={isItemPinned ? false : isPinDisabled}
          aria-label={isItemPinned ? 'unpin' : 'pin'}
          className={navigationStyle.itemPinnedButton}
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
            className={
              navigationStyle.itemPinIcon[active ? 'active' : 'inactive']
            }
            disabled={isItemPinned ? false : isPinDisabled}
            sentiment={active ? 'primary' : 'neutral'}
            size="medium"
          />
        </button>
      </div>
    </Tooltip>
  ) : null
}
