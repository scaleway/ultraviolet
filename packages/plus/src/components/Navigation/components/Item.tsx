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
import type { ComponentProps, JSX, ReactNode } from 'react'
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
import {
  ANIMATION_DURATION,
  PIN_BUTTON_OPACITY_TRANSITION,
  shrinkHeight,
} from '../constants'

const NeutralButtonLink = css`
  color: inherit;
  text-decoration: none;
  background-color: inherit;
  border: none;
  text-align: left;
`

const ExpandedPinnedButton = styled(Button)`
  opacity: 0;
  right: 0;
  position: absolute;
  left: -24px;
  top: 0;
  bottom: 0;
  margin: auto;

  &:hover,
  &:focus {
    opacity: 1;
  }

  transition: ${PIN_BUTTON_OPACITY_TRANSITION};
  transition-delay: 0.3s;
`

const CollapsedPinnedButton = styled(Button)`
  opacity: 0;

  &:hover,
  &:focus {
    opacity: 1;
  }

  transition: ${PIN_BUTTON_OPACITY_TRANSITION};
  transition-delay: 0.3s;
`

const StyledMenuItem = styled(MenuV2.Item)`
  text-align: left;

  &:hover {
    ${ExpandedPinnedButton}, ${CollapsedPinnedButton} {
      opacity: 1;
    }
  }
`

const StyledMenu = styled(MenuV2)`
  width: 180px;
`

const StyledBadge = styled(Badge)`
  transition: ${PIN_BUTTON_OPACITY_TRANSITION};
  transition-delay: 0.3s;
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
    ),
  &[data-has-active-children='true'][data-has-no-expand='false']:not(
      [disabled][data-is-active='true']
    ) {
    background-color: ${({ theme }) => theme.colors.neutral.backgroundHover};
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

  &:hover[data-has-children='false'][data-is-active='false'] {
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
   * You don't need to use this prop it's used internally to close the menu
   */
  toggleMenu?: () => void
  /**
   * You don't need to use this prop it's used internally to control if the item has a parent
   */
  hasParents?: boolean
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
  toggle,
  active,
  noPinButton,
  type = 'default',
  hasParents,
  as,
  disabled,
  noExpand = false,
  toggleMenu,
}: ItemProps) => {
  const context = useNavigation()

  if (!context) {
    throw new Error('Navigation.Item can only be used inside a Navigation')
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
  } = context

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

  const PaddedStack = noExpand ? Stack : PaddingStack

  const hasHrefAndNoChildren = href && !children
  const hasPinnedFeatureAndNoChildren =
    pinnedFeature && !children && !noPinButton
  const isItemPinned = pinnedItems.includes(label)
  const shouldShowPinnedButton = useMemo(() => {
    if (href || disabled) return false

    if (pinnedItems.length >= pinLimit && type === 'default') return false

    if (hasPinnedFeatureAndNoChildren && type !== 'default') {
      return true
    }

    if (hasPinnedFeatureAndNoChildren && !isItemPinned) {
      return true
    }

    return false
  }, [
    disabled,
    hasPinnedFeatureAndNoChildren,
    href,
    isItemPinned,
    pinLimit,
    pinnedItems.length,
    type,
  ])

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
            <Stack>
              <WrapText
                as="span"
                variant="bodySmallStrong"
                sentiment={active ? 'primary' : 'neutral'}
                prominence={
                  (categoryIcon || !hasParents) && !active ? 'strong' : 'weak'
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
                        : locales['navigation.pin.tooltip']
                    }
                    placement="right"
                  >
                    <div style={{ position: 'relative' }}>
                      <ExpandedPinnedButton
                        size="xsmall"
                        variant="ghost"
                        sentiment={active ? 'primary' : 'neutral'}
                        onClick={() =>
                          isItemPinned ? unpinItem(label) : pinItem(label)
                        }
                        icon="pin"
                      />
                    </div>
                  </Tooltip>
                ) : null}
              </>
            ) : null}
            {hasHrefAndNoChildren ? (
              <AnimatedIcon
                name="open-in-new"
                sentiment="neutral"
                prominence="weak"
                disabled={disabled}
              />
            ) : null}
            {children ? (
              <Stack gap={1} direction="row" alignItems="center">
                {type === 'pinnedGroup' && pinLimit !== Infinity ? (
                  <WrapText
                    as="span"
                    variant="caption"
                    sentiment="neutral"
                    prominence="weak"
                  >
                    {pinnedItems.length}/{pinLimit}
                  </WrapText>
                ) : null}
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
            {({ toggle: toggleMenuLocal }) =>
              Children.map(children, child =>
                isValidElement<ItemProps>(child)
                  ? cloneElement(child, {
                      hasParents: true,
                      toggleMenu: toggleMenuLocal,
                    })
                  : child,
              )
            }
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
          toggleMenu?.()
        }}
        borderless
      >
        <Stack
          gap={1}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <WrapText as="span" variant="bodySmall">
            {label}
          </WrapText>
          {shouldShowPinnedButton ? (
            <Tooltip
              text={
                isItemPinned
                  ? locales['navigation.unpin.tooltip']
                  : locales['navigation.pin.tooltip']
              }
              placement="right"
            >
              <CollapsedPinnedButton
                size="xsmall"
                variant="ghost"
                sentiment={active ? 'primary' : 'neutral'}
                onClick={() => {
                  if (isItemPinned) {
                    unpinItem(label)
                  } else {
                    pinItem(label)
                  }
                }}
                icon="auto-fix"
              />
            </Tooltip>
          ) : null}
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
