'use client'

import { css } from '@emotion/react'
import styled from '@emotion/styled'
import {
  ArrowDownIcon,
  ArrowRightIcon,
  DragIcon,
  OpenInNewIcon,
  PinOutlineIcon,
  UnpinIcon,
} from '@ultraviolet/icons'
import { OrganizationDashboardCategoryIcon } from '@ultraviolet/icons/category'
import {
  Badge,
  Button,
  Expandable,
  Menu,
  Stack,
  Text,
  Tooltip,
  fadeIn,
} from '@ultraviolet/ui'
import type {
  ComponentProps,
  DragEvent,
  JSX,
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
import { ANIMATION_DURATION, shrinkHeight } from '../constants'
import type { PinUnPinType } from '../types'
import { ItemContext, ItemProvider } from './ItemProvider'

const RelativeDiv = styled.div`
  position: relative;
`

const StyledPinIconOutline = styled(PinOutlineIcon, {
  shouldForwardProp: prop => !['active'].includes(prop),
})<{ active?: boolean }>`
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  padding: ${({ theme }) => theme.space['0.25']};
  border-radius: ${({ theme }) => theme.radii.default};
  &:hover {
    background: ${({ theme }) => theme.colors.neutral.backgroundWeakHover};

    ${({ active, theme }) =>
      active ? `background: ${theme.colors.primary.backgroundHover};` : null}
  }
`

const StyledUnpinIcon = StyledPinIconOutline.withComponent(UnpinIcon)

const NeutralButtonLink = css`
  color: inherit;
  text-decoration: none;
  background-color: inherit;
  border: none;
  text-align: left;
`

// Pin button when the navigation is expanded
const LocalExpandButton = styled(Button)`
  opacity: 0;
  right: 0;
  position: absolute;
  left: -24px;
  top: 0;
  bottom: 0;
  margin: auto;

  &:hover,
  &:focus,
  &:active {
    opacity: 1;
  }
`

const PinnedButton = LocalExpandButton.withComponent('div')

const GrabIcon = styled(DragIcon)`
  opacity: 0;
  margin: 0 ${({ theme }) => theme.space['0.25']};
  cursor: grab;
`

const StyledBadge = styled(Badge)``

const StyledMenuItem = styled(Menu.Item, {
  shouldForwardProp: prop => !['isPinnable', 'pinnedFeature'].includes(prop),
})<{
  isPinnable?: boolean
  pinnedFeature?: boolean
}>`
  text-align: left;
  &:hover,
  &:focus,
  &:active {
    ${PinnedButton} {
      opacity: 1;
    }

    ${StyledBadge} {
      opacity: ${({ isPinnable, pinnedFeature }) =>
        isPinnable && pinnedFeature ? 0 : 1};
    }
  }
`

const StyledMenu = styled(Menu)`
  width: 180px;
`

const PaddingStack = styled(Stack)`
  padding-left: 28px; // This value needs to be hardcoded because of the category icon size
`

const AnimatedIcon = styled(OpenInNewIcon)``

const WrapText = styled(Text)`
  overflow-wrap: anywhere;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`

const StyledStack = styled(Stack)`
  padding-left: 28px; // This value needs to be hardcoded because of the category icon size
`

const StyledContainer = styled(Stack)`
  ${NeutralButtonLink};
  border-radius: ${({ theme }) => theme.radii.default};

  &[data-has-no-expand="false"] {
    cursor: pointer;
  }
  margin-top: ${({ theme }) => theme.space['0.25']};
  padding: ${({ theme }) =>
    `calc(${theme.space['0.25']} + ${theme.space['0.5']}) ${theme.space['1']}`};

  &[data-has-sub-label="true"] {
    padding: ${({ theme }) => `${theme.space['0.5']} ${theme.space['1']}`};
  }

  width: 100%;

  &:hover[data-has-no-expand="false"]:not([disabled]):not(
      [data-is-active="true"]
    ),
  &:focus[data-has-no-expand="false"]:not([disabled]):not(
      [data-is-active="true"]
    ) {
    background-color: ${({ theme }) => theme.colors.neutral.backgroundWeak};
  }
  &[data-has-active-children="true"][data-has-no-expand="false"]:not(
      [disabled][data-is-active="true"]
    ) {
    background-color: ${({ theme }) => theme.colors.neutral.backgroundWeakHover};
    ${WrapText} {
      color: ${({ theme }) => theme.colors.neutral.textWeakHover};
    }

    ${PinnedButton} {
      opacity: 1;
    }

    &[data-is-pinnable="true"][data-pinned-feature="true"] {
      ${StyledBadge} {
        opacity: 0;
      }
    }
  }

  &[data-has-no-expand="false"][data-pinned-feature="true"][data-is-pinnable="true"]:not([disabled]) {
    &:hover,
    &:focus,
    &:active {
      ${PinnedButton}, ${GrabIcon} {
        opacity: 1;
      }

      ${StyledBadge} {
        opacity: 0;
      }
    }
  }

  &:hover[data-has-children="false"][data-is-active="false"][data-is-pinnable="true"]:not([disabled]) {
    ${WrapText} {
      color: ${({ theme }) => theme.colors.neutral.textWeakHover};
    }
  }

  &:active[data-has-no-expand="false"]:not([disabled]):not(
      [data-is-active="true"]
    ) {
    background-color: ${({ theme }) => theme.colors.neutral.backgroundHover};
  }

  &[data-is-active="true"],
  &:hover[data-has-active="true"] {
    background-color: ${({ theme }) => theme.colors.primary.background};

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary.backgroundHover};
    }
  }

  &[disabled] {
    cursor: not-allowed;
    background-color: unset;

    ${WrapText} {
      color: ${({ theme }) => theme.colors.neutral.textWeakDisabled};
    }
  }

  &[data-animation="collapse"][data-animation-type="complex"] {
    animation: ${shrinkHeight} ${ANIMATION_DURATION}ms ease-in-out;
    ${WrapText}, ${AnimatedIcon}, ${StyledBadge} {
      animation: ${fadeIn} ${ANIMATION_DURATION}ms ease-in-out reverse;
    }
  }

  &[data-animation="expand"][data-animation-type="complex"] {
    animation: ${shrinkHeight} ${ANIMATION_DURATION}ms ease-in-out reverse;
    ${WrapText}, ${AnimatedIcon}, ${StyledBadge} {
      animation: ${fadeIn} ${ANIMATION_DURATION}ms ease-in-out;
    }

    ${StyledStack} {
      display: none;
    }
  }
`

const MenuStack = styled(Stack)`
  padding: ${({ theme }) => `0 ${theme.space['2']}`};
  margin-top: ${({ theme }) => theme.space['0.25']};
`

const StackIcon = styled(Stack)`
  padding-top: ${({ theme }) => theme.space['0.5']};
`

const ContainerCategoryIcon = styled(Stack)`
  min-width: 20px;
`

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
  as?: keyof JSX.IntrinsicElements
  /**
   * Use this prop if you want to remove the expand behavior when the item
   * has sub items.
   */
  noExpand?: boolean
  disabled?: boolean
  'data-testid'?: string
}

