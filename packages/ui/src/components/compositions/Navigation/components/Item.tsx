// biome-ignore-all lint/a11y/useFocusableInteractive: to fix
// oxlint-disable eslint/max-statements
// oxlint-disable eslint/complexity

'use client'

import { OpenInNewIcon } from '@ultraviolet/icons/OpenInNewIcon'
import { cn } from '@ultraviolet/utils'
import type {
  ComponentProps,
  CSSProperties,
  DragEvent,
  ElementType,
  ReactNode,
} from 'react'
import {
  Children,
  isValidElement,
  memo,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import type { Badge } from '../../../Badge'
import { Stack } from '../../../Stack'
import { Tooltip } from '../../../Tooltip'
import { useNavigation } from '../NavigationProvider'
import type { ItemType, PinUnPinType } from '../types'
import { ItemExpanded } from './ItemExpanded'
import { ItemMenu, ItemMenuItem } from './ItemMenu'
import { ItemContext } from './ItemProvider'
import {
  navigationItemAnimatedIcon,
  navigationItemContainer,
  navigationItemContainerAnimated,
  navigationItemMenuStack,
} from './items.css'

type LinkProps = {
  to: string
  children?: { props: ItemProps }
}
type ItemProps = {
  children?: ReactNode
  /**
   * Sets a category icon on the left of the item
   */
  categoryIcon?: ReactNode
  /**
   * The label of the item that will be shown.
   * It is also used as the key for pinning.
   */
  label: string
  /**
   * It will be added after the label when you want to have complementory information with the label
   */
  labelDescription?: ReactNode
  /**
   * It should be a unique id and will be used for pin/unpin and show/hide feature.
   */
  id: string
  /**
   * Text shown under the label with a lighter color and smaller font size
   */
  subLabel?: string
  /**
   * Badge is added on the right of the item. It is hidden on hover if pinned
   * feature is enabled
   */
  badgeText?: string
  /**
   * Defined the sentiment of the badge according to Badge component from
   * `@ultraviolet/ui`
   */
  badgeSentiment?: ComponentProps<typeof Badge>['sentiment']
  href?: HTMLAnchorElement['href']
  target?: HTMLAnchorElement['target']
  rel?: HTMLAnchorElement['rel']
  /**
   * This function will be triggered on click of the item. If the item is expandable
   * toggle will be passed with it.
   */
  onToggle?: (toggle: boolean) => void
  onClickPinUnpin?: (parameters: PinUnPinType) => void
  /**
   * This prop is used to control if the item is expanded or collapsed
   */
  toggle?: boolean
  /**
   * Set this to true if your current page is this item.
   */
  active?: boolean
  /**
   * If you want to remove pin button on your item use this prop
   */
  noPinButton?: boolean
  /**
   * You don't need to use this prop it's used internally to control the type of the item
   */
  type?: ItemType
  /**
   * You don't need to use this prop it's used internally for pinned item to be reorganized with drag and drop
   */
  index?: number
  /**
   * When the item has href it becomes a link if not it is a button.
   * When using an external routing tool you might need to remove both of them and use
   * a non focusable element. This option allows you to choose the tag of the
   * item.
   */
  as?: ElementType
  /**
   * Use this prop if you want to remove the expand behavior when the item
   * has sub items.
   */
  noExpand?: boolean
  /**
   * When set to true, the item is still visible even when `showHide='hide'` (NavigationProvider)
   */
  alwaysVisible?: boolean
  disabled?: boolean
  'data-testid'?: string
  style?: CSSProperties
}

const onDragStopTrigger = (event: DragEvent<HTMLDivElement>) => {
  const element = event.currentTarget
  element.style.opacity = '1'
}

export const Item = memo(
  ({
    children,
    categoryIcon,
    label,
    labelDescription,
    subLabel,
    badgeText,
    badgeSentiment,
    href,
    target,
    rel,
    onToggle,
    onClickPinUnpin,
    toggle,
    active,
    noPinButton,
    type = 'default',
    as,
    disabled,
    noExpand = false,
    index,
    id,
    'data-testid': dataTestId,
    style,
    alwaysVisible,
  }: ItemProps) => {
    const context = useNavigation()
    if (!context) {
      throw new Error(
        'Navigation.Item can only be used inside a NavigationProvider.',
      )
    }

    const itemProvider = useContext(ItemContext)
    const hasParents = !!itemProvider

    const {
      expanded,
      locales,
      pinnedFeature,
      pinnedItems,
      pinLimit,
      animation,
      registerItem,
      shouldAnimate,
      animationType,
      showHide,
    } = context

    const makeRegisterRef = useRef<() => void>(null)

    // Use ref to avoid infinite loop
    useEffect(() => {
      makeRegisterRef.current = () =>
        registerItem({
          [id]: { active, label, onClickPinUnpin, onToggle },
        })
    }, [active, id, label, onClickPinUnpin, registerItem, onToggle])

    useEffect(() => {
      if (type !== 'pinnedGroup' && pinnedFeature) {
        makeRegisterRef.current?.()
      }
    }, [type, pinnedFeature, active, id, label, registerItem])

    const hasHrefAndNoChildren = href && !children
    const hasPinnedFeatureAndNoChildren =
      pinnedFeature && !children && !noPinButton
    const isItemPinned = pinnedItems.includes(id)
    const shouldShowPinnedButton = useMemo(() => {
      if (href || disabled) {
        return false
      }

      if (hasPinnedFeatureAndNoChildren && type !== 'default') {
        return true
      }

      if (hasPinnedFeatureAndNoChildren) {
        return true
      }

      return false
    }, [disabled, hasPinnedFeatureAndNoChildren, href, type])

    const hasActiveChildren = useMemo(() => {
      if (!children) {
        return false
      }

      return (
        Children.map(children, child => {
          if (isValidElement<ItemProps | LinkProps>(child)) {
            // In case the Item is wrapped in a link
            if ('to' in child.props) {
              return child.props.children?.props.active
            }

            return child.props.active
          }

          return null
        }) as boolean[]
      ).includes(true)
    }, [children])
    const isPinDisabled = pinnedItems.length >= pinLimit

    const containerTag = useMemo(() => {
      if (as) {
        return as
      }

      if (hasHrefAndNoChildren) {
        return 'a'
      }

      // The element must not be a button when `shouldShowPinnedButton` is `true`, otherwise
      // there is a hydration error: a button (PinnedButton) is the child of a button (containerTag)
      if (noExpand || shouldShowPinnedButton) {
        return 'div'
      }

      return 'button'
    }, [as, hasHrefAndNoChildren, noExpand, shouldShowPinnedButton])

    const pinTooltipLocale = useMemo(() => {
      if (isPinDisabled) {
        return locales['navigation.pin.limit']
      }

      if (isItemPinned) {
        return locales['navigation.unpin.tooltip']
      }

      return locales['navigation.pin.tooltip']
    }, [isItemPinned, isPinDisabled, locales])

    if (!alwaysVisible && showHide === 'hide') {
      return null
    }
    const computedAnimation = animation === 'collapse' ? 'collapse' : 'expand'

    if (expanded || (!expanded && animation === 'expand')) {
      return (
        <ItemExpanded
          active={active}
          badgeSentiment={badgeSentiment}
          badgeText={badgeText}
          categoryIcon={categoryIcon}
          containerTag={containerTag}
          dataTestId={dataTestId}
          disabled={disabled}
          hasActiveChildren={hasActiveChildren}
          hasPinnedFeatureAndNoChildren={hasPinnedFeatureAndNoChildren}
          href={href}
          id={id}
          index={index}
          isItemPinned={isItemPinned}
          isPinDisabled={isPinDisabled}
          label={label}
          labelDescription={labelDescription}
          noExpand={noExpand}
          onClickPinUnpin={onClickPinUnpin}
          onDragStopTrigger={onDragStopTrigger}
          onToggle={onToggle}
          pinTooltipLocale={pinTooltipLocale}
          rel={rel}
          shouldShowPinnedButton={shouldShowPinnedButton}
          style={style}
          subLabel={subLabel}
          target={target}
          toggle={toggle}
          type={type}
        >
          {children}
        </ItemExpanded>
      )
    }

    // This content is the menu of the navigation when collapsed
    if (categoryIcon || (Children.count(children) > 0 && !hasParents)) {
      return (
        <ItemMenu
          active={active}
          categoryIcon={categoryIcon}
          hasActiveChildren={hasActiveChildren}
          label={label}
          style={style}
        >
          {children}
        </ItemMenu>
      )
    }

    // This content is what is inside a menu item the navigation is collapsed
    if (hasParents) {
      return (
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
      )
    }

    // This content is for when navigation is collapsed and we show an icon of link
    if (!hasParents && href) {
      return (
        <Tooltip placement="right" text={label}>
          <Stack
            alignItems="flex-start"
            className={navigationItemMenuStack}
            gap={1}
            justifyContent="flex-start"
          >
            <Stack
              alignItems="center"
              as={containerTag}
              className={cn(
                navigationItemContainer({ disabled }),
                navigationItemContainerAnimated({
                  animated: shouldAnimate && animationType === 'complex',
                  animation: computedAnimation,
                }),
              )}
              gap={1}
              href={href}
              justifyContent="center"
              rel={rel}
              target={target}
            >
              <OpenInNewIcon
                className={navigationItemAnimatedIcon({
                  animated: shouldAnimate && animationType === 'complex',
                  animation: computedAnimation,
                })}
                prominence="weak"
                sentiment="neutral"
              />
            </Stack>
          </Stack>
        </Tooltip>
      )
    }

    return null
  },
)
