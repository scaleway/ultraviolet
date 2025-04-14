'use client'

import styled from '@emotion/styled'
import { Skeleton, Stack } from '@ultraviolet/ui'

const StyledWrapper = styled.div`
  padding: ${({ theme }) => theme.space['3']};

  &:not(:first-child) {
    border-top: 1px solid ${({ theme }) => theme.colors.neutral.border};
  }
`

const StyledSquareSkeleton = styled(Skeleton)`
  height: 32px;
  width: 32px;
  border-radius: ${({ theme }) => theme.radii.default};
`

export const SkeletonCard = () => (
  <StyledWrapper>
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Stack gap={2}>
        <Skeleton variant="line" />
        <Skeleton variant="line" />
        <Skeleton variant="line" />
      </Stack>
      <StyledSquareSkeleton variant="square" />
    </Stack>
  </StyledWrapper>
)
