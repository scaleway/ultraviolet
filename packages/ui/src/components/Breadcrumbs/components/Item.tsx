'use client'

import { cn } from '@ultraviolet/utils'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import { useMemo } from 'react'

import { Button } from '../../Button'
import { Link } from '../../Link'
import { Text } from '../../Text'
import { breadcrumbsStyle } from '../styles.css'

import { maxWidthVar, minWidthVar } from './styles.css'

import type {
  KeyboardEvent,
  MouseEvent as ReactMouseEvent,
  ReactNode,
} from 'react'

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
  onClick?: (event: ReactMouseEvent<HTMLElement>) => void
  onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void
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
          className={breadcrumbsStyle.link}
          href={to}
          onClick={onClick}
          onKeyDown={onKeyDown}
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
          className={breadcrumbsStyle.content}
          disabled={disabled}
          onClick={onClick}
          onKeyDown={onKeyDown}
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
        className={cn(
          breadcrumbsStyle.content,
          breadcrumbsStyle.contentBreadcrumbsText,
        )}
        variant="bodySmallStrong"
      >
        {children}
      </Text>
    )
  }, [children, disabled, maxWidth, minWidth, onClick, to, onKeyDown])

  return (
    <li
      aria-current={ariaCurrent}
      className={cn(
        className,
        breadcrumbsStyle.itemContainer({ clickable: !!onClick }),
        breadcrumbsStyle.item,
      )}
      style={assignInlineVars({
        [minWidthVar]: minWidth?.toString(),
        [maxWidthVar]: maxWidth?.toString(),
      })}
    >
      {renderedChildren}
    </li>
  )
}
