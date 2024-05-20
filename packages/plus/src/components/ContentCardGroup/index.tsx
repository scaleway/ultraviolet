import styled from '@emotion/styled'
import { Stack } from '@ultraviolet/ui'
import type { ReactNode, Ref } from 'react'
import { Children } from 'react'
import { Card } from './Card'
import { SkeletonCard } from './SkeletonCard'

const StyledWrapper = styled(Stack)`
  border-radius: ${({ theme }) => theme.radii.default};
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  background: ${({ theme }) => theme.colors.neutral.background};
  min-width: 0;
`

type BaseContentCardGroupProps = {
  children: ReactNode
  loading?: boolean
  ref?: Ref<HTMLDivElement>
}

const BaseContentCardGroup = ({
  children,
  loading,
  ref,
}: BaseContentCardGroupProps) => (
  <StyledWrapper direction="column" ref={ref}>
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
)

export const ContentCardGroup = Object.assign(BaseContentCardGroup, {
  Card,
})
