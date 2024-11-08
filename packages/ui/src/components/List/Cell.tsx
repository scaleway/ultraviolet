import styled from '@emotion/styled'
import type {
  ForwardedRef,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
} from 'react'
import { forwardRef } from 'react'

const StyledCell = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-height: ${({ theme }) => theme.sizing['750']};
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
}

export const Cell = forwardRef(
  (
    { children, className, preventClick, 'data-testid': dataTestid }: CellProps,
    ref: ForwardedRef<HTMLDivElement>,
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
        role="cell"
        className={className}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        data-testid={dataTestid}
      >
        {children}
      </StyledCell>
    )
  },
)