const onDragStopTrigger = (event: DragEvent<HTMLDivElement>) => {
  // eslint-disable-next-line no-param-reassign
  event.currentTarget.style.opacity = '1'
}

export const Item = memo(
  ({
    children,
    categoryIcon,
    label,
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
        registerItem({ [id]: { label, active, onToggle, onClickPinUnpin } })
      }
    }, [active, id, label, registerItem])

    const [internalExpanded, onToggleExpand] = useReducer(
      prevState => !prevState,
      Boolean(toggle),
    )

    const triggerToggle = useCallback(() => {
      onToggleExpand()
      onToggle?.(internalExpanded)
    }, [internalExpanded, onToggle])

    const PaddedStack =
      noExpand || type === 'pinnedGroup' ? Stack : PaddingStack

    const hasHrefAndNoChildren = href && !children
    const hasPinnedFeatureAndNoChildren =
      pinnedFeature && !children && !noPinButton
    const isItemPinned = pinnedItems.includes(id)
    const shouldShowPinnedButton = useMemo(() => {
      if (href || disabled) return false

      if (hasPinnedFeatureAndNoChildren && type !== 'default') {
        return true
      }

      if (hasPinnedFeatureAndNoChildren) {
        return true
      }

      return false
    }, [disabled, hasPinnedFeatureAndNoChildren, href, type])

    const hasActiveChildren = useMemo(() => {
      if (!children) return false

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

    const Container = useMemo(
      () => StyledContainer.withComponent(containerTag),
      [containerTag],
    )

    const ArrowIcon = useMemo(
      () => (internalExpanded ? ArrowDownIcon : ArrowRightIcon),
      [internalExpanded],
    )

    const PinUnpinIcon = useMemo(
      () => (isItemPinned ? StyledUnpinIcon : StyledPinIconOutline),
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
            JSON.stringify({ label, index }),
          )
          // eslint-disable-next-line no-param-reassign
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

    // This content is when the navigation is expanded
    if (expanded || (!expanded && animation === 'expand')) {
      return (
        <>
          <Container
            gap={1}
            direction="row"
            alignItems={categoryIcon ? 'flex-start' : 'center'}
            justifyContent="space-between"
            data-has-sub-label={!!subLabel}
            onClick={triggerToggle}
            aria-expanded={ariaExpanded}
            href={href}
            target={target}
            rel={rel}
            data-is-pinnable={shouldShowPinnedButton}
            data-is-active={active}
            data-animation={shouldAnimate ? animation : undefined}
            data-animation-type={animationType}
            data-has-children={!!children}
            data-has-active-children={hasActiveChildren}
            data-has-no-expand={noExpand}
            data-pinned-feature={pinnedFeature}
            disabled={disabled}
            draggable={type === 'pinned' && expanded}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            id={id}
            data-testid={dataTestId}
          >
            <Stack
              direction="row"
              gap={1}
              alignItems={categoryIcon ? 'flex-start' : 'center'}
              justifyContent="center"
            >
              {categoryIcon ? (
                <ContainerCategoryIcon
                  alignItems="center"
                  justifyContent="center"
                >
                  {categoryIcon}
                </ContainerCategoryIcon>
              ) : null}
              {type === 'pinned' && expanded ? (
                <GrabIcon
                  sentiment="neutral"
                  prominence="weak"
                  size="small"
                  disabled={disabled}
                />
              ) : null}
              <Stack>
                {!animation ? (
                  <WrapText
                    as="span"
                    variant="bodySmallStrong"
                    sentiment={active ? 'primary' : 'neutral'}
                    prominence={
                      (categoryIcon || !hasParents) && !active
                        ? 'strong'
                        : 'default'
                    }
                    data-animation={animation}
                    disabled={disabled}
                    whiteSpace="pre-wrap"
                  >
                    {label}
                  </WrapText>
                ) : null}
                {subLabel && !animation ? (
                  <WrapText
                    as="span"
                    variant="caption"
                    sentiment="neutral"
                    prominence="weak"
                    data-animation={animation}
                    disabled={disabled}
                    whiteSpace="pre-wrap"
                  >
                    {subLabel}
                  </WrapText>
                ) : null}
              </Stack>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap={href ? 1 : undefined}
            >
              {badgeText || hasPinnedFeatureAndNoChildren ? (
                <>
                  {badgeText && !animation ? (
                    <StyledBadge
                      sentiment={badgeSentiment}
                      size="small"
                      prominence="strong"
                      disabled={disabled}
                    >
                      {badgeText}
                    </StyledBadge>
                  ) : null}
                  {shouldShowPinnedButton ? (
                    <Tooltip
                      text={
                        isItemPinned
                          ? locales['navigation.unpin.tooltip']
                          : pinTooltipLocale
                      }
                      placement="right"
                    >
                      <RelativeDiv>
                        <PinnedButton
                          role="button"
                          aria-label={isItemPinned ? 'unpin' : 'pin'}
                          size="xsmall"
                          variant="ghost"
                          sentiment={active ? 'primary' : 'neutral'}
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
                                state: isItemPinned ? 'unpin' : 'pin',
                                id,
                                totalPinned: newValue,
                              })
                            }
                          }}
                          disabled={isItemPinned ? false : isPinDisabled}
                        >
                          <PinUnpinIcon
                            size="medium"
                            disabled={isItemPinned ? false : isPinDisabled}
                            sentiment={active ? 'primary' : 'neutral'}
                            active={active}
                          />
                        </PinnedButton>
                      </RelativeDiv>
                    </Tooltip>
                  ) : null}
                </>
              ) : null}
              {hasHrefAndNoChildren && target === '_blank' && !animation ? (
                <AnimatedIcon
                  sentiment="neutral"
                  prominence="default"
                  disabled={disabled}
                />
              ) : null}
              {children ? (
                <StackIcon gap={1} direction="row" alignItems="center">
                  {!animation && !noExpand ? (
                    <ArrowIcon sentiment="neutral" prominence="weak" />
                  ) : null}
                </StackIcon>
              ) : null}
            </Stack>
          </Container>
          {children ? (
            <>
              {!noExpand ? (
                <ItemProvider>
                  <Expandable opened={internalExpanded} animationDuration={0}>
                    <PaddedStack width={animation ? '100%' : undefined}>
                      {children}
                    </PaddedStack>
                  </Expandable>
                </ItemProvider>
              ) : (
                <ItemProvider>
                  <PaddedStack width={animation ? '100%' : undefined}>
                    {children}
                  </PaddedStack>
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
        <MenuStack gap={1} alignItems="start" justifyContent="start">
          {Children.count(children) > 0 ? (
            <StyledMenu
              triggerMethod="hover"
              dynamicDomRendering={false} // As we parse the children we don't need dynamic rendering
              disclosure={
                <Button
                  sentiment="neutral"
                  variant={hasActiveChildren ? 'filled' : 'ghost'}
                  size="small"
                  aria-label={label}
                >
                  {categoryIcon ? (
                    <Stack
                      direction="row"
                      gap={1}
                      alignItems="center"
                      justifyContent="center"
                    >
                      {categoryIcon}
                    </Stack>
                  ) : null}
                </Button>
              }
              placement="right"
            >
              <ItemProvider>{children}</ItemProvider>
            </StyledMenu>
          ) : (
            <Tooltip text={label} placement="right" tabIndex={-1}>
              <Button
                sentiment="neutral"
                variant={active ? 'filled' : 'ghost'}
                size="small"
                aria-label={label}
              >
                <Stack
                  direction="row"
                  gap={1}
                  alignItems="center"
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
        </MenuStack>
      )
    }

    // This content is what is inside a menu item the navigation is collapsed
    if (hasParents) {
      return (
        <StyledMenuItem
          pinnedFeature={pinnedFeature}
          href={href}
          target={target}
          rel={rel}
          borderless
          active={active}
          disabled={disabled}
          sentiment={active ? 'primary' : 'neutral'}
          isPinnable={shouldShowPinnedButton}
          onClick={() => onToggle?.(!!active)}
        >
          <Stack
            gap={1}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            flex={1}
            width="100%"
          >
            {!animation ? (
              <WrapText as="span" variant="bodySmall" whiteSpace="pre-wrap">
                {label}
              </WrapText>
            ) : null}
            <Stack direction="row">
              {badgeText && !animation ? (
                <StyledBadge
                  sentiment={badgeSentiment}
                  size="small"
                  prominence="strong"
                  disabled={disabled}
                >
                  {badgeText}
                </StyledBadge>
              ) : null}
              {hasHrefAndNoChildren && target === '_blank' ? (
                <AnimatedIcon
                  sentiment="neutral"
                  prominence="weak"
                  disabled={disabled}
                />
              ) : null}
              {shouldShowPinnedButton ? (
                <Tooltip
                  text={
                    isItemPinned
                      ? locales['navigation.unpin.tooltip']
                      : pinTooltipLocale
                  }
                  placement="right"
                >
                  <RelativeDiv>
                    <PinnedButton
                      role="button"
                      size="xsmall"
                      aria-label={isItemPinned ? 'unpin' : 'pin'}
                      variant="ghost"
                      sentiment={active ? 'primary' : 'neutral'}
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
                            state: isItemPinned ? 'unpin' : 'pin',
                            id,
                            totalPinned: newValue,
                          })
                        }
                      }}
                      disabled={isItemPinned ? false : isPinDisabled}
                    >
                      <PinUnpinIcon
                        size="medium"
                        disabled={isItemPinned ? false : isPinDisabled}
                        sentiment={active ? 'primary' : 'neutral'}
                        active={active}
                      />
                    </PinnedButton>
                  </RelativeDiv>
                </Tooltip>
              ) : null}
            </Stack>
          </Stack>
        </StyledMenuItem>
      )
    }

    // This content is for when navigation is collapsed and we show an icon of link
    if (!hasParents && href) {
      return (
        <Tooltip text={label} placement="right">
          <MenuStack gap={1} alignItems="start" justifyContent="start">
            <Container
              gap={1}
              alignItems="center"
              justifyContent="center"
              href={href}
              target={target}
              rel={rel}
            >
              <AnimatedIcon sentiment="neutral" prominence="weak" />
            </Container>
          </MenuStack>
        </Tooltip>
      )
    }

    return null
  },
)
