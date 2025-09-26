'use client'

import { Fragment } from 'react'
import { IconSkeleton } from './IconSkeleton'
import { Line } from './Line'
import { blockSkeletonLine, blockSkeletonList } from './stylesVariants.css'

export const Block = ({ length = 3 }: { length?: number }) => (
  <ul className={blockSkeletonList}>
    {Array.from({ length }, (_, i) => (
      <Fragment key={`skeleton-block-${i}`}>
        <li className={blockSkeletonLine}>
          <IconSkeleton />
          <Line />
        </li>
      </Fragment>
    ))}
  </ul>
)
