import styled from '@emotion/styled'
import type {
  ForwardedRef,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
} from 'react'
import { forwardRef } from 'react'

const StyledCell = styled.td`
  display: table-cell;
  vertical-align: middle;
  height: ${({ theme }) => theme.sizing['750']};
  padding: 0 ${({ theme }) => theme.space['2']};
`

type CellProps = {
  children?: ReactNode
  className?: string
  /**
   *  @deprecated: This prop won't be needed in the future as expandable will be triggered only via a button.
   *
   *  Use this if you want to prevent onClick to be handled by parents (Like when you have an expandable content)
   * */
  preventClick?: boolean
  'data-testid'?: string
  colSpan?: number
}

export const Cell = forwardRef(
  (
    {
      children,
      className,
      preventClick,
      'data-testid': dataTestid,
      colSpan,
    }: CellProps,
    ref: ForwardedRef<HTMLTableCellElement>,
  ) => {
    const handleClick: MouseEventHandler<HTMLDivElement> = event => {
      if (preventClick) {
        event.stopPropagation()
      }
    }

    const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = event => {
      if (preventClick) {
        event.stopPropagation()
      }
    }

    return (
      <StyledCell
        ref={ref}
        className={className}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        data-testid={dataTestid}
        colSpan={colSpan}
      >
        {children}
      </StyledCell>
    )
  },
)
