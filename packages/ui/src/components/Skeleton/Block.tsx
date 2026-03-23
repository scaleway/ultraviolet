'use client'

import { Fragment } from 'react'

import { IconSkeleton } from './IconSkeleton'
import { Line } from './Line'
import { skeletonStyle } from './styles.css'

export const Block = ({ length = 3 }: { length?: number }) => (
  <ul className={skeletonStyle.blockSkeletonList}>
    {Array.from({ length }, (_, i) => (
      <Fragment key={`skeleton-block-${i}`}>
        <li className={skeletonStyle.blockSkeletonLine}>
          <IconSkeleton />
          <Line />
        </li>
      </Fragment>
    ))}
  </ul>
)
