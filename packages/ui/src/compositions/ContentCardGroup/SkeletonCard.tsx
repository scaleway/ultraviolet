'use client'

import { Skeleton } from '../../components/feedback/Skeleton'
import { Stack } from '../../components/layout/Stack'
import { contentCardGroupStyle } from './styles.css'

export const SkeletonCard = () => (
  <div className={contentCardGroupStyle.skeletonWrapper}>
    <Stack alignItems="center" direction="row" justifyContent="space-between">
      <Stack gap={2}>
        <Skeleton variant="line" />
        <Skeleton variant="line" />
        <Skeleton variant="line" />
      </Stack>
      <Skeleton className={contentCardGroupStyle.squareSkeleton} variant="square" />
    </Stack>
  </div>
)
