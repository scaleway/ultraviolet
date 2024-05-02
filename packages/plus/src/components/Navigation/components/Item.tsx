import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { CategoryIcon, Icon } from '@ultraviolet/icons'
import {
  Badge,
  Button,
  Expandable,
  MenuV2,
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
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useNavigation } from '../NavigationProvider'
import { ANIMATION_DURATION, shrinkHeight } from '../constants'

const RelativeDiv = styled.div`
  position: relative;
`

const StyledIcon = styled(Icon)`
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  padding: ${({ theme }) => theme.space['0.25']};
  border-radius: ${({ theme }) => theme.radii.default};
  &:hover {
    background: ${({ theme }) => theme.colors.neutral.backgroundWeakHover};
  }
`

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

const ExpandedPinnedButton = LocalExpandButton.withComponent('div')

// Pin button when the navigation is collapsed
const LocalPinnedButton = styled(Button)`
  position: absolute;
  opacity: 0;
  right: 0;
  margin: auto;
  top: 0;
  bottom: 0;

  &:hover {
    opacity: 1;
  }
`

const CollapsedPinnedButton = LocalPinnedButton.withComponent('div')

const GrabIcon = styled(Icon)`
  opacity: 0;
  margin: 0 ${({ theme }) => theme.space['0.25']};
  cursor: grab;
`

const StyledBadge = styled(Badge)``

const StyledMenuItem = styled(MenuV2.Item, {
  shouldForwardProp: prop => !['isPinnable'].includes(prop),
})<{
  isPinnable?: boolean
}>`
  text-align: left;

  &:hover,
  &:focus,
  &:active {
    ${CollapsedPinnedButton} {
      opacity: 1;
    }

    ${StyledBadge} {
      opacity: ${({ isPinnable }) => (isPinnable ? 0 : 1)};
    }
  }
`

const StyledMenu = styled(MenuV2)`
  width: 180px;
`

const PaddingStack = styled(Stack)`
  padding-left: 28px; // This value needs to be hardcoded because of the category icon size
`

const AnimatedIcon = styled(Icon)``

const WrapText = styled(Text, {
  shouldForwardProp: prop =>
    !['animation', 'subLabel', 'textProminence'].includes(prop),
})<{
  animation?: 'collapse' | 'expand' | boolean
  subLabel?: boolean
}>`
  overflow-wrap: ${({ animation }) => (animation ? 'normal' : 'anywhere')};
  white-space: ${({ animation }) => (animation ? 'nowrap' : 'normal')};
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  white-space: pre-wrap;
`

const StyledStack = styled(Stack)`
  padding-left: 28px; // This value needs to be hardcoded because of the category icon size
`

