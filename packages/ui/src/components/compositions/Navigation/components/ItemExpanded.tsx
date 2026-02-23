import { ArrowDownIcon } from '@ultraviolet/icons/ArrowDownIcon'
import { ArrowRightIcon } from '@ultraviolet/icons/ArrowRightIcon'
import { DragIcon } from '@ultraviolet/icons/DragIcon'
import { OpenInNewIcon } from '@ultraviolet/icons/OpenInNewIcon'
import { cn } from '@ultraviolet/utils'
import type { DragEvent } from 'react'
import { useCallback, useContext, useMemo, useReducer } from 'react'
import { Expandable } from '../../../Expandable'
import { Stack } from '../../../Stack'
import { Text } from '../../../Text'
import { useNavigation } from '../NavigationProvider'
import type { ItemExpandedType } from './ComponentsTypes'
import { ItemBadge, ItemPinnedButton } from './ItemFragments'
import { ItemContext, ItemProvider } from './ItemProvider'
import {
  navigationItemCategoryIcon,
  navigationItemContainer,
  navigationItemContainerAnimated,
  navigationItemDragIcon,
  navigationItemPadded,
  navigationItemPaddingStack,
  navigationItemStackIcon,
  navigationItemVariants,
  navigationItemWrapText,
} from './items.css'

const ItemChildren = ({
  noExpand,
  type,
  children,
  internalExpanded,
}: Pick<ItemExpandedType, 'noExpand' | 'type' | 'children'> & {
  internalExpanded: boolean
}) => {
  const context = useNavigation()

  if (!context) {
    throw new Error(
      'Navigation.Item can only be used inside a NavigationProvider.',
    )
  }

  const { animation, animationType, shouldAnimate } = context

  return (
    <>
      {noExpand ? (
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
      ) : (
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
      )}
    </>
  )
}

const ItemContent = ({
  disabled,
  active,
  categoryIcon,
  type,
  label,
  hasActiveChildren,
  labelDescription,
  noExpand,
  subLabel,
}: Pick<
  ItemExpandedType,
  | 'disabled'
  | 'active'
  | 'categoryIcon'
  | 'type'
  | 'label'
  | 'hasActiveChildren'
  | 'labelDescription'
  | 'noExpand'
  | 'subLabel'
>) => {
  const context = useNavigation()
  if (!context) {
    throw new Error(
      'Navigation.Item can only be used inside a NavigationProvider.',
    )
  }

  const { expanded, animation } = context

  const itemProvider = useContext(ItemContext)
  const hasParents = !!itemProvider

  return (
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
          prominence="default"
          sentiment="neutral"
          size="small"
        />
      ) : null}
      <Stack>
        {animation ? null : (
          <Text
            as="span"
            className={navigationItemWrapText({
              disabled,
              weak: hasActiveChildren && !noExpand && !disabled && !!active,
            })}
            data-animation={animation}
            disabled={disabled}
            prominence={
              (categoryIcon || !hasParents) && !active ? 'strong' : 'default'
            }
            sentiment={active ? 'primary' : 'neutral'}
            variant="bodySmallStrong"
            whiteSpace="pre-wrap"
          >
            {label}
            {labelDescription ? (
              <span className={navigationItemPadded}>{labelDescription}</span>
            ) : null}
          </Text>
        )}
        {subLabel && !animation ? (
          <Text
            as="span"
            className={navigationItemWrapText({
              disabled,
              weak: hasActiveChildren && !noExpand && !disabled && !!active,
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
  )
}

export const ItemExpanded = ({
  categoryIcon,
  containerTag,
  disabled,
  active,
  noExpand,
  subLabel,
  shouldShowPinnedButton,
  children,
  dataTestId,
  type,
  href,
  rel,
  id,
  style,
  target,
  label,
  labelDescription,
  hasPinnedFeatureAndNoChildren,
  badgeText,
  badgeSentiment,
  isItemPinned,
  pinTooltipLocale,
  onClickPinUnpin,
  isPinDisabled,
  onToggle,
  index,
  onDragStopTrigger,
  toggle,
  hasActiveChildren,
}: ItemExpandedType) => {
  const context = useNavigation()
  const [internalExpanded, onToggleExpand] = useReducer(
    prevState => !prevState,
    Boolean(toggle),
  )
  if (!context) {
    throw new Error(
      'Navigation.Item can only be used inside a NavigationProvider.',
    )
  }

  const { expanded, animation, shouldAnimate, animationType, pinnedFeature } =
    context

  const showDraggableIcon =
    !noExpand && pinnedFeature && shouldShowPinnedButton && !disabled

  const showPinIcon =
    !(noExpand || disabled) && shouldShowPinnedButton && pinnedFeature
  // This content is when the navigation is expanded

  const shouldHaveWeakText =
    !!children && !active && shouldShowPinnedButton && !disabled

  const hasHrefAndNoChildren = href && !children

  const triggerToggle = useCallback(() => {
    onToggleExpand()
    onToggle?.(internalExpanded)
  }, [internalExpanded, onToggle])

  const ArrowIcon = useMemo(
    () => (internalExpanded ? ArrowDownIcon : ArrowRightIcon),
    [internalExpanded],
  )

  const onDragStart = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      if (expanded) {
        event.dataTransfer.setData(
          'text/plain',
          JSON.stringify({ index, label }),
        )

        const element = event.currentTarget
        element.style.opacity = '0.5'
      }

      return undefined
    },
    [expanded, index, label],
  )

  const onDragEnd = useCallback(
    (event: DragEvent<HTMLDivElement>) =>
      expanded ? onDragStopTrigger(event) : undefined,
    [expanded, onDragStopTrigger],
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

  const computedAnimation = animation === 'collapse' ? 'collapse' : 'expand'

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
          navigationItemContainerAnimated({
            animated: shouldAnimate && animationType === 'complex',
            animation: computedAnimation,
          }),
          navigationItemVariants({
            shouldHaveWeakText,
            showDraggableIcon,
            showPinIcon,
          }),
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
        <ItemContent
          active={active}
          categoryIcon={categoryIcon}
          disabled={disabled}
          hasActiveChildren={hasActiveChildren}
          label={label}
          labelDescription={labelDescription}
          noExpand={noExpand}
          subLabel={subLabel}
          type={type}
        />
        <Stack alignItems="center" direction="row" gap={href ? 1 : undefined}>
          {badgeText || hasPinnedFeatureAndNoChildren ? (
            <>
              <ItemBadge
                animation={!!animation}
                badgeSentiment={badgeSentiment}
                badgeText={badgeText}
                disabled={disabled}
              />
              <ItemPinnedButton
                active={active}
                id={id}
                isItemPinned={isItemPinned}
                isPinDisabled={isPinDisabled}
                onClickPinUnpin={onClickPinUnpin}
                pinTooltipLocale={pinTooltipLocale}
                shouldShowPinnedButton={shouldShowPinnedButton}
              />
            </>
          ) : null}
          {hasHrefAndNoChildren && target === '_blank' && !animation ? (
            <OpenInNewIcon
              disabled={disabled}
              prominence="default"
              sentiment="neutral"
            />
          ) : null}
          {children && !animation && !noExpand ? (
            <Stack
              alignItems="center"
              className={navigationItemStackIcon}
              direction="row"
              gap={1}
            >
              <ArrowIcon prominence="weak" sentiment="neutral" />
            </Stack>
          ) : null}
        </Stack>
      </Stack>
      {children ? (
        <ItemChildren
          internalExpanded={internalExpanded}
          noExpand={noExpand}
          type={type}
        >
          {children}
        </ItemChildren>
      ) : null}
    </>
  )
}
