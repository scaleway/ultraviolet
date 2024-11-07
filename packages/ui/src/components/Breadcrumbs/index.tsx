import styled from '@emotion/styled'
import type { JSX, ReactNode } from 'react'
import { BreadcrumbsProvider } from './BreadcrumbsProvider'
import { Item } from './components/Item'
import { HEIGHT } from './constants'

const StyledOl = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: ${HEIGHT};
  overflow: hidden;

  > *:not(:last-child) {
  display: flex;
  align-items: center;

    &::after {
      content: '/';
      color: ${({ theme }) => theme.colors.neutral.textWeak};
      padding: 0 ${({ theme }) => theme.space['0.5']};
      font-size: ${({ theme }) => theme.typography.bodySmallStrong.fontSize};
      font-weight: ${({ theme }) => theme.typography.bodySmallStrong.weight};
    }
  }
`

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
  <BreadcrumbsProvider>
    <nav aria-label="breadcrumb" className={className} data-testid={dataTestId}>
      <StyledOl>{children}</StyledOl>
    </nav>
  </BreadcrumbsProvider>
)

Breadcrumbs.Item = Item
