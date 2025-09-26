'use client'

import { assignInlineVars } from '@vanilla-extract/dynamic'
import { IconSkeleton } from './IconSkeleton'
import { Line } from './Line'
import { blocksContainer, blocksSkeleton, columns } from './stylesVariants.css'

export const Blocks = ({
  col = 4,
  length = 8,
}: {
  col?: number
  length?: number
}) => (
  <div
    className={blocksContainer}
    style={assignInlineVars({
      [columns]: col.toString(),
    })}
  >
    {Array.from({ length }, (_, i) => (
      <div className={blocksSkeleton} key={`skeleton-blocks-${i}`}>
        <IconSkeleton />
        <Line />
      </div>
    ))}
  </div>
)
