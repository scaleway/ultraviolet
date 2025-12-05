'use client'

import {
  ArrowDownIcon,
  ArrowRightIcon,
  DragIcon,
  OpenInNewIcon,
  PinOutlineIcon,
  UnpinIcon,
} from '@ultraviolet/icons'
import { OrganizationDashboardCategoryIcon } from '@ultraviolet/icons/category'
import { cn } from '@ultraviolet/themes'
import {
  Badge,
  Button,
  Expandable,
  Menu,
  Stack,
  Text,
  Tooltip,
} from '@ultraviolet/ui'
import type {
  ComponentProps,
  CSSProperties,
  DragEvent,
  ElementType,
  MouseEvent,
  ReactNode,
} from 'react'
import {
  Children,
  isValidElement,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react'
import { useNavigation } from '../NavigationProvider'
import type { PinUnPinType } from '../types'
import { ItemContext, ItemProvider } from './ItemProvider'
import {
  navigationItemAnimatedIcon,
  navigationItemBadge,
  navigationItemCategoryIcon,
  navigationItemContainer,
  navigationItemContainerAnimated,
  navigationItemDragIcon,
  navigationItemMenu,
  navigationItemMenuContainer,
  navigationItemMenuPinned,
  navigationItemMenuStack,
  navigationItemPadded,
  navigationItemPaddingStack,
  navigationItemPinIcon,
  navigationItemPinnedButton,
  navigationItemRelative,
  navigationItemShowDraggable,
  navigationItemShowPinButton,
  navigationItemStackIcon,
  navigationItemWeakText,
  navigationItemWrapText,
} from './items.css'

type ItemType = 'default' | 'pinned' | 'pinnedGroup'

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
   * It should be a unique id and will be used for pin/unpin feature.
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
  disabled?: boolean
  'data-testid'?: string
  style?: CSSProperties
}