const StyledContainer = styled(Stack)`
  ${NeutralButtonLink};
  border-radius: ${({ theme }) => theme.radii.default};

  &[data-has-no-expand='false'] {
    cursor: pointer;
  }
  margin-top: ${({ theme }) => theme.space['0.25']};
  padding: ${({ theme }) =>
    `calc(${theme.space['0.25']} + ${theme.space['0.5']}) ${theme.space['1']}`};

  &[data-has-sub-label='true'] {
    padding: ${({ theme }) => `${theme.space['0.5']} ${theme.space['1']}`};
  }

  width: 100%;

  &:hover[data-has-no-expand='false']:not([disabled]):not(
      [data-is-active='true']
    ),
  &:focus[data-has-no-expand='false']:not([disabled]):not(
      [data-is-active='true']
    ) {
    background-color: ${({ theme }) => theme.colors.neutral.backgroundWeak};
  }
  &[data-has-active-children='true'][data-has-no-expand='false']:not(
      [disabled][data-is-active='true']
    ) {
    background-color: ${({ theme }) =>
      theme.colors.neutral.backgroundWeakHover};
    ${WrapText} {
      color: ${({ theme }) => theme.colors.neutral.textWeakHover};
    }

    ${ExpandedPinnedButton}, ${CollapsedPinnedButton} {
      opacity: 1;
    }

    &[data-is-pinnable='true'] {
      ${StyledBadge} {
        opacity: 0;
      }
    }
  }

  &[data-has-no-expand='false']:not([disabled]) {
    &:hover,
    &:focus,
    &:active {
      ${ExpandedPinnedButton}, ${CollapsedPinnedButton}, ${GrabIcon} {
        opacity: 1;
      }

      ${StyledBadge} {
        opacity: 0;
      }
    }
  }

  &:hover[data-has-children='false'][data-is-active='false']:not([disabled]) {
    ${WrapText} {
      color: ${({ theme }) => theme.colors.neutral.textWeakHover};
    }
  }

  &:active[data-has-no-expand='false']:not([disabled]):not(
      [data-is-active='true']
    ) {
    background-color: ${({ theme }) => theme.colors.neutral.backgroundHover};
  }

  &[data-is-active='true'],
  &:hover[data-has-active='true'] {
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

  &[data-animation='collapse'] {
    animation: ${shrinkHeight} ${ANIMATION_DURATION}ms ease-in-out;
    ${WrapText}, ${AnimatedIcon}, ${StyledBadge} {
      animation: ${fadeIn} ${ANIMATION_DURATION}ms ease-in-out reverse;
    }
  }

  &[data-animation='expand'] {
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

const ContainerCategoryIcon = styled(Stack)`
  min-width: 20px;
