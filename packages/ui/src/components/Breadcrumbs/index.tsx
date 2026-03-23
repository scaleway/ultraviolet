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
}) => (
  <nav
    aria-label="breadcrumb"
    className={className}
    data-testid={dataTestId}
    style={style}
  >
    <ol className={breadcrumbsStyle.breadcrumbs}>{children}</ol>
  </nav>
)

Breadcrumbs.Item = Item