const onDragStopTrigger = (event: DragEvent<HTMLDivElement>) => {
  event.currentTarget.style.opacity = '1'
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
      pinItem,
      unpinItem,
      pinnedItems,
      pinLimit,
      animation,
      registerItem,
      shouldAnimate,
      animationType,
    } = context

    useEffect(() => {
      if (type !== 'pinnedGroup' && pinnedFeature) {
        registerItem({ [id]: { active, label, onClickPinUnpin, onToggle } })
      }
      // oxlint-disable react/exhaustive-deps
    }, [active, id, label, registerItem])

    const [internalExpanded, onToggleExpand] = useReducer(
      prevState => !prevState,
      Boolean(toggle),
    )

    const triggerToggle = useCallback(() => {
      onToggleExpand()
      onToggle?.(internalExpanded)
    }, [internalExpanded, onToggle])

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

    const containerTag = useMemo(() => {
      if (as) {
        return as
      }

      if (hasHrefAndNoChildren) {
        return 'a'
      }

      if (noExpand) {
        return 'div'
      }

      return 'button'
    }, [as, hasHrefAndNoChildren, noExpand])

    const ArrowIcon = useMemo(
      () => (internalExpanded ? ArrowDownIcon : ArrowRightIcon),
      [internalExpanded],
    )

    const PinUnpinIcon = useMemo(
      () => (isItemPinned ? UnpinIcon : PinOutlineIcon),
      [isItemPinned],
    )

    const ariaExpanded = useMemo(() => {
      if (hasHrefAndNoChildren && internalExpanded) {
        return true
      }

      if (hasHrefAndNoChildren && !internalExpanded) {
        return false
      }

      return undefined
    }, [hasHrefAndNoChildren, internalExpanded])

    const isPinDisabled = pinnedItems.length >= pinLimit
    const pinTooltipLocale = useMemo(() => {
      if (isPinDisabled) {
        return locales['navigation.pin.limit']
      }

      if (isItemPinned) {
        return locales['navigation.unpin.tooltip']
      }

      return locales['navigation.pin.tooltip']
    }, [isItemPinned, isPinDisabled, locales])

    const onDragStart = useCallback(
      (event: DragEvent<HTMLDivElement>) => {
        if (expanded) {
          event.dataTransfer.setData(
            'text/plain',
            JSON.stringify({ index, label }),
          )

          event.currentTarget.style.opacity = '0.5'
        }

        return undefined
      },
      [expanded, index, label],
    )

    const onDragEnd = useCallback(
      (event: DragEvent<HTMLDivElement>) =>
        expanded ? onDragStopTrigger(event) : undefined,
      [expanded],
    )

    const showDraggableIcon =
      !noExpand && pinnedFeature && shouldShowPinnedButton && !disabled

    const showPinIcon =
      !noExpand && !disabled && shouldShowPinnedButton && pinnedFeature
    // This content is when the navigation is expanded

    const shouldHaveWeakText =
      !!children && !active && shouldShowPinnedButton && !disabled

    if (expanded || (!expanded && animation === 'expand')) {
      return (
        <>
          <Stack
            alignItems={categoryIcon ? 'flex-start' : 'center'}
            aria-expanded={ariaExpanded}
            as={containerTag}
            className={cn(
              navigationItemContainer({
                disabled,
                hasActive: hasActiveChildren,
                isActive: !!active,
                noExpand,
                subLabel: !!subLabel,
              }),
              shouldAnimate && animationType === 'complex'
                ? navigationItemContainerAnimated[
                    animation === 'collapse' ? 'collapse' : 'expand'
                  ]
                : '',
              showDraggableIcon ? navigationItemShowDraggable : '',
              showPinIcon ? navigationItemShowPinButton : '',
              shouldHaveWeakText ? navigationItemWeakText : '',
            )}
            data-testid={dataTestId}
            direction="row"
            disabled={containerTag === 'button' ? disabled : undefined}
            draggable={type === 'pinned' && expanded}
            gap={1}
            href={href}
            id={id}
            justifyContent="space-between"
            onClick={triggerToggle}
            onDragEnd={onDragEnd}
            onDragStart={onDragStart}
            rel={rel}
            style={style}
            target={target}
          >
            <Stack
              alignItems={categoryIcon ? 'flex-start' : 'center'}
              direction="row"
              gap={1}
              justifyContent="center"
            >
              {categoryIcon ? (
                <Stack
                  alignItems="center"
                  className={navigationItemCategoryIcon}
                  justifyContent="center"
                >
                  {categoryIcon}
                </Stack>
              ) : null}
              {type === 'pinned' && expanded ? (
                <DragIcon
                  className={navigationItemDragIcon}
                  disabled={disabled}
                  prominence="weak"
                  sentiment="neutral"
                  size="small"
                />
              ) : null}
              <Stack>
                {!animation ? (
                  <Text
                    as="span"
                    className={navigationItemWrapText({
                      disabled,
                      weak:
                        hasActiveChildren && !noExpand && !disabled && !!active,
                    })}
                    data-animation={animation}
                    disabled={disabled}
                    prominence={
                      (categoryIcon || !hasParents) && !active
                        ? 'strong'
                        : 'default'
                    }
                    sentiment={active ? 'primary' : 'neutral'}
                    variant="bodySmallStrong"
                    whiteSpace="pre-wrap"
                  >
                    {label}
                    {labelDescription ? (
                      <span className={navigationItemPadded}>
                        {labelDescription}
                      </span>
                    ) : null}
                  </Text>
                ) : null}
                {subLabel && !animation ? (
                  <Text
                    as="span"
                    className={navigationItemWrapText({
                      disabled,
                      weak:
                        hasActiveChildren && !noExpand && !disabled && !!active,
                    })}
                    data-animation={animation}
                    disabled={disabled}
                    prominence="weak"
                    sentiment="neutral"
                    variant="caption"
                    whiteSpace="pre-wrap"
                  >
                    {subLabel}
                  </Text>
                ) : null}
              </Stack>
            </Stack>
            <Stack
              alignItems="center"
              direction="row"
              gap={href ? 1 : undefined}
            >
              {badgeText || hasPinnedFeatureAndNoChildren ? (
                <>
                  {badgeText && !animation ? (
                    <Badge
                      className={navigationItemBadge}
                      disabled={disabled}
                      prominence="strong"
                      sentiment={badgeSentiment}
                      size="small"
                    >
                      {badgeText}
                    </Badge>
                  ) : null}
                  {shouldShowPinnedButton ? (
                    <Tooltip
                      placement="right"
                      text={
                        isItemPinned
                          ? locales['navigation.unpin.tooltip']
                          : pinTooltipLocale
                      }
                    >
                      <div className={navigationItemRelative}>
                        <div
                          aria-disabled={isItemPinned ? false : isPinDisabled}
                          aria-label={isItemPinned ? 'unpin' : 'pin'}
                          className={navigationItemPinnedButton}
                          onClick={(event: MouseEvent<HTMLDivElement>) => {
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
                          role="button"
                        >
                          <PinUnpinIcon
                            className={
                              navigationItemPinIcon[
                                active ? 'active' : 'inactive'
                              ]
                            }
                            disabled={isItemPinned ? false : isPinDisabled}
                            sentiment={active ? 'primary' : 'neutral'}
                            size="medium"
                          />
                        </div>
                      </div>
                    </Tooltip>
                  ) : null}
                </>
              ) : null}
              {hasHrefAndNoChildren && target === '_blank' && !animation ? (
                <OpenInNewIcon
                  disabled={disabled}
                  prominence="default"
                  sentiment="neutral"
                />
              ) : null}
              {children ? (
                <Stack
                  alignItems="center"
                  className={navigationItemStackIcon}
                  direction="row"
                  gap={1}
                >
                  {!animation && !noExpand ? (
                    <ArrowIcon prominence="weak" sentiment="neutral" />
                  ) : null}
                </Stack>
              ) : null}
            </Stack>
          </Stack>
          {children ? (
            <>
              {!noExpand ? (
                <ItemProvider>
                  <Expandable animationDuration={0} opened={internalExpanded}>
                    <Stack
                      className={
                        noExpand || type === 'pinnedGroup'
                          ? ''
                          : navigationItemPaddingStack({
                              hide:
                                shouldAnimate &&
                                animationType === 'complex' &&
                                animation === 'expand',
                            })
                      }
                      width={animation ? '100%' : undefined}
                    >
                      {children}
                    </Stack>
                  </Expandable>
                </ItemProvider>
              ) : (
                <ItemProvider>
                  <Stack
                    className={
                      noExpand || type === 'pinnedGroup'
                        ? ''
                        : navigationItemPaddingStack({
                            hide:
                              shouldAnimate &&
                              animationType === 'complex' &&
                              animation === 'expand',
                          })
                    }
                    width={animation ? '100%' : undefined}
                  >
                    {children}
                  </Stack>
                </ItemProvider>
              )}
            </>
          ) : null}
        </>
      )
    }

    // This content is the menu of the navigation when collapsed
    if (categoryIcon || (Children.count(children) > 0 && !hasParents)) {
      return (
        <Stack
          alignItems="start"
          className={navigationItemMenuStack}
          gap={1}
          justifyContent="start"
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
                  {categoryIcon || (
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
    }

    // This content is what is inside a menu item the navigation is collapsed
    if (hasParents) {
      return (
        <Menu.Item
          active={active}
          borderless
          className={cn(
            navigationItemMenu,
            pinnedFeature && shouldShowPinnedButton
              ? navigationItemMenuPinned
              : '',
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
            {!animation ? (
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
            ) : null}
            {labelDescription ? (
              <span className={navigationItemPadded}>{labelDescription}</span>
            ) : null}
            <Stack direction="row">
              {badgeText && !animation ? (
                <Badge
                  className={navigationItemBadge}
                  disabled={disabled}
                  prominence="strong"
                  sentiment={badgeSentiment}
                  size="small"
                >
                  {badgeText}
                </Badge>
              ) : null}
              {hasHrefAndNoChildren && target === '_blank' ? (
                <OpenInNewIcon
                  className={
                    shouldAnimate && animationType === 'complex'
                      ? navigationItemAnimatedIcon[
                          animation === 'expand' ? 'expand' : 'collapse'
                        ]
                      : ''
                  }
                  disabled={disabled}
                  prominence="weak"
                  sentiment="neutral"
                />
              ) : null}
              {shouldShowPinnedButton ? (
                <Tooltip
                  placement="right"
                  text={
                    isItemPinned
                      ? locales['navigation.unpin.tooltip']
                      : pinTooltipLocale
                  }
                >
                  <div className={navigationItemRelative}>
                    <div
                      aria-disabled={isItemPinned ? false : isPinDisabled}
                      aria-label={isItemPinned ? 'unpin' : 'pin'}
                      className={navigationItemPinnedButton}
                      onClick={(event: MouseEvent<HTMLDivElement>) => {
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
                      role="button"
                    >
                      <PinUnpinIcon
                        className={
                          navigationItemPinIcon[active ? 'active' : 'inactive']
                        }
                        disabled={isItemPinned ? false : isPinDisabled}
                        sentiment={active ? 'primary' : 'neutral'}
                        size="medium"
                      />
                    </div>
                  </div>
                </Tooltip>
              ) : null}
            </Stack>
          </Stack>
        </Menu.Item>
      )
    }

    // This content is for when navigation is collapsed and we show an icon of link
    if (!hasParents && href) {
      return (
        <Tooltip placement="right" text={label}>
          <Stack
            alignItems="start"
            className={navigationItemMenuStack}
            gap={1}
            justifyContent="start"
          >
            <Stack
              alignItems="center"
              as={containerTag}
              className={cn(
                navigationItemContainer({ disabled }),
                shouldAnimate && animationType === 'complex'
                  ? navigationItemContainerAnimated[
                      animation === 'collapse' ? 'collapse' : 'expand'
                    ]
                  : '',
              )}
              gap={1}
              href={href}
              justifyContent="center"
              rel={rel}
              target={target}
            >
              <OpenInNewIcon
                className={
                  shouldAnimate && animationType === 'complex'
                    ? navigationItemAnimatedIcon[
                        animation === 'expand' ? 'expand' : 'collapse'
                      ]
                    : ''
                }
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