`

type ItemType = 'default' | 'pinned' | 'pinnedGroup'

type ItemProps = {
  children?: ReactNode
  /**
   * Sets a category icon on the left of the item
   */
  categoryIcon?: ComponentProps<typeof CategoryIcon>['name']
  categoryIconVariant?: ComponentProps<typeof CategoryIcon>['variant']
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
  href?: string
  /**
   * This function will be triggered on click of the item. If the item is expandable
   * toggle will be passed with it.
   */
  onClick?: (toggle?: true | false) => void
  onPinUnpinClick?: () => void
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
   * You don't need to use this prop it's used internally to control if the item has a parent
   */
  hasParents?: boolean
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
}

export const Item = ({
  children,
  categoryIcon,
  categoryIconVariant,
  label,
  subLabel,
  badgeText,
  badgeSentiment,
  href,
  onClick,
  onPinUnpinClick,
  toggle,
  active,
  noPinButton,
  type = 'default',
  hasParents,
  as,
  disabled,
  noExpand = false,
  index,
  id,
}: ItemProps) => {
  const context = useNavigation()

  if (!context) {
    throw new Error(
      'Navigation.Item can only be used inside a NavigationProvider.',
    )
  }

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
  } = context

  useEffect(
    () => {
      if (type !== 'pinnedGroup') {
        registerItem({ [id]: { label, active, onClick } })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [active, id, label, registerItem],
  )

  const [internalToggle, setToggle] = useState(toggle !== false)

  const triggerToggle = useCallback(
    (value: boolean) => {
      setToggle(value)
      onClick?.(internalToggle)
    },
    [internalToggle, onClick],
  )

  useEffect(() => {
    if (animation === 'collapse') {
      setToggle(false)
    }

    if (animation === 'expand') {
      setTimeout(() => {
        setToggle(toggle ?? true)
      }, 1)
    }
  }, [animation, toggle])

  const PaddedStack = noExpand || type === 'pinnedGroup' ? Stack : PaddingStack

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
      Children.map(children, child =>
        isValidElement<ItemProps>(child) ? child.props?.active : false,
      ) as boolean[]
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

  const Container = StyledContainer.withComponent(containerTag)

  const ariaExpanded = useMemo(() => {
    if (hasHrefAndNoChildren && internalToggle) {
      return true
    }

    if (hasHrefAndNoChildren && !internalToggle) {
      return false
    }

    return undefined
  }, [hasHrefAndNoChildren, internalToggle])

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

  const onDragStartTrigger = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('text/plain', JSON.stringify({ label, index }))
    // eslint-disable-next-line no-param-reassign
    event.currentTarget.style.opacity = '0.5'
  }

  const onDragStopTrigger = (event: DragEvent<HTMLDivElement>) => {
    // eslint-disable-next-line no-param-reassign
    event.currentTarget.style.opacity = '1'
  }

  // This content is when the navigation is expanded
  if (expanded || (!expanded && animation === 'expand')) {
    const renderChildren = Children.map(children, child =>
      isValidElement<ItemProps>(child)
        ? cloneElement(child, {
            hasParents: true,
          })
        : child,
    )

    return (
      <>
        <Container
          gap={1}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          data-has-sub-label={!!subLabel}
          onClick={() => {
            if (children) {
              return triggerToggle(!internalToggle)
            }

            return onClick?.()
          }}
          aria-expanded={ariaExpanded}
          href={href}
          target={href ? '_blank' : undefined}
          data-is-pinnable={shouldShowPinnedButton}
          data-is-active={active}
          data-animation={animation}
          data-has-children={!!children}
          data-has-active-children={hasActiveChildren}
          data-has-no-expand={noExpand}
          disabled={disabled}
          draggable={type === 'pinned' && expanded}
          onDragStart={(event: DragEvent<HTMLDivElement>) =>
            expanded ? onDragStartTrigger(event) : undefined
          }
          onDragEnd={(event: DragEvent<HTMLDivElement>) =>
            expanded ? onDragStopTrigger(event) : undefined
          }
          id={id}
        >
          <Stack
            direction="row"
            gap={1}
            alignItems="center"
            justifyContent="center"
          >
            {categoryIcon ? (
              <ContainerCategoryIcon
                alignItems="center"
                justifyContent="center"
              >
                <CategoryIcon
                  name={categoryIcon}
                  variant={active ? 'primary' : categoryIconVariant}
                  disabled={disabled}
                />
              </ContainerCategoryIcon>
            ) : null}
            {type === 'pinned' && expanded ? (
              <GrabIcon
                name="drag-vertical"
                sentiment="neutral"
                prominence="weak"
                size="small"
                disabled={disabled}
              />
            ) : null}
            <Stack>
              <WrapText
                as="span"
                variant="bodySmallStrong"
                sentiment={active ? 'primary' : 'neutral'}
                prominence={
                  (categoryIcon || !hasParents) && !active
                    ? 'strong'
                    : 'default'
                }
                animation={animation}
                disabled={disabled}
              >
                {label}
              </WrapText>
              {subLabel ? (
                <WrapText
                  as="span"
                  variant="caption"
                  sentiment="neutral"
                  prominence="weak"
                  animation={animation}
                  disabled={disabled}
                  subLabel
                >
                  {subLabel}
                </WrapText>
              ) : null}
            </Stack>
          </Stack>
          <Stack direction="row" alignItems="center" gap={href ? 1 : undefined}>
            {badgeText || hasPinnedFeatureAndNoChildren ? (
              <>
                {badgeText ? (
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
                      <ExpandedPinnedButton
                        role="button"
                        size="xsmall"
                        variant="ghost"
                        sentiment={active ? 'primary' : 'neutral'}
                        onClick={(event: MouseEvent<HTMLDivElement>) => {
                          if (isItemPinned) {
                            unpinItem(id)
                          } else {
                            pinItem(id)
                          }
                          event.stopPropagation() // This is to avoid click spread to the parent and change the routing
                          onPinUnpinClick?.()
                        }}
                        disabled={isItemPinned ? false : isPinDisabled}
                      >
                        <StyledIcon
                          size="large"
                          name={isItemPinned ? 'unpin' : 'pin'}
                          variant={isItemPinned ? 'filled' : 'outlined'}
                          disabled={isItemPinned ? false : isPinDisabled}
                          sentiment={active ? 'primary' : 'neutral'}
                        />
                      </ExpandedPinnedButton>
                    </RelativeDiv>
                  </Tooltip>
                ) : null}
              </>
            ) : null}
            {hasHrefAndNoChildren ? (
              <AnimatedIcon
                name="open-in-new"
                sentiment="neutral"
                prominence="default"
                disabled={disabled}
              />
            ) : null}
            {children ? (
              <Stack gap={1} direction="row" alignItems="center">
                {!animation && !noExpand ? (
                  <AnimatedIcon
                    name={internalToggle ? 'arrow-down' : 'arrow-right'}
                    sentiment="neutral"
                    prominence="weak"
                  />
                ) : null}
              </Stack>
            ) : null}
          </Stack>
        </Container>
        {children ? (
          <>
            {!noExpand ? (
              <Expandable
                opened={internalToggle}
                animationDuration={
                  animation ? ANIMATION_DURATION / 2 : undefined
                }
              >
                <PaddedStack>{renderChildren}</PaddedStack>
              </Expandable>
            ) : (
              <PaddedStack>{renderChildren}</PaddedStack>
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
                icon={!categoryIcon ? 'dots-horizontal' : undefined}
              >
                {categoryIcon ? (
                  <Stack
                    direction="row"
                    gap={1}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <CategoryIcon
                      name={categoryIcon}
                      variant={active ? 'primary' : categoryIconVariant}
                    />
                  </Stack>
                ) : null}
              </Button>
            }
            placement="right"
          >
            {Children.map(children, child =>
              isValidElement<ItemProps>(child)
                ? cloneElement(child, {
                    hasParents: true,
                  })
                : child,
            )}
          </StyledMenu>
        ) : (
          <Tooltip text={label} placement="right" tabIndex={-1}>
            <Button
              sentiment="neutral"
              variant={active ? 'filled' : 'ghost'}
              size="small"
              onClick={() => onClick?.()}
            >
              <Stack
                direction="row"
                gap={1}
                alignItems="center"
                justifyContent="center"
              >
                <CategoryIcon
                  name={categoryIcon ?? 'console'}
                  variant={active ? 'primary' : categoryIconVariant}
                />
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
        href={href}
        onClick={() => {
          onClick?.()
        }}
        borderless
        active={active}
        disabled={disabled}
        sentiment={active ? 'primary' : 'neutral'}
        isPinnable={shouldShowPinnedButton}
      >
        <Stack
          gap={1}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          flex={1}
          width="100%"
        >
          <WrapText as="span" variant="bodySmall">
            {label}
          </WrapText>
          <Stack direction="row">
            {badgeText ? (
              <StyledBadge
                sentiment={badgeSentiment}
                size="small"
                prominence="strong"
                disabled={disabled}
              >
                {badgeText}
              </StyledBadge>
            ) : null}
            {hasHrefAndNoChildren ? (
              <AnimatedIcon
                name="open-in-new"
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
                  <CollapsedPinnedButton
                    role="button"
                    size="xsmall"
                    variant="ghost"
                    sentiment={active ? 'primary' : 'neutral'}
                    onClick={(event: MouseEvent<HTMLDivElement>) => {
                      if (isItemPinned) {
                        unpinItem(id)
                      } else {
                        pinItem(id)
                      }

                      event.stopPropagation() // This is to avoid click spread to the parent and change the routing
                      onPinUnpinClick?.()
                    }}
                    icon={isItemPinned ? 'unpin' : 'pin'}
                    iconVariant={isItemPinned ? 'filled' : 'outlined'}
                    disabled={isItemPinned ? false : isPinDisabled}
                  />
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
            target="_blank"
          >
            <AnimatedIcon
              name="open-in-new"
              sentiment="neutral"
              prominence="weak"
            />
          </Container>
        </MenuStack>
      </Tooltip>
    )
  }

  return null
}
