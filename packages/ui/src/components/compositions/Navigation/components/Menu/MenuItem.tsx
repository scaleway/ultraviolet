import { OpenInNewIcon } from '@ultraviolet/icons/OpenInNewIcon'
import { cn } from '@ultraviolet/utils'
import { Menu } from '../../../../Menu'
import { Stack } from '../../../../Stack'
import { Text } from '../../../../Text'
import { useNavigation } from '../../NavigationProvider'
import { navigationStyle } from '../../styles.css'
import type { ItemMenuItemType } from '../ComponentsTypes'
import { ItemBadge } from '../Item/Badge'
import { ItemPinnedButton } from '../Item/PinnedButton'

export const ItemMenuItem = ({
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
  label,
  badgeText,
  badgeSentiment,
  hasHrefAndNoChildren,
  pinTooltipLocale,
  isItemPinned,
  isPinDisabled,
  onClickPinUnpin,
  id,
}: ItemMenuItemType) => {
  const context = useNavigation()
  if (!context) {
    throw new Error(
      'Navigation.Item can only be used inside a NavigationProvider.',
    )
  }

  const { pinnedFeature, animation, shouldAnimate, animationType } = context

  const computedAnimation = animation === 'collapse' ? 'collapse' : 'expand'

  return (
    <Menu.Item
      active={active}
      borderless
      className={cn(
        navigationStyle.itemMenu,
        pinnedFeature && shouldShowPinnedButton
          ? navigationStyle.itemMenuPinned
          : '',
      )}
      data-testid={id}
      disabled={disabled}
      href={href}
      // pinnedFeature={pinnedFeature}
      onClick={() => onToggle?.(!!active)}
      rel={rel}
      sentiment={active ? 'primary' : 'neutral'}
      style={style}
      target={target}
    >
      <Stack
        alignItems="center"
        direction="row"
        flex={1}
        gap={1}
        justifyContent="space-between"
        width="100%"
      >
        {animation ? null : (
          <Text
            as="span"
            className={navigationStyle.itemWrapText({
              disabled,
              weak: hasActiveChildren && !noExpand && !disabled && !!active,
            })}
            variant="bodySmall"
            whiteSpace="pre-wrap"
          >
            {label}
          </Text>
        )}
        {labelDescription ? (
          <span className={navigationStyle.itemPadded}>{labelDescription}</span>
        ) : null}
        <Stack direction="row">
          <ItemBadge
            animation={!!animation}
            badgeSentiment={badgeSentiment}
            badgeText={badgeText}
            disabled={disabled}
          />
          {hasHrefAndNoChildren && target === '_blank' ? (
            <OpenInNewIcon
              className={navigationStyle.itemAnimatedIcon({
                animated: shouldAnimate && animationType === 'complex',
                animation: computedAnimation,
              })}
              disabled={disabled}
              prominence="weak"
              sentiment="neutral"
            />
          ) : null}
          <ItemPinnedButton
            active={active}
            id={id}
            isItemPinned={isItemPinned}
            isPinDisabled={isPinDisabled}
            onClickPinUnpin={onClickPinUnpin}
            pinTooltipLocale={pinTooltipLocale}
            shouldShowPinnedButton={shouldShowPinnedButton}
          />
        </Stack>
      </Stack>
    </Menu.Item>
  )
}
