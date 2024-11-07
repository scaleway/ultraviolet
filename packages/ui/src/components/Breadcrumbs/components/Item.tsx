import styled from '@emotion/styled'
import {
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  useEffect,
  useRef,
} from 'react'
import { Button } from '../../Button'
import { Link } from '../../Link'
import { useBreadcrumbs } from '../BreadcrumbsProvider'
import { HEIGHT } from '../constants'

const contractString = (str: ReactNode): ReactNode => {
  if (typeof str === 'string' && str.length > 30) {
    return `${str.slice(0, 15)}...${str.slice(-15)}`
  }

  return str
}

const ItemContainer = styled.li`
  display: inline;
  height: ${HEIGHT};
  display: flex;
  align-items: center;

  &:first-of-type {
    padding-left: ${({ theme }) => theme.space['0.5']};
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

const StyledLink = styled(Link)`
  padding: 0 ${({ theme }) => theme.space['1']};
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
  onClick?: (event: ReactMouseEvent<HTMLLIElement>) => void
}

export const Item = ({
  to,
  children,
  disabled = false,
  'aria-current': ariaCurrent,
  onClick,
}: ItemProps) => {
  const ref = useRef<HTMLLIElement>(null)
  const { breadcrumbs, registerBreadcrumb, unregisterBreadcrumb } =
    useBreadcrumbs()

  useEffect(() => {
    const id = registerBreadcrumb(ref)

    return () => {
      unregisterBreadcrumb(id)
    }
  }, [ref, registerBreadcrumb, unregisterBreadcrumb])

  return (
    <ItemContainer
      aria-disabled={disabled}
      onClick={onClick}
      aria-current={ariaCurrent}
      ref={ref}
    >
      {to ? (
        <StyledLink sentiment="neutral" href={to} size="small">
          {contractString(children)}
        </StyledLink>
      ) : (
        <Button
          variant="ghost"
          sentiment="neutral"
          disabled={disabled}
          size="small"
        >
          {contractString(children)}
        </Button>
      )}
    </ItemContainer>
  )
}
