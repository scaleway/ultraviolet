'use client'

import { assignInlineVars } from '@vanilla-extract/dynamic'
import { Skeleton as UVSkeleton } from '../../Skeleton'
import { Stack } from '../../Stack'
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
