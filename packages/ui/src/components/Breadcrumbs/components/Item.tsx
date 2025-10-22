'use client'

import { assignInlineVars } from '@vanilla-extract/dynamic'
import type {
  KeyboardEvent,
  MouseEvent as ReactMouseEvent,
  ReactNode,
} from 'react'
import { useMemo } from 'react'
import { Button } from '../../Button'
import { Link } from '../../Link'
import { Text } from '../../Text'
import {
  breadcrumbsItem,
  contentBreadcrumbs,
  contentBreadcrumbsText,
  itemContainerBreadcrumbs,
  linkBreadcrumbs,
  maxWidthVar,
  minWidthVar,
} from './styles.css'

type ItemProps = {
  children: ReactNode
  'aria-current'?:
    | boolean
    | 'false'
    | 'true'
    | 'page'
    | 'step'
    | 'location'
    | 'date'
    | 'time'
  /**
   * Make the component act a `Link` tag
   */
  to?: string
  disabled?: boolean
  onClick?: (event: ReactMouseEvent<HTMLLIElement>) => void
  onKeyDown?: (event: KeyboardEvent<HTMLLIElement>) => void
  className?: string
  maxWidth?: string
  minWidth?: string
}

export const Item = ({
  to,
  children,
  disabled = false,
  'aria-current': ariaCurrent,
  onClick,
  onKeyDown,
  className,
  maxWidth,
  minWidth,
}: ItemProps) => {
  const renderedChildren = useMemo(() => {
    if (to) {
      return (
        <Link
          className={linkBreadcrumbs}
          href={to}
          prominence="stronger"
          size="small"
        >
          {children}
        </Link>
      )
    }

    if (onClick) {
      return (
        <Button
          className={contentBreadcrumbs}
          disabled={disabled}
          sentiment="neutral"
          size="small"
          style={assignInlineVars({
            [minWidthVar]: minWidth?.toString(),
            [maxWidthVar]: maxWidth?.toString(),
          })}
          variant="ghost"
        >
          {children}
        </Button>
      )
    }

    return (
      <Text
        as="div"
        className={`${contentBreadcrumbs} ${contentBreadcrumbsText}`}
        variant="bodySmallStrong"
      >
        {children}
      </Text>
    )
  }, [children, disabled, maxWidth, minWidth, onClick, to])

  return (
    <li
      aria-current={ariaCurrent}
      className={`${className ? `${className} ` : ''}${itemContainerBreadcrumbs({ clickable: !!onClick })} ${breadcrumbsItem}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
      style={assignInlineVars({
        [minWidthVar]: minWidth?.toString(),
        [maxWidthVar]: maxWidth?.toString(),
      })}
    >
      {renderedChildren}
    </li>
  )
}
