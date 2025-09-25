'use client'

import type { JSX, ReactNode } from 'react'
import { Item } from './components/Item'
import { breadcrumbs } from './styles.css'

type BreadcrumbsProps = {
  children: ReactNode
  className?: string
  'data-testid'?: string
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
}) => (
  <nav aria-label="breadcrumb" className={className} data-testid={dataTestId}>
    <ol className={breadcrumbs}>{children}</ol>
  </nav>
)

Breadcrumbs.Item = Item
