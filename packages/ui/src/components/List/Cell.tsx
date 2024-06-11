import styled from '@emotion/styled'
import type {
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
  Ref,
} from 'react'

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
  'data-testid'?: string
  ref?: Ref<HTMLDivElement>
}

export const Cell = ({
  children,
  className,
  preventClick,
  'data-testid': dataTestid,
  ref,
}: CellProps) => {
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
}
