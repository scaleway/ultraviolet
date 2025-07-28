'use client'

import styled from '@emotion/styled'
import type { MouseEvent as ReactMouseEvent, ReactNode } from 'react'
import { Button } from '../../Button'
import { Link } from '../../Link'
import { HEIGHT } from '../constants'

const StyledLink = styled(Link)`
  padding-right: ${({ theme }) => theme.space['1']};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const StyledButton = styled(Button)<{ maxWidth?: string; minWidth?: string }>`
  min-width: ${({ minWidth }) => minWidth || 'auto'};
  max-width: ${({ maxWidth }) => maxWidth || 'fit-content'};
  overflow: hidden;
  white-space: nowrap;
  display: block;
  text-overflow: ellipsis;
`

const ItemContainer = styled.li<{ maxWidth?: string; minWidth?: string }>`
  display: inline;
  height: ${HEIGHT};
  display: flex;
  align-items: center;
  flex: 1;
  min-width: ${({ minWidth }) => minWidth || 'auto'};
  max-width: ${({ maxWidth }) => maxWidth || 'fit-content'};

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
  className,
  maxWidth,
  minWidth,
}: ItemProps) => (
  <ItemContainer
    aria-current={ariaCurrent}
    aria-disabled={disabled}
    className={className}
    maxWidth={maxWidth}
    minWidth={minWidth}
    onClick={onClick}
  >
    {to ? (
      <StyledLink href={to} prominence="stronger" size="small">
        {children}
      </StyledLink>
    ) : (
      <StyledButton
        disabled={disabled}
        maxWidth={maxWidth}
        minWidth={minWidth}
        sentiment="neutral"
        size="small"
        variant="ghost"
      >
        {children}
      </StyledButton>
    )}
  </ItemContainer>
)
