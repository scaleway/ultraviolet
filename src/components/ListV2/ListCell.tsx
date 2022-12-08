import styled from '@emotion/styled'
import { MouseEventHandler, ReactNode } from 'react'

const StyledCellDiv = styled.div<{ colSpan?: number }>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-height: 60px;
  ${({ colSpan }) => (colSpan ? `grid-column: span ${colSpan} / span 12;` : '')}
`

type ListCellProps = {
  colSpan?: number
  children?: ReactNode
  onClick?: MouseEventHandler<HTMLTableCellElement>
  className?: string
  /**
   *  Use this if you want to prevent onClick to be handle by parents (Like when you have an expandable content)
   * */
  preventClick?: boolean
}

export const ListCell = ({
  colSpan,
  children,
  onClick,
  className,
  preventClick,
}: ListCellProps) => {
  const handleClick: MouseEventHandler<HTMLTableCellElement> = event => {
    onClick?.(event)
    if (preventClick && !event.isDefaultPrevented()) {
      event.stopPropagation()
    }
  }

  return (
    <StyledCellDiv
      role="cell"
      colSpan={colSpan}
      onClick={handleClick}
      className={className}
    >
      {children}
    </StyledCellDiv>
  )
}
