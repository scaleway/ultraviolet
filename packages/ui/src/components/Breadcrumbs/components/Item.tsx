'use client'

import { cn } from '@ultraviolet/utils'
import type { RenderProp } from '@ultraviolet/utils'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import { useMemo } from 'react'
import type { KeyboardEvent, MouseEvent as ReactMouseEvent, ReactNode } from 'react'
import { Button } from '../../Button'
import { Link } from '../../Link'
import { Text } from '../../Text'
import { breadcrumbsStyle } from '../styles.css'
import { maxWidthVar, minWidthVar } from './styles.css'

type ItemProps = {
  children: ReactNode
  'aria-current'?: boolean | 'false' | 'true' | 'page' | 'step' | 'location' | 'date' | 'time'
  disabled?: boolean
  onClick?: (event: ReactMouseEvent<HTMLElement>) => void
  onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void
  className?: string
  maxWidth?: string
  minWidth?: string
  /**
   * Custom element or render function to use instead of the default link/button.
   * Useful for integrating with routing libraries (e.g., React Router, Next.js).
   *
   * Element form (props auto-merged):
   * ```tsx
   * <Breadcrumbs.Item render={<NextLink href="/about" />}>About</Breadcrumbs.Item>
   * ```
   *
   * Function form (you control prop merging):
   * ```tsx
   * <Breadcrumbs.Item render={(props) => <NextLink {...props} href="/about" />}>
   *   About
   * </Breadcrumbs.Item>
   * ```
   */
  render?: RenderProp
} & XOR<
  [
    {
      /**
       * Make the component act a `Link` tag
       */
      to?: string
    },
    {
      render: RenderProp
    },
  ]
>

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
  render,
}: ItemProps) => {
  const renderedChildren = useMemo(() => {
    if (to || render) {
      return (
        <Link
          className={breadcrumbsStyle.link}
          onClick={onClick}
          onKeyDown={onKeyDown}
          prominence="stronger"
          size="small"
          {...(render
            ? {
                render,
              }
            : {
                href: to,
              })}
        >
          {children}
        </Link>
      )
    }

    if (onClick || render) {
      return (
        <Button
          className={breadcrumbsStyle.content}
          disabled={disabled}
          sentiment="neutral"
          size="small"
          render={render}
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
        className={cn(breadcrumbsStyle.content, breadcrumbsStyle.contentBreadcrumbsText)}
        variant="bodySmallStrong"
      >
        {children}
      </Text>
    )
  }, [children, disabled, maxWidth, minWidth, onClick, to, onKeyDown, render])

  return (
    <li
      aria-current={ariaCurrent}
      className={cn(className, breadcrumbsStyle.itemContainer({ clickable: !!onClick }), breadcrumbsStyle.item)}
      style={assignInlineVars({
        [minWidthVar]: minWidth?.toString(),
        [maxWidthVar]: maxWidth?.toString(),
      })}
      {...(to ? {} : { onClick, onKeyDown })}
    >
      {renderedChildren}
    </li>
  )
}
