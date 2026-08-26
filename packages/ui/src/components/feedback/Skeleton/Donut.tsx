'use client'

import { Line } from './Line'
import { skeletonStyle } from './styles.css'
import { CIRCLE_SIZE } from './stylesVariants.css'

export const Donut = () => (
  <div className={skeletonStyle.donutSkeletonContainer}>
    <svg className={skeletonStyle.donutSkeletonSvg}>
      <title>donut skeleton</title>
      <circle
        className={skeletonStyle.donutSkeletonCircle}
        cx={`${CIRCLE_SIZE / 2}rem`}
        cy={`${CIRCLE_SIZE / 2}rem`}
        r="90"
      />
    </svg>
    <ul className={skeletonStyle.donutSkeletonLineList}>
      <li>
        <Line />
      </li>
      <li>
        <Line />
      </li>
      <li>
        <Line />
      </li>
      <li>
        <Line />
      </li>
    </ul>
  </div>
)
