'use client'

import { Item } from './components/Item'
import { breadcrumbsStyle } from './styles.css'

import type { CSSProperties, JSX, ReactNode } from 'react'

type BreadcrumbsProps = {
  children: ReactNode
  className?: string
  'data-testid'?: string
  style?: CSSProperties
}

type BreadcrumbsType = ((props: BreadcrumbsProps) => JSX.Element) & {
  Item: typeof Item
}

/**
 * Breadcrumbs component is used to display a navigation path with links to the parent pages.
 */
export const Breadcrumbs: BreadcrumbsType = ({
  children,
  className,
  'data-testid': dataTestId,
  style,
}) => {
  const childArray = Array.isArray(children) ? children : [children]
  return (
    <nav
      aria-label="breadcrumb"
      className={className}
      data-testid={dataTestId}
      style={style}
    >
      <ol className={breadcrumbsStyle.breadcrumbs}>
        {childArray.map((child, index) => {
          const isLast = index === childArray.length - 1
          if (isLast && typeof child === 'object' && 'type' in child) {
            return {
              ...child,
              props: {
                ...child.props,
                'aria-current': 'page' as const,
              },
            }
          }
          return child
        })}
      </ol>
    </nav>
  )
}

Breadcrumbs.Item = Item
