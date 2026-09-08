'use client'

import type { CSSProperties, ReactNode } from 'react'
import { Item } from './components/Item'
import { breadcrumbsStyle } from './styles.css'

type BreadcrumbsProps = {
  children: ReactNode
  className?: string
  'data-testid'?: string
  style?: CSSProperties
}

/**
 * Breadcrumbs component is used to display a navigation path with links to the parent pages.
 */
export const Breadcrumbs = ({ children, className, 'data-testid': dataTestId, style }: BreadcrumbsProps) => (
  <nav aria-label="breadcrumb" className={className} data-testid={dataTestId} style={style}>
    <ol className={breadcrumbsStyle.breadcrumbs}>{children}</ol>
  </nav>
)

Breadcrumbs.displayName = 'Breadcrumbs'
Breadcrumbs.Item = Item
