'use client'

import type {
  ComponentProps,
  CSSProperties,
  ElementType,
  ForwardedRef,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
  Ref,
} from 'react'
import { forwardRef, useMemo } from 'react'
import { Badge } from '../Badge'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'
import {
  tabsBadge,
  tabsBadgeContainer,
  tabsButton,
  tabsTextSelected,
} from './styles.css'
import { useTabsContext } from './TabsContext'

type TabProps<T extends ElementType = 'button'> = {
  as?: T
  badge?: ReactNode
  children?: ReactNode
  className?: string
  counter?: number | string
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLElement>
  onKeyDown?: KeyboardEventHandler<HTMLElement>
  subtitle?: string
  tooltip?: string
  value?: string | number
  style?: CSSProperties
} & Omit<
  ComponentProps<T>,
  | 'as'
  | 'badge'
  | 'children'
  | 'className'
  | 'counter'
  | 'disabled'
  | 'value'
  | 'tooltip'
  | 'role'
>

export const Tab = forwardRef(
  <T extends ElementType = 'button'>(
    {
      as,
      badge,
      children,
      className,
      counter,
      disabled = false,
      onClick,
      onKeyDown,
      subtitle,
      tooltip,
      value,
      ...props
    }: TabProps<T>,
    ref: ForwardedRef<HTMLElement>,
  ) => {
    const { selected, onChange } = useTabsContext()
    const computedAs = as ?? 'button'
    const ComputedComponent = as ?? 'button'
    const isSelected = useMemo(
      () => value !== undefined && selected === value,
      [value, selected],
    )

    return (
      <Tooltip text={tooltip}>
        <ComputedComponent
          aria-disabled={disabled}
          aria-label={value ? `${value}` : undefined}
          aria-selected={isSelected}
          className={`${className ? `${className} ` : ''}${tabsButton}`}
          data-is-selected={isSelected}
          disabled={computedAs === 'button' ? disabled : undefined}
          onClick={event => {
            if (value !== undefined) {
              onChange(value)
            }
            onClick?.(event)
          }}
          onKeyDown={event => {
            onKeyDown?.(event)
            if (!event.defaultPrevented && !disabled && value) {
              onChange(value)
            }
          }}
          ref={ref as unknown as Ref<HTMLButtonElement>}
          role="tab"
          type={computedAs === 'button' ? 'button' : undefined}
          {...props}
        >
          <Stack direction="column" gap={0.5}>
            <Stack alignItems="center" direction="row">
              {children}
              {typeof counter === 'number' || typeof counter === 'string' ? (
                <Badge
                  className={tabsBadge}
                  prominence={isSelected ? 'strong' : 'default'}
                  sentiment={isSelected ? 'primary' : 'neutral'}
                  size="medium"
                >
                  {counter}
                </Badge>
              ) : null}
              {badge ? (
                <span className={tabsBadgeContainer}>{badge}</span>
              ) : null}
            </Stack>
            {subtitle ? (
              <Stack direction="row">
                <Text
                  as="span"
                  className={
                    tabsTextSelected[isSelected ? 'selected' : 'default']
                  }
                  prominence="weak"
                  sentiment="neutral"
                  variant="bodySmall"
                >
                  {subtitle}
                </Text>
              </Stack>
            ) : null}
          </Stack>
        </ComputedComponent>
      </Tooltip>
    )
  },
)
