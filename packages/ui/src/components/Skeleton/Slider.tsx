'use client'

import { assignInlineVars } from '@vanilla-extract/dynamic'
import {
  sliderLength,
  sliderSkeletonBanner,
  sliderSkeletonCard,
  sliderSkeletonContainer,
} from './stylesVariants.css'

export const Slider = ({ length = 4 }: { length?: number }) => (
  <div
    className={sliderSkeletonContainer}
    style={assignInlineVars({
      [sliderLength]: length.toString(),
    })}
  >
    {Array.from({ length }, (_, i) => (
      <div className={sliderSkeletonCard} key={`skeleton-slider-card-${i}`}>
        <div className={sliderSkeletonBanner} />
      </div>
    ))}
  </div>
)
