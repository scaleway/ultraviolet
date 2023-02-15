import styled from '@emotion/styled'
import type { ForwardedRef, MouseEventHandler, ReactNode } from 'react'
import { forwardRef } from 'react'

const StyledCell = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-height: 60px;
`

type CellProps = {
  children?: ReactNode
  className?: string
  /**
   *  Use this if you want to prevent onClick to be handled by parents (Like when you have an expandable content)
   * */
  preventClick?: boolean
}

export const Cell = forwardRef(
  (
    { children, className, preventClick }: CellProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const handleClick: MouseEventHandler<HTMLTableCellElement> = event => {
      if (preventClick) {
        event.stopPropagation()
      }
    }

    return (
      <StyledCell
        ref={ref}
        role="cell"
        className={className}
        onClick={handleClick}
      >
        {children}
      </StyledCell>
    )
  },
)
