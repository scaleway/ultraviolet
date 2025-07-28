'use client'

import styled from '@emotion/styled'
import { Stack, Skeleton as UltravioletSkeleton } from '@ultraviolet/ui'

const SkeletonImage = styled(UltravioletSkeleton, {
  shouldForwardProp: prop => !['height', 'width', 'direction'].includes(prop),
})<{
  width?: string
  height?: string
  direction: 'row' | 'column'
}>`
  border-radius: ${({ theme, direction }) =>
    `${
      direction === 'column'
        ? `${theme.radii.default} ${theme.radii.default} 0 0`
        : `${theme.radii.default} 0 0 ${theme.radii.default}`
    }`};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`

const StyledStack = styled(Stack)`
  padding: ${({ theme }) => theme.space['3']};
`

type SkeletonProps = {
  direction: 'row' | 'column'
}

export const Skeleton = ({ direction }: SkeletonProps) => (
  <Stack direction={direction}>
    <SkeletonImage
      direction={direction}
      height={direction === 'column' ? '120px' : 'unset'}
      variant="square"
      width={direction === 'row' ? '220px' : undefined}
    />
    <StyledStack gap={2}>
      <UltravioletSkeleton variant="line" />
      <UltravioletSkeleton variant="line" />
      <UltravioletSkeleton variant="line" />
      <UltravioletSkeleton variant="line" />
      <UltravioletSkeleton variant="line" />
    </StyledStack>
  </Stack>
)
