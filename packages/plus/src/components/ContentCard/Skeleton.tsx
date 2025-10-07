'use client'

import { Stack, Skeleton as UVSkeleton } from '@ultraviolet/ui'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import {
  paddedStack,
  skeletonHeightVar,
  skeletonImage,
  skeletonWidthVar,
} from './styles.css'

type SkeletonProps = {
  direction: 'row' | 'column'
}

export const Skeleton = ({ direction }: SkeletonProps) => (
  <Stack direction={direction}>
    <UVSkeleton
      className={skeletonImage[direction]}
      style={assignInlineVars({
        [skeletonHeightVar]: direction === 'column' ? '120px' : 'unset',
        [skeletonWidthVar]: direction === 'row' ? '220px' : '100%',
      })}
      variant="square"
    />
    <Stack className={paddedStack} gap={2}>
      <UVSkeleton variant="line" />
      <UVSkeleton variant="line" />
      <UVSkeleton variant="line" />
      <UVSkeleton variant="line" />
      <UVSkeleton variant="line" />
    </Stack>
  </Stack>
)
