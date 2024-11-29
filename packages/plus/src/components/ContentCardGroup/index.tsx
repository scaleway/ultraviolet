import styled from '@emotion/styled'
import { Stack } from '@ultraviolet/ui'
import type { ReactNode } from 'react'
import { Children, forwardRef } from 'react'
import { Card } from './Card'
import { SkeletonCard } from './SkeletonCard'

type BaseContentCardGroupProps = {
  children: ReactNode
  loading?: boolean
}

const StyledWrapper = styled(Stack)`
  border-radius: ${({ theme }) => theme.radii.default};
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  background: ${({ theme }) => theme.colors.neutral.background};
  min-width: 0;
`

const BaseContentCardGroup = forwardRef<
  HTMLDivElement,
  BaseContentCardGroupProps
>(({ children, loading }, ref) => (
  <StyledWrapper direction="column" ref={ref}>
    {!loading ? (
      children
    ) : (
      <>
        {Children.map(children, (_child, index) => (
          <SkeletonCard key={index} />
        ))}
      </>
    )}
  </StyledWrapper>
))

export const ContentCardGroup = Object.assign(BaseContentCardGroup, {
  Card,
})
