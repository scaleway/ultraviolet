'use client'

import { assignInlineVars } from '@vanilla-extract/dynamic'
import { skeletonStyle } from './styles.css'
import { sliderLength } from './stylesVariants.css'

export const Slider = ({ length = 4 }: { length?: number }) => (
  <div
    className={skeletonStyle.sliderSkeletonContainer}
    style={assignInlineVars({
      [sliderLength]: length.toString(),
    })}
  >
    {Array.from({ length }, (_, i) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: to fix
      <div
        className={skeletonStyle.sliderSkeletonCard}
        key={`skeleton-slider-card-${i}`}
      >
        <div className={skeletonStyle.sliderSkeletonBanner} />
      </div>
    ))}
  </div>
)
