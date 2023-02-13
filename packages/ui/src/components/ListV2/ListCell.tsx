import styled from '@emotion/styled'
import type { MouseEventHandler, ReactNode } from 'react'

const StyledCellDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-height: 60px;
`

type ListCellProps = {
  children?: ReactNode
  onClick?: MouseEventHandler<HTMLTableCellElement>
  className?: string
  /**
   *  Use this if you want to prevent onClick to be handled by parents (Like when you have an expandable content)
   * */
  preventClick?: boolean
}

export const ListCell = ({
  children,
  onClick,
  className,
  preventClick = false,
}: ListCellProps) => {
  const handleClick: MouseEventHandler<HTMLTableCellElement> = event => {
    onClick?.(event)
    if (preventClick && !event.isDefaultPrevented()) {
      event.stopPropagation()
    }
  }

  return (
    <StyledCellDiv role="cell" onClick={handleClick} className={className}>
      {children}
    </StyledCellDiv>
  )
}
