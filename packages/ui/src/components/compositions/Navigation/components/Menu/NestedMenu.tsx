import { Menu } from '../../../../Menu'
import { navigationStyle } from '../../styles.css'
import type { ItemMenuItemType, ItemMenuType } from '../ComponentsTypes'
import { ItemProvider } from '../Item/ItemProvider'
import { ItemMenuItem } from './MenuItem'

export const NestedMenu = ({
  children,
  label,
  active,
  shouldShowPinnedButton,
  disabled,
  href,
  onToggle,
  rel,
  style,
  target,
  hasActiveChildren,
  noExpand,
  labelDescription,
  badgeText,
  badgeSentiment,
  hasHrefAndNoChildren,
  pinTooltipLocale,
  isItemPinned,
  isPinDisabled,
  onClickPinUnpin,
  id,
}: ItemMenuType & ItemMenuItemType) => (
  <Menu
    className={navigationStyle.itemMenuContainer}
    disclosure={
      <ItemMenuItem
        active={active}
        badgeSentiment={badgeSentiment}
        badgeText={badgeText}
        disabled={disabled}
        hasActiveChildren={hasActiveChildren}
        hasHrefAndNoChildren={hasHrefAndNoChildren}
        href={href}
        id={id}
        isItemPinned={isItemPinned}
        isPinDisabled={isPinDisabled}
        label={label}
        labelDescription={labelDescription}
        noExpand={noExpand}
        onClickPinUnpin={onClickPinUnpin}
        onToggle={onToggle}
        pinTooltipLocale={pinTooltipLocale}
        rel={rel}
        shouldShowPinnedButton={shouldShowPinnedButton}
        style={style}
        target={target}
      />
    }
    dynamicDomRendering={false} // As we parse the children we don't need dynamic rendering
    placement="right"
    triggerMethod="hover"
  >
    <Menu.Group label={label}>
      <ItemProvider>{children}</ItemProvider>
    </Menu.Group>
  </Menu>
)
