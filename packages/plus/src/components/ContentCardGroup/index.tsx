import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import { Children, forwardRef } from 'react'
import { Card } from './Card'
import { SkeletonCard } from './SkeletonCard'

type BaseContentCardGroupProps = {
  children: ReactNode
  loading?: boolean
}

const StyledWrapper = styled.div`
  border-radius: ${({ theme }) => theme.radii.default};
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  background: ${({ theme }) => theme.colors.neutral.background};
`

const BaseContentCardGroup = forwardRef<
  HTMLDivElement,
  BaseContentCardGroupProps
>(({ children, loading }, ref) => (
  <StyledWrapper ref={ref}>
    {!loading ? (
      children
    ) : (
      <>
        {Children.map(children, (_child, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <SkeletonCard key={index} />
        ))}
      </>
    )}
  </StyledWrapper>
))

export const ContentCardGroup = Object.assign(BaseContentCardGroup, {
  Card,
})
