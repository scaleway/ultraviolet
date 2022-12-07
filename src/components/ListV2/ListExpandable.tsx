import styled from '@emotion/styled'
import { ReactNode } from 'react'

const StyledExpandableContainer = styled.div`
  grid-column: 1 / -1;
  border-top: 1px solid ${({ theme }) => theme.colors.neutral.borderWeak};
  padding: ${({ theme }) => `${theme.space['2']} ${theme.space['2']}`};
  grid-row-start: 2;
  grid-row-end: 2;
`

type ListExpandableProps = {
  children: ReactNode
  className?: string
}

export const ListExpandable = ({
  children,
  className,
}: ListExpandableProps) => (
  <StyledExpandableContainer
    role="cell"
    className={className}
    data-expandable-content
  >
    {children}
  </StyledExpandableContainer>
)
