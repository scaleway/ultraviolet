'use client'

import { Line } from './Line'
import {
  CIRCLE_SIZE,
  donutSkeletonCircle,
  donutSkeletonContainer,
  donutSkeletonLineList,
  donutSkeletonSvg,
} from './stylesVariants.css'

export const Donut = () => (
  <div className={donutSkeletonContainer}>
    <svg className={donutSkeletonSvg}>
      <circle
        className={donutSkeletonCircle}
        cx={`${CIRCLE_SIZE / 2}rem`}
        cy={`${CIRCLE_SIZE / 2}rem`}
        r="90"
      />
    </svg>
    <ul className={donutSkeletonLineList}>
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
