import styled from '@emotion/styled'
import { Fragment } from 'react'
import { IconSkeleton } from './IconSkeleton'
import { Line } from './Line'

const StyledLine = styled.li`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.space['3']} ${theme.space['2']}`};
`

const StyledList = styled.ul`
  min-height: 200px;
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.space['2']};
  border: 1px solid ${({ theme }) => theme.colors.neutral.borderWeak};
  border-radius: ${({ theme }) => theme.radii.default};
  margin: 0;

  > ${StyledLine}:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.border};
  }
`

export const Block = ({ length = 3 }: { length?: number }) => (
  <StyledList>
    {Array.from({ length }, (_, i) => (
      <Fragment key={`skeleton-block-${i}`}>
        <StyledLine>
          <IconSkeleton />
          <Line />
        </StyledLine>
      </Fragment>
    ))}
  </StyledList>
)
