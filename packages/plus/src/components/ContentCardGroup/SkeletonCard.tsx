'use client'

import { Skeleton, Stack } from '@ultraviolet/ui'
import { skeletonWrapper, squareSkeleton } from './styles.css'

export const SkeletonCard = () => (
  <div className={skeletonWrapper}>
    <Stack alignItems="center" direction="row" justifyContent="space-between">
      <Stack gap={2}>
        <Skeleton variant="line" />
        <Skeleton variant="line" />
        <Skeleton variant="line" />
      </Stack>
      <Skeleton className={squareSkeleton} variant="square" />
    </Stack>
  </div>
)
