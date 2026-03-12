'use client'

import { assignInlineVars } from '@vanilla-extract/dynamic'
import { IconSkeleton } from './IconSkeleton'
import { Line } from './Line'
import { skeletonStyle } from './styles.css'
import { columns } from './stylesVariants.css'

export const Blocks = ({
  col = 4,
  length = 8,
}: {
  col?: number
  length?: number
}) => (
  <div
    className={skeletonStyle.blocksContainer}
    style={assignInlineVars({
      [columns]: col.toString(),
    })}
  >
    {Array.from({ length }, (_, i) => (
      <div
        className={skeletonStyle.blocksSkeleton}
        key={`skeleton-blocks-${i}`}
      >
        <IconSkeleton />
        <Line />
      </div>
    ))}
  </div>
)
