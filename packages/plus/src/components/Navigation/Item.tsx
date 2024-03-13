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
} from '@ultraviolet/ui'
import type { ComponentProps, ReactNode } from 'react'
import { Children, useMemo, useReducer } from 'react'
import { useNavigation } from './NavigationProvider'

const OPACITY_TRANSITION = '150ms ease-in-out'

type ItemType = 'default' | 'pinned' | 'pinnedGroup'

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

  transition: ${OPACITY_TRANSITION};
`

const CollapsedPinnedButton = styled(Button)`
  opacity: 0;

  &:hover,
  &:focus {
    opacity: 1;
  }

  transition: ${OPACITY_TRANSITION};
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
  transition: ${OPACITY_TRANSITION};
`

const StyledContainer = styled(Stack)`
  ${NeutralButtonLink};
  border-radius: ${({ theme }) => theme.radii.default};
  cursor: pointer;

  &[data-has-sub-label='true'] {
    padding: ${({ theme }) => `${theme.space['0.5']} ${theme.space['1']}`};
  }

  &[data-has-sub-label='false'] {
    padding: ${({ theme }) => theme.space['1']};
  }

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.neutral.backgroundWeak};

    ${ExpandedPinnedButton}, ${CollapsedPinnedButton} {
      opacity: 1;
    }

    &[data-is-pinnable='true'] {
      ${StyledBadge} {
        opacity: 0;
      }
    }
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.primary.background};
  }
`

const CustomExpandable = styled(Expandable)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space['0.25']};
  padding-left: 28px; // This value needs to be hardcoded because of the category icon size
`

const MenuStack = styled(Stack)`
  padding: ${({ theme }) => theme.space['0.5']};
`

const WrapText = styled(Text)`
  overflow-wrap: anywhere;
`

type ItemProps = {
  children?: ReactNode
  categoryIcon?: ComponentProps<typeof CategoryIcon>['name']
  label: string
  subLabel?: string
  badgeText?: string
  badgeSentiment?: ComponentProps<typeof Badge>['sentiment']
  href?: string
  /**
   * This function will be triggered when item is clicked to expand collapse
   * passing the new toggle state.
   */
  onClickToggle?: (toggle: true | false) => void
  /**
   * This prop is used to control if the item is expanded or collapsed
   */
  toggle?: boolean
  active?: boolean
  /**
   * If you want to remove pin button on your item use this prop
   */
  noPinButton?: boolean
  /**
   * You don't need to use this prop it's used internally to control the type of the item
   */
  type?: ItemType
}

export const Item = ({
  children,
  categoryIcon,
  label,
  subLabel,
  badgeText,
  badgeSentiment,
  href,
  onClickToggle,
  toggle,
  active,
  noPinButton,
  type = 'default',
}: ItemProps) => {
  const context = useNavigation()
  const [internalToggle, setToggle] = useReducer(state => {
    onClickToggle?.(!state)

    return !state
  }, toggle !== false)

  if (!context) {
    throw new Error('Navigation.Item can only be used inside a Navigation')
  }

  const {
    expanded,
    locales,
    pinnedFunctionality,
    pinItem,
    unpinItem,
    pinnedItems,
    pinLimit,
  } = context

  const hasHrefAndNoChildren = href && !children
  const hasPinnedFunctionalityAndNoChildren =
    pinnedFunctionality && !children && !noPinButton
  const isItemPinned = pinnedItems.includes(label)
  const shouldShowPinnedButton = useMemo(() => {
    if (href) return false

    if (pinnedItems.length >= pinLimit && type === 'default') return false

    if (hasPinnedFunctionalityAndNoChildren && type !== 'default') {
      return true
    }

    if (hasPinnedFunctionalityAndNoChildren && !isItemPinned) {
      return true
    }

    return false
  }, [
    hasPinnedFunctionalityAndNoChildren,
    href,
    isItemPinned,
    pinLimit,
    pinnedItems.length,
    type,
  ])

  const Container = StyledContainer.withComponent(
    hasHrefAndNoChildren ? 'a' : 'button',
  )

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
  if (expanded) {
    return (
      <>
        <Container
          gap={1}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          data-has-sub-label={!!subLabel}
          onClick={children ? setToggle : undefined}
          aria-expanded={ariaExpanded}
          href={href}
          target={href ? '_blank' : undefined}
          data-is-pinnable={shouldShowPinnedButton}
        >
          <Stack direction="row" gap={1} alignItems="center">
            {categoryIcon ? <CategoryIcon name={categoryIcon} /> : null}
            <Stack>
              <WrapText
                as="span"
                variant="bodySmallStrong"
                sentiment="neutral"
                prominence={!href && !categoryIcon ? 'weak' : undefined}
              >
                {label}
              </WrapText>
              {subLabel ? (
                <WrapText
                  as="span"
                  variant="caption"
                  sentiment="neutral"
                  prominence="weak"
                >
                  {subLabel}
                </WrapText>
              ) : null}
            </Stack>
          </Stack>
          <Stack direction="row" alignItems="center">
            {badgeText || hasPinnedFunctionalityAndNoChildren ? (
              <>
                {badgeText ? (
                  <StyledBadge
                    sentiment={badgeSentiment}
                    size="small"
                    prominence="strong"
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
                        icon="auto-fix"
                      />
                    </div>
                  </Tooltip>
                ) : null}
              </>
            ) : null}
            {hasHrefAndNoChildren ? (
              <Icon name="open-in-new" color="neutral" prominence="weak" />
            ) : null}
            {children ? (
              <Stack gap={1} direction="row" alignItems="center">
                {type === 'pinnedGroup' ? (
                  <Text
                    as="span"
                    variant="caption"
                    sentiment="neutral"
                    prominence="weak"
                  >
                    {pinnedItems.length}/{pinLimit}
                  </Text>
                ) : null}
                <Icon
                  name={internalToggle ? 'arrow-down' : 'arrow-right'}
                  color="neutral"
                  prominence="weak"
                />
              </Stack>
            ) : null}
          </Stack>
        </Container>
        {children ? (
          <CustomExpandable opened={internalToggle}>
            {children}
          </CustomExpandable>
        ) : null}
      </>
    )
  }

  // This content is the menu of the navigation when collapsed
  if (categoryIcon) {
    return (
      <MenuStack gap={1} alignItems="center" justifyContent="start">
        {Children.count(children) > 0 ? (
          <StyledMenu
            disclosure={
              <Button sentiment="neutral" variant="ghost" size="small">
                <Stack
                  direction="row"
                  gap={1}
                  alignItems="center"
                  justifyContent="center"
                >
                  <CategoryIcon name={categoryIcon} />
                </Stack>
              </Button>
            }
            placement="right"
          >
            {Children.map(children, child => (
              <StyledMenuItem href={href}>
                <Stack
                  gap={1}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  {child}
                </Stack>
              </StyledMenuItem>
            ))}
          </StyledMenu>
        ) : (
          <Button sentiment="neutral" variant="ghost" size="small">
            <Stack
              direction="row"
              gap={1}
              alignItems="center"
              justifyContent="center"
            >
              <CategoryIcon name={categoryIcon} />
            </Stack>
          </Button>
        )}
      </MenuStack>
    )
  }

  // This content is what is inside a menu item the navigation is collapsed
  return (
    <>
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
    </>
  )
}
