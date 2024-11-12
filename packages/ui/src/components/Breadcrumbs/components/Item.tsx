import styled from '@emotion/styled'
import { type MouseEvent as ReactMouseEvent, type ReactNode } from 'react'
import { Button } from '../../Button'
import { Link } from '../../Link'
import { HEIGHT } from '../constants'

const contractString = (str: ReactNode): ReactNode => {
  if (typeof str === 'string' && str.length > 30) {
    return `${str.slice(0, 15)}...${str.slice(-15)}`
  }

  return str
}

const StyledLink = styled(Link)`
  padding-right: ${({ theme }) => theme.space['1']};
`

const StyledButton = styled(Button)`

`

const ItemContainer = styled.li`
  display: inline;
  height: ${HEIGHT};
  display: flex;
  align-items: center;

  ${({ onClick }) =>
    onClick
      ? `
    cursor: pointer;
    &[aria-disabled="true"] {
      pointer-events: none;
    }
    `
      : ``}

  &:not(:first-child) {
    ${StyledLink} {
      padding: 0 ${({ theme }) => theme.space['1']};
    }
  }

  &:last-child {
    ${StyledLink} {
      pointer-events: none;
    }

    ${StyledButton} {
      pointer-events: none;
      cursor: default;
    }
  }
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
}: ItemProps) => (
  <ItemContainer
    aria-disabled={disabled}
    onClick={onClick}
    aria-current={ariaCurrent}
  >
    {to ? (
      <StyledLink sentiment="neutral" href={to} size="small">
        {contractString(children)}
      </StyledLink>
    ) : (
      <StyledButton
        variant="ghost"
        sentiment="neutral"
        disabled={disabled}
        size="small"
      >
        {contractString(children)}
      </StyledButton>
    )}
  </ItemContainer>
)
