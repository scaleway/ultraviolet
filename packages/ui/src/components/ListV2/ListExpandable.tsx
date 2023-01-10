import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import { useListContext } from './ListContext'

const StyledExpandableContainer = styled.div`
  grid-column: 1 / -1;
  border-top: 1px solid ${({ theme }) => theme.colors.neutral.borderWeak};
  padding: ${({ theme }) => `${theme.space['2']} ${theme.space['2']}`};
  grid-row-start: 2;
  grid-row-end: 2;
  transition: max-height 500ms ease-in-out;

  &:not([aria-expanded='true']) {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    max-height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  &[aria-expanded='true'] {
    max-height: 9999px;
  }
`

type ListExpandableProps = {
  children: ReactNode
  className?: string
  relatedRowId?: string // Actually always defined because cloned by List.Row
  forceExpand?: boolean
}

export const ListExpandable = ({
  children,
  className,
  relatedRowId = '',
  forceExpand,
}: ListExpandableProps) => {
  const { expandedRowIds } = useListContext()

  return (
    <StyledExpandableContainer
      className={className}
      aria-expanded={expandedRowIds[relatedRowId] || forceExpand}
    >
      {expandedRowIds[relatedRowId] || forceExpand ? children : null}
    </StyledExpandableContainer>
  )
}
