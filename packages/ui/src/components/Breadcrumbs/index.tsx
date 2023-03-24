import styled from '@emotion/styled'
import { Children, cloneElement, isValidElement } from 'react'
import type { MouseEvent as ReactMouseEvent, ReactNode } from 'react'
import { Link } from '../Link'

const contractString = (str: ReactNode): ReactNode => {
  if (typeof str === 'string' && str.length > 30) {
    return `${str.slice(0, 15)}...${str.slice(-15)}`
  }

  return str
}

const StyledOl = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
`

const ItemContainer = styled.li`
  display: inline;

  &[aria-current='page'] {
    color: ${({ theme }) => theme.colors.neutral.textWeak};
  }

  &:not(:last-child)::after {
    content: '›';
    margin: 0 8px;
  }

  ${({ onClick }) =>
    onClick
      ? `
    cursor: pointer;
    &[aria-disabled="true"] {
      pointer-events: none;
    }
`
      : ``}
`

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
  /**
   * ID of the step, automatically injected by Breadcrumbs parent tag
   */
  step?: number
  onClick?: (event: ReactMouseEvent<HTMLLIElement>, step: number) => void
}

export const Item = ({
  to,
  children,
  disabled = false,
  'aria-current': ariaCurrent,
  onClick,
  step,
}: ItemProps) => (
    <ItemContainer
      aria-disabled={disabled}
      onClick={onClick ? event => onClick(event, step ?? -1) : undefined}
      aria-current={ariaCurrent}
    >
      {to ? (
        <Link variant="primary" href={to}>
          {contractString(children)}
        </Link>
      ) : (
        contractString(children)
      )}
    </ItemContainer>
  )

type BreadcrumbsProps = {
  selected?: number
  children: ReactNode
}

type BreadcrumbsType = ((props: BreadcrumbsProps) => JSX.Element) & {
  Item: typeof Item
}

export const Breadcrumbs: BreadcrumbsType = ({
  children,
  selected: selectedProp,
}) => {
  const selected =
    selectedProp !== undefined ? selectedProp : Children.count(children) - 1

  return (
    <nav aria-label="breadcrumb">
      <StyledOl>
        {Children.map(children, (child, index: number) => {
          if (!isValidElement<ItemProps>(child)) {
            return child
          }

          const active = selected === index

          return cloneElement(child, {
            'aria-current': active ? 'page' : undefined,
            step: index,
          })
        })}
      </StyledOl>
    </nav>
  )
}

Breadcrumbs.Item = Item
