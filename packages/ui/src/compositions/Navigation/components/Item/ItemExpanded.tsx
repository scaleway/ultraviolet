import { ArrowDownIcon } from '@ultraviolet/icons/ArrowDownIcon'
import { ArrowRightIcon } from '@ultraviolet/icons/ArrowRightIcon'
import { OpenInNewIcon } from '@ultraviolet/icons/OpenInNewIcon'
import { cn } from '@ultraviolet/utils'
import { useCallback, useMemo, useReducer } from 'react'

import { Stack } from '../../../../components/Stack'
import { useNavigation } from '../../NavigationProvider'
import { navigationStyle } from '../../styles.css'

import { ItemBadge } from './Badge'
import { ItemChildren } from './Children'
import { ItemContent } from './Content'
import { ItemPinnedButton } from './PinnedButton'

import type { ItemExpandedType } from '../ComponentsTypes'
import type { DragEvent } from 'react'

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
  dataFlipId,
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

  const { expanded, animation, pinnedFeature } = context

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

  return (
    <>
      <Stack
        alignItems={categoryIcon ? 'flex-start' : 'center'}
        aria-expanded={ariaExpanded}
        as={containerTag}
        className={cn(
          navigationStyle.itemContainer({
            disabled,
            hasActive: hasActiveChildren,
            isActive: !!active,
            noExpand,
            expanding: animation === 'expand',
          }),
          navigationStyle.itemVariants({
            shouldHaveWeakText,
            showDraggableIcon,
            showPinIcon,
          }),
        )}
        data-testid={dataTestId}
        data-flip-id={dataFlipId}
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
        {animation !== 'collapse' ? (
          <Stack alignItems="center" direction="row" gap={href ? 1 : undefined}>
            {badgeText || hasPinnedFeatureAndNoChildren ? (
              <>
                <ItemBadge
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
            {hasHrefAndNoChildren && target === '_blank' ? (
              <OpenInNewIcon
                disabled={disabled}
                prominence="default"
                sentiment="neutral"
              />
            ) : null}
            {children && !noExpand ? (
              <Stack
                alignItems="center"
                className={navigationStyle.itemStackIcon}
                direction="row"
                gap={1}
              >
                <ArrowIcon prominence="weak" sentiment="neutral" />
              </Stack>
            ) : null}
          </Stack>
        ) : null}
      </Stack>
      {children && expanded ? (
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
