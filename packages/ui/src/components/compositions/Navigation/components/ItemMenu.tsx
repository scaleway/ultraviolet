import { OrganizationDashboardCategoryIcon } from '@ultraviolet/icons/category/OrganizationDashboardCategoryIcon'
import { OpenInNewIcon } from '@ultraviolet/icons/OpenInNewIcon'
import { cn } from '@ultraviolet/utils'
import { Children } from 'react'
import { Button } from '../../../Button'
import { Menu } from '../../../Menu'
import { Stack } from '../../../Stack'
import { Text } from '../../../Text'
import { Tooltip } from '../../../Tooltip'
import { useNavigation } from '../NavigationProvider'
import type { ItemMenuItemType, ItemMenuType } from './ComponentsTypes'
import { ItemBadge, ItemPinnedButton } from './ItemFragments'
import { ItemProvider } from './ItemProvider'
import {
  navigationItemAnimatedIcon,
  navigationItemMenu,
  navigationItemMenuContainer,
  navigationItemMenuPinned,
  navigationItemMenuStack,
  navigationItemPadded,
  navigationItemWrapText,
} from './items.css'

export const ItemMenu = ({
  style,
  children,
  label,
  categoryIcon,
  active,
  hasActiveChildren,
}: ItemMenuType) => (
  <Stack
    alignItems="flex-start"
    className={navigationItemMenuStack}
    gap={1}
    justifyContent="flex-start"
    style={style}
  >
    {Children.count(children) > 0 ? (
      <Menu
        className={navigationItemMenuContainer}
        disclosure={
          <Button
            aria-label={label}
            sentiment="neutral"
            size="small"
            variant={hasActiveChildren ? 'filled' : 'ghost'}
          >
            {categoryIcon ? (
              <Stack
                alignItems="center"
                direction="row"
                gap={1}
                justifyContent="center"
              >
                {categoryIcon}
              </Stack>
            ) : null}
          </Button>
        }
        dynamicDomRendering={false} // As we parse the children we don't need dynamic rendering
        placement="right"
        triggerMethod="hover"
      >
        <ItemProvider>{children}</ItemProvider>
      </Menu>
    ) : (
      <Tooltip placement="right" tabIndex={-1} text={label}>
        <Button
          aria-label={label}
          sentiment="neutral"
          size="small"
          variant={active ? 'filled' : 'ghost'}
        >
          <Stack
            alignItems="center"
            direction="row"
            gap={1}
            justifyContent="center"
          >
            {categoryIcon ?? (
              <OrganizationDashboardCategoryIcon
                variant={active ? 'primary' : 'neutral'}
              />
            )}
          </Stack>
        </Button>
      </Tooltip>
    )}
  </Stack>
)

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
        navigationItemMenu,
        pinnedFeature && shouldShowPinnedButton ? navigationItemMenuPinned : '',
      )}
      disabled={disabled}
      href={href}
      onClick={() => onToggle?.(!!active)}
      // pinnedFeature={pinnedFeature}
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
            className={navigationItemWrapText({
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
          <span className={navigationItemPadded}>{labelDescription}</span>
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
              className={navigationItemAnimatedIcon({
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
